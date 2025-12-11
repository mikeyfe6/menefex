import * as React from "react";

import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import heroLogo from "../../images/logo/mnfx-icon.svg";

import * as heroStyles from "../../styles/modules/layout/hero.module.scss";

// TODO: klaar voor TS'en..

const Hero = () => {
    const { t } = useTranslation();

    const { telephone } = useSiteMetadata();

    return (
        <section className={heroStyles.hero} id="hero">
            <div className={heroStyles.heroContainer}>
                <div className={heroStyles.heroVisual}>
                    <div>
                        <div className={heroStyles.heroContent}>
                            <div className={heroStyles.heroLogo}>
                                <img
                                    src={heroLogo}
                                    alt="Menefex Logo"
                                    width={320}
                                    height={320}
                                />
                            </div>

                            <h1>
                                {t("hero.menefex")}
                                <span>.</span>{" "}
                            </h1>
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: t("hero.slogan"),
                                }}
                            />
                            <div>
                                <Link to="/contact/">
                                    {t("hero.cta.start")}
                                </Link>
                                <a href={`tel:+${telephone}`}>
                                    {t("hero.cta.call")}
                                </a>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <FontAwesomeIcon
                                    icon={["fas", "caret-right"]}
                                    size="xs"
                                />
                                <span>{t("hero.experience")}</span>
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={["fas", "caret-right"]}
                                    size="xs"
                                />
                                <span>{t("hero.affordable")}</span>
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={["fas", "caret-right"]}
                                    size="xs"
                                />
                                <span>{t("hero.fast")}</span>
                            </li>
                        </ul>
                    </div>

                    <hr />

                    <div className={heroStyles.heroImage}>
                        <StaticImage
                            src="../../images/ghibli-mf.png"
                            alt="Michael Fransman"
                            width={360}
                            height={540}
                        />
                    </div>
                </div>

                <div className={heroStyles.heroCta}>
                    <a
                        href="#cta"
                        className={heroStyles.heroScroll}
                        type="button"
                        aria-label="Naar de CTA sectie"
                    />
                    <div className={heroStyles.heroButtons} id="cta">
                        <span>-</span>
                        <a
                            href="#biography"
                            name="cta"
                            aria-label="Scroll naar biografie sectie"
                        >
                            {t("hero.biography")}
                        </a>
                        <span>|</span>
                        <a
                            href="#services"
                            name="cta"
                            aria-label="Scroll naar diensten sectie"
                        >
                            {t("hero.services")}
                        </a>
                        <span>|</span>
                        <a
                            href="#projects"
                            name="cta"
                            aria-label="Scroll naar portfolio sectie"
                        >
                            {t("hero.portfolio")}
                        </a>
                        <span>-</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
