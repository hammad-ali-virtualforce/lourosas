"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ContactModalContextType = {
  isOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
};

const ContactModalContext =
  createContext<ContactModalContextType | null>(
    null
  );

export function ContactModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,

        openContactModal: () =>
          setIsOpen(true),

        closeContactModal: () =>
          setIsOpen(false),
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context =
    useContext(ContactModalContext);

  if (!context) {
    throw new Error(
      "useContactModal must be used inside ContactModalProvider"
    );
  }

  return context;
}