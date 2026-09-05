import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import useEconomy from '../../hooks/useEconomy';
import { REDEMPTION_REWARDS } from '../../data/redemptionData';
import { getRedemptionHistory, recordRedemption } from '../../data/redemptionHistory';
import RewardCard from '../../components/redemption/RewardCard';
import RedemptionModal from '../../components/redemption/RedemptionModal';
import RedemptionSuccess from '../../components/redemption/RedemptionSuccess';
import RecentRedemptions from '../../components/redemption/RecentRedemptions';
import BalanceDisplay from '../../components/economy/BalanceDisplay';
import { Coins, Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * RedemptionPage Component
 * Dark-themed marketplace allowing players to exchange earned Game Coins
 * for platform points, gems, tokens, and lucky spins.
 */
export default function RedemptionPage() {
  const { gameCoins, redeemReward } = useEconomy();

  // Dialog & state machine
  const [selectedReward, setSelectedReward] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [history, setHistory] = useState(() => getRedemptionHistory());

  // Synchronous guard against double-clicks
  const isProcessingRef = useRef(false);

  // Trigger Confirmation Modal
  const handleOpenConfirm = (reward) => {
    setErrorMessage(null);
    setSelectedReward(reward);
  };

  // Cancel Confirmation Dialog
  const handleCancelConfirm = () => {
    if (isProcessing) return;
    setSelectedReward(null);
    setErrorMessage(null);
  };

  // Process Redemption Transaction
  const handleConfirmRedeem = () => {
    if (isProcessingRef.current || !selectedReward) return;

    // Double check balance sufficiency
    if (gameCoins < selectedReward.gameCoinCost) {
      setErrorMessage(`Insufficient Game Coins. You need ${selectedReward.gameCoinCost} Coins.`);
      return;
    }

    isProcessingRef.current = true;
    setIsProcessing(true);

    // Simulate small network delay for prototype realism
    setTimeout(() => {
      const result = redeemReward(selectedReward);

      if (result.success) {
        // Record in local history
        const updatedHistory = recordRedemption(selectedReward);
        setHistory(updatedHistory);

        // Show success state
        setSuccessData({
          reward: selectedReward,
          remainingCoins: result.remainingCoins
        });
        setSelectedReward(null);
      } else {
        setErrorMessage(result.error || 'Failed to redeem reward. Please try again.');
      }

      isProcessingRef.current = false;
      setIsProcessing(false);
    }, 400);
  };

  // Dismiss Success Dialog
  const handleContinueRedeeming = () => {
    setSuccessData(null);
  };

  return (
    <PageContainer>
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingBottom: '60px'
        }}
      >
        {/* Top Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px'
          }}
        >
          <Link
            to="/games"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background-color 150ms ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Games Hub</span>
          </Link>

          {/* Centralized Balance Feedback */}
          <BalanceDisplay variant="full" />
        </div>

        {/* Hero Header */}
        <div
          style={{
            backgroundColor: '#1a1d2e',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '36px 28px',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#fbbf24',
              fontSize: '12px',
              fontWeight: 800,
              width: 'fit-content',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            <Sparkles size={14} />
            <span>Redemption Marketplace</span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}
          >
            Redeem Rewards
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#94a3b8',
              maxWidth: '560px',
              lineHeight: 1.5
            }}
          >
            Turn your hard-earned Game Coins into ecosystem points, tokens, and perks.
            Exchange rates are updated live across all connected modules.
          </p>

          {/* Balance Spotlight */}
          <div
            style={{
              marginTop: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              borderRadius: '16px',
              backgroundColor: '#121422',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              width: 'fit-content'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={22} style={{ color: '#f59e0b' }} />
              <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>
                Available Game Coins:
              </span>
            </div>
            <strong style={{ fontSize: '24px', color: '#fbbf24', fontWeight: 900 }}>
              {gameCoins}
            </strong>
          </div>
        </div>

        {/* Error Alert (if transaction failed) */}
        {errorMessage && (
          <div
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '14px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px'
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Catalog Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {REDEMPTION_REWARDS.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userGameCoins={gameCoins}
              onRedeem={handleOpenConfirm}
            />
          ))}
        </div>

        {/* Recent Redemptions Log */}
        <RecentRedemptions history={history} />

        {/* Confirmation Modal */}
        {selectedReward && (
          <RedemptionModal
            reward={selectedReward}
            currentCoins={gameCoins}
            isProcessing={isProcessing}
            onConfirm={handleConfirmRedeem}
            onCancel={handleCancelConfirm}
          />
        )}

        {/* Success Modal */}
        {successData && (
          <RedemptionSuccess
            reward={successData.reward}
            remainingCoins={successData.remainingCoins}
            onContinue={handleContinueRedeeming}
          />
        )}
      </div>
    </PageContainer>
  );
}
