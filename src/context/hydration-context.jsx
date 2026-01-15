import React, { createContext, useEffect, useState, useMemo } from "react";

export const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const contextValue = useMemo(() => ({ isHydrated }), [isHydrated]);

    return <HydrationContext.Provider value={contextValue}>{children}</HydrationContext.Provider>;
};
