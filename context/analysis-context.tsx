// analysis-context.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Analysis } from "@/types";

interface AnalysisContextType {
  analysis: Analysis | null;
  setAnalysis: (analysis: Analysis | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = (): AnalysisContextType => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
