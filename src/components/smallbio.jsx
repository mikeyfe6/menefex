import React from "react";

import { Link } from "gatsby";

import useTranslation from "../hooks/use-translation";

import * as smallBioStyles from "../styles/modules/smallbio.module.scss";

const Smallbio = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section
            className={smallBioStyles.smallbioContainer}
            id="biografie"
            data-scroll-center
        >
            <div className={smallBioStyles.smallbioWrapper}>
                <hr className={smallBioStyles.thickHr} />
                <p
                    className={smallBioStyles.smallbioText}
                    dangerouslySetInnerHTML={{ __html: t("smallbio.intro") }}
                />

                <div>
                    <a
                        href="https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300"
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Luister naar onze #STAYVIBIN'-playlist op Spotify"
                    >
                        <i className="fa-brands fa-spotify" />
                    </a>
                    <Link to="/over/" className={smallBioStyles.meerover}>
                        {t("smallbio.moreButton")}
                    </Link>
                </div>

                <hr className={smallBioStyles.thinHr} />
            </div>
        </section>
    );
};

export default Smallbio;
