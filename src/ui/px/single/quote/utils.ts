import {TailwindTextClass} from '@/types/tailwind';


export const getDeltaTextClass = (delta: number | undefined): TailwindTextClass => {
  if (delta === undefined) {
    return 'text-gray-400';
  }

  if (delta < 0.3) {
    return 'text-red-300';
  }

  if (delta < 0.5) {
    return 'text-amber-300';
  }

  return 'text-green-300';
};
