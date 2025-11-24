"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveCommandContextType {
  activeCommand: string | null;
  setActiveCommand: (command: string | null) => void;
}

const ActiveCommandContext = createContext<ActiveCommandContextType | undefined>(undefined);

export const ActiveCommandProvider = ({ children }: { children: ReactNode }) => {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);

  return (
    <ActiveCommandContext.Provider value={{ activeCommand, setActiveCommand }}>
      {children}
    </ActiveCommandContext.Provider>
  );
};

export const useActiveCommand = () => {
  const context = useContext(ActiveCommandContext);
  if (context === undefined) {
    throw new Error('useActiveCommand must be used within an ActiveCommandProvider');
  }
  return context;
};

