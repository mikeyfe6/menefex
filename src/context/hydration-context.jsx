import React, { createContext, useEffect, useState } from "react";

export const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <HydrationContext.Provider value={{ isHydrated }}>
            {children}
        </HydrationContext.Provider>
    );
};
