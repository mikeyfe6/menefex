import React, { useEffect } from "react";

// TODO: klaar voor TS'en..

const GoogleAdsDisplay = ({ slot }) => {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        return () => {};
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={process.env.GATSBY_GOOGLE_CA_PUB}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};

export default GoogleAdsDisplay;
