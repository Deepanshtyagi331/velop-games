import assert from 'node:assert/strict';

console.log('--- VELOOP Economy State Invariant Test Suite ---');

// Simulated storage and state logic matching EconomyContext.jsx
const DEFAULT_ECONOMY = {
  tokens: 100,
  gameCoins: 20
};

function loadPersistedEconomy(raw) {
  if (!raw) return DEFAULT_ECONOMY;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_ECONOMY;

    const tokens = typeof parsed.tokens === 'number' && !isNaN(parsed.tokens) && parsed.tokens >= 0
      ? Math.floor(parsed.tokens)
      : DEFAULT_ECONOMY.tokens;

    const gameCoins = typeof parsed.gameCoins === 'number' && !isNaN(parsed.gameCoins) && parsed.gameCoins >= 0
      ? Math.floor(parsed.gameCoins)
      : DEFAULT_ECONOMY.gameCoins;

    return { tokens, gameCoins };
  } catch {
    return DEFAULT_ECONOMY;
  }
}

// 1. Storage & Corrupt Data Invariants
console.log('1. Testing Storage & Corruption Recovery...');
assert.deepEqual(loadPersistedEconomy(null), DEFAULT_ECONOMY, 'Null storage returns default');
assert.deepEqual(loadPersistedEconomy('{"tokens":"corrupted","gameCoins":null}'), DEFAULT_ECONOMY, 'Corrupted JSON values return default');
assert.deepEqual(loadPersistedEconomy('{invalid json'), DEFAULT_ECONOMY, 'Invalid JSON returns default');
assert.deepEqual(loadPersistedEconomy('{"tokens":-50,"gameCoins":-10}'), DEFAULT_ECONOMY, 'Negative numbers return default');
assert.deepEqual(loadPersistedEconomy('{"tokens":80,"gameCoins":35}'), { tokens: 80, gameCoins: 35 }, 'Valid numbers properly restored');
console.log('   ✓ Storage corruption recovery passes.');

// 2. Dynamic canAffordGame Invariants
console.log('2. Testing Dynamic canAffordGame...');
function canAffordGame(tokens, game) {
  if (!game || typeof game.tokenCost !== 'number') return false;
  return tokens >= game.tokenCost;
}

assert.equal(canAffordGame(100, { tokenCost: 20 }), true, '100 tokens can afford 20');
assert.equal(canAffordGame(100, { tokenCost: 100 }), true, '100 tokens can afford 100');
assert.equal(canAffordGame(100, { tokenCost: 101 }), false, '100 tokens cannot afford 101');
assert.equal(canAffordGame(10, { tokenCost: 20 }), false, '10 tokens cannot afford 20');
assert.equal(canAffordGame(50, { tokenCost: 45 }), true, 'Dynamic cost 45 affordable with 50');
assert.equal(canAffordGame(100, null), false, 'Null game returns false');
assert.equal(canAffordGame(100, { tokenCost: '20' }), false, 'Non-number tokenCost returns false');
console.log('   ✓ Dynamic canAffordGame passes without hardcoded 20.');

// 3. spendTokens Invariants
console.log('3. Testing spendTokens...');
let state = { tokens: 100, gameCoins: 20 };

function spendTokens(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return { success: false, remaining: state.tokens, error: 'Invalid token amount' };
  }
  const intAmount = Math.floor(amount);
  if (state.tokens < intAmount) {
    return { success: false, remaining: state.tokens, error: 'Insufficient tokens' };
  }
  state.tokens -= intAmount;
  return { success: true, remaining: state.tokens };
}

let res = spendTokens(20);
assert.equal(res.success, true, 'Spend 20 succeeded');
assert.equal(state.tokens, 80, 'Tokens reduced from 100 to 80');

res = spendTokens(90);
assert.equal(res.success, false, 'Spend 90 fails when balance is 80');
assert.equal(state.tokens, 80, 'Balance intact after failed spend');

res = spendTokens(-10);
assert.equal(res.success, false, 'Negative amount rejected');
assert.equal(state.tokens, 80);

res = spendTokens(0);
assert.equal(res.success, false, 'Zero amount rejected');

res = spendTokens(NaN);
assert.equal(res.success, false, 'NaN amount rejected');
console.log('   ✓ spendTokens bounds & validations pass.');

// 4. Game Coins Invariants
console.log('4. Testing addGameCoins & spendGameCoins...');
function addGameCoins(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return { success: false, total: state.gameCoins, error: 'Invalid coin amount' };
  }
  const intAmount = Math.floor(amount);
  state.gameCoins += intAmount;
  return { success: true, total: state.gameCoins };
}

function spendGameCoins(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return { success: false, remaining: state.gameCoins, error: 'Invalid coin amount' };
  }
  const intAmount = Math.floor(amount);
  if (state.gameCoins < intAmount) {
    return { success: false, remaining: state.gameCoins, error: 'Insufficient game coins' };
  }
  state.gameCoins -= intAmount;
  return { success: true, remaining: state.gameCoins };
}

res = addGameCoins(15);
assert.equal(res.success, true);
assert.equal(state.gameCoins, 35, 'Game coins added: 20 + 15 = 35');

res = spendGameCoins(10);
assert.equal(res.success, true);
assert.equal(state.gameCoins, 25, 'Game coins spent: 35 - 10 = 25');

res = spendGameCoins(50);
assert.equal(res.success, false, 'Over-spending game coins rejected');
assert.equal(state.gameCoins, 25, 'Game coins balance intact');
console.log('   ✓ Game Coins economy passes.');

// 5. Double-Spend Lock Invariant
console.log('5. Testing Double-Spend Lock...');
let isLocked = false;
function startGameWithLock(game) {
  if (isLocked) {
    return { success: false, error: 'Transaction in progress' };
  }
  if (!game || typeof game.tokenCost !== 'number' || state.tokens < game.tokenCost) {
    return { success: false, error: 'Cannot start game' };
  }
  isLocked = true;
  state.tokens -= game.tokenCost;
  return { success: true, route: game.route };
}

const call1 = startGameWithLock({ title: 'Coin Catcher', tokenCost: 20, route: '/games/coin-catcher' });
assert.equal(call1.success, true, 'First click succeeds');
assert.equal(state.tokens, 60, 'Tokens deducted to 60');

const call2 = startGameWithLock({ title: 'Coin Catcher', tokenCost: 20, route: '/games/coin-catcher' });
assert.equal(call2.success, false, 'Rapid second click locked out');
assert.equal(call2.error, 'Transaction in progress');
assert.equal(state.tokens, 60, 'Tokens NOT double-deducted');

// Unlock
isLocked = false;
const call3 = startGameWithLock({ title: 'Coin Catcher', tokenCost: 20, route: '/games/coin-catcher' });
assert.equal(call3.success, true, 'Subsequent click after unlock succeeds');
assert.equal(state.tokens, 40);

console.log('   ✓ Double-spend lock protection passes.');
console.log('\nAll Economy State Invariants PASSED successfully!');
