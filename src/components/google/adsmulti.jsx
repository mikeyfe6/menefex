import React, { useEffect } from "react";

// TODO: klaar voor TS'en..

const GoogleAdsMulti = ({ slot }) => {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        return () => {};
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-format="autorelaxed"
            data-ad-client={process.env.GATSBY_GOOGLE_CA_PUB}
            data-ad-slot={slot}
        />
    );
};

export default GoogleAdsMulti;
