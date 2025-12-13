import React, { forwardRef } from "react";

import useTranslation from "../../hooks/use-translation";

// TODO: klaar voor TS'en..

const Banner = forwardRef((props, ref) => {
    const { t } = useTranslation();

    return (
        <div className="page-banner" ref={ref}>
            <div className="banner">
                <div className="banner-text">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("banner.text"),
                        }}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("banner.text"),
                        }}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    );
});

export default Banner;
