import { useState, useCallback } from 'react';

type UseDisclosureReturn = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useDisclosure = (defaultIsOpen = false): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
