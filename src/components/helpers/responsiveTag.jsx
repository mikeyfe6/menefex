import React, { useState, useEffect } from "react";

const ResponsiveTag = () => {
    const breakpoints = [
        { size: 23, label: "Mini View" },
        { size: 30, label: "Compact View" },
        { size: 40, label: "Mobile View" },
        { size: 52, label: "Phablet View" },
        { size: 64, label: "Tablet View" },
        { size: 76, label: "Laptop View" },
        { size: 90, label: "Desktop View" },
        { size: 120, label: "Wide View" },
        { size: Infinity, label: "Massive View" },
    ];

    const [screenSize, setScreenSize] = useState("");

    const handleResize = () => {
        const width = window.innerWidth / 16;
        const breakpoint = breakpoints.find(
            (breakpoint) => width <= breakpoint.size
        );
        setScreenSize(breakpoint.label);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="responsive-tag">
            <p>
                <strong>{screenSize}</strong>
            </p>
        </div>
    );
};

export default ResponsiveTag;
