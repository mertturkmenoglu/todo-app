import { Dialog } from '@headlessui/react';
import React from 'react';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/solid';

export interface PopupProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Popup({ title, children, isOpen, setIsOpen }: PopupProps): JSX.Element {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="z-50 font-mono"
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      <div className="fixed left-0 right-0 top-0 flex min-h-full items-center justify-center overflow-y-auto p-4 text-center">
        <Dialog.Panel
          className={clsx(
            'w-full max-w-lg',
            'flex transform flex-col items-center overflow-hidden rounded bg-white p-8 align-middle shadow-xl transition-all'
          )}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 self-end"
          >
            <XMarkIcon className="h-5 w-5 text-black" />
          </button>

          <Dialog.Title className="mt-2 text-center text-2xl font-bold text-amber-500">{title}</Dialog.Title>

          <Dialog.Description
            className="mt-8 w-full"
            as="div"
          >
            {children}
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Popup;
