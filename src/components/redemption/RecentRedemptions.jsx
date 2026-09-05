import React from 'react';
import { History, Coins, Clock } from 'lucide-react';
import styles from './RecentRedemptions.module.css';

/**
 * RecentRedemptions Component
 * Compact list of recently claimed platform items using component-scoped CSS Modules.
 */
export default function RecentRedemptions({ history = [] }) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <History size={18} style={{ color: '#f59e0b' }} />
        <span>Recent Redemptions</span>
      </div>

      <div className={styles.list}>
        {history.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.title}>
                {item.title}
              </span>
              <div className={styles.costPill}>
                <Coins size={12} />
                <span>{item.gameCoinCost} Coins</span>
              </div>
            </div>

            <div className={styles.itemRight}>
              <Clock size={12} />
              <span>{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
