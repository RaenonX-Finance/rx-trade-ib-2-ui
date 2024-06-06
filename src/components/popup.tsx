import React from 'react';

import {Dialog, DialogPanel, Transition, TransitionChild} from '@headlessui/react';
import {clsx} from 'clsx';


type Props = {
  className?: string,
} & ({
  show: boolean,
  setShow: (show: boolean) => void,
} | {
  show?: never,
  setShow?: never,
});

export const Popup = ({show, setShow, children, className}: React.PropsWithChildren<Props>) => {
  return (
    <Transition show={show ?? true} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShow ? setShow(false) : void 0}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75 transition-opacity"/>
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className={clsx(
                'relative overflow-hidden rounded-lg bg-gray-950 transition-all',
                'p-3 ring-1 ring-inset ring-gray-600 sm:my-8 sm:w-full sm:max-w-lg',
                className,
              )}>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
