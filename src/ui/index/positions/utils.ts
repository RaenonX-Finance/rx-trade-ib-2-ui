export const getPnlTextClassName = (pnl: number): string => {
  if (pnl > 0) {
    return 'text-green-300';
  }
  if (pnl < 0) {
    return 'text-rose-300';
  }

  return 'text-white';
};
