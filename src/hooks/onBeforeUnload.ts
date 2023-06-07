import React from 'react';


export type UseOnBeforeUnloadOpts = {
  onBeforeUnload: () => void,
  deps: React.DependencyList,
};

export const useOnBeforeUnload = ({onBeforeUnload, deps}: UseOnBeforeUnloadOpts) => {
  React.useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, deps);
};
