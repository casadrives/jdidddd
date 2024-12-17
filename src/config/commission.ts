// Commission configuration
export const COMMISSION_CONFIG = {
  PLATFORM_RATE: 0.10, // 10% platform commission
  PAYMENT_TERMS: {
    DUE_DAYS: 30, // Days until payment is due
    GRACE_PERIOD_DAYS: 5, // Additional days before account suspension
  },
  PAYMENT_METHODS: {
    CARD: 'card',
    BANK_TRANSFER: 'bank_transfer',
  },
};

// Commission calculation utilities
export const calculateCommission = (amount: number) => {
  const commission = amount * COMMISSION_CONFIG.PLATFORM_RATE;
  return {
    total: amount,
    commission: Number(commission.toFixed(2)),
    net: Number((amount - commission).toFixed(2)),
  };
};