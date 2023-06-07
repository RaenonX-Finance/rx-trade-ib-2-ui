import React from 'react';


type UseAnimationOpts = {
  deps: React.DependencyList,
  onTrigger?: () => void,
  minReplayMs?: number,
};

type UseAnimationReturn<T> = React.RefObject<T>;

export const useAnimation = <T extends HTMLElement = HTMLElement>({
  deps,
  onTrigger,
  minReplayMs,
}: UseAnimationOpts): UseAnimationReturn<T> => {
  const [lastPlay, setLastPlay] = React.useState(0);
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (onTrigger) {
      onTrigger();
    }

    const now = Date.now();

    if (ref.current && now - lastPlay > (minReplayMs || 0)) {
      // Trigger animation
      ref.current.style.animation = 'none';
      // Call the getter to trigger
      // noinspection BadExpressionStatementJS
      ref.current.offsetHeight;
      ref.current.style.animation = '';

      if (minReplayMs) {
        setLastPlay(now);
      }
    }
  }, deps);

  return ref;
};
