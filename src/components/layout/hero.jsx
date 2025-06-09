import * as React from "react";

import useTranslation from "../../hooks/use-translation";

import { StaticImage } from "gatsby-plugin-image";

import heroLogo from "../../images/logo/mnfx-icon.svg";

import * as heroStyles from "../../styles/modules/layout/hero.module.scss";

// TODO: klaar voor TS'en..

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className={heroStyles.hero} id="hero">
            <div className={heroStyles.heroContainer}>
                <div className={heroStyles.heroVisual}>
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
                            className={heroStyles.heroSlogan}
                            dangerouslySetInnerHTML={{
                                __html: t("hero.slogan"),
                            }}
                        />
                    </div>

                    <hr />

                    <div className={heroStyles.heroImage}>
                        <StaticImage
                            src="../../images/ghibli-mf.png"
                            alt="Edutain U Productions"
                        />
                    </div>
                </div>

                <div className={heroStyles.heroCta}>
                    <a
                        href="#cta"
                        className={heroStyles.heroScroll}
                        type="button"
                    />

                    <div className={heroStyles.heroButtons} id="cta">
                        <span>-</span>
                        <a href="#biografie" type="button" name="cta">
                            {t("hero.biography")}
                        </a>
                        <span>|</span>
                        <a href="#services" name="cta">
                            {t("hero.services")}
                        </a>
                        <span>|</span>
                        <a href="#portfolio" name="cta">
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
