import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";

import * as biographyStyles from "../../styles/modules/ui/biography.module.scss";

// TODO: klaar voor TS'en..

const Biography = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={biographyStyles.biography} id="biography">
            <div className={biographyStyles.biographyContainer}>
                <div className={biographyStyles.biographyWrapper}>
                    <h3>{t("biography.title")}</h3>
                    <p
                        className={biographyStyles.biographyText}
                        dangerouslySetInnerHTML={{
                            __html: t("biography.intro"),
                        }}
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
                        <Link to="/over/" className={biographyStyles.meerover}>
                            {t("biography.more")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Biography;
