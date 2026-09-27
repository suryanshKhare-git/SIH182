export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatAddress(address: string, lead: number = 6, tail: number = 4): string {
  if (!address) return '';
  if (address.length <= lead + tail) return address;
  return address.slice(0, lead) + '...' + address.slice(-tail);
}

export function formatTxHash(hash: string, lead: number = 8, tail: number = 6): string {
  if (!hash) return '';
  if (hash.length <= lead + tail) return hash;
  return hash.slice(0, lead) + '...' + hash.slice(-tail);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-US').format(val);
}

export function formatDate(isoString: string): string {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    }) + ' UTC';
  } catch {
    return isoString;
  }
}

export function getConfidenceColor(score: number): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  if (score >= 80) {
    return {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-500/30',
      label: 'High Analytical Confidence'
    };
  }
  if (score >= 60) {
    return {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-500/30',
      label: 'Moderate Analytical Confidence'
    };
  }
  return {
    bg: 'bg-rose-500/10 dark:bg-rose-500/20',
    text: 'text-rose-700 dark:text-rose-400',
    border: 'border-rose-500/30',
    label: 'Indirect / Weak Signal'
  };
}

export function getRiskLevelBadge(level: 'critical' | 'high' | 'medium' | 'low' | 'minimal' | string): {
  bg: string;
  text: string;
  border: string;
} {
  switch (level) {
    case 'critical':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-500/30'
      };
    case 'high':
      return {
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-500/30'
      };
    case 'medium':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-500/30'
      };
    case 'low':
    default:
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-500/30'
      };
  }
}
