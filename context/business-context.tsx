import React, { createContext, useContext, useState } from "react";

// Create the context
const BusinessContext = createContext<{ uniqueLink: string | null }>({
  uniqueLink: null,
});

export const useBusiness = () => useContext(BusinessContext);

export const BusinessProvider = ({
  children,
  uniqueLink,
}: {
  children: React.ReactNode;
  uniqueLink: string;
}) => {
  const [link] = useState(uniqueLink);

  return (
    <BusinessContext.Provider value={{ uniqueLink: link }}>
      {children}
    </BusinessContext.Provider>
  );
};
