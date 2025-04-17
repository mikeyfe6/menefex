import React, { useEffect } from "react";

import useTranslation from "../hooks/use-translation";

import heroLogo from "../logo/Menefex-icon.svg";

import * as heroStyles from "../styles/modules/hero.module.scss";
import * as tpWriterStyles from "../styles/modules/typewriter.module.scss";

const Hero = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        const updateVhVariable = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        updateVhVariable();

        window.addEventListener("resize", updateVhVariable);

        return () => {
            window.removeEventListener("resize", updateVhVariable);
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const hasScrollPosition = section.hasAttribute("data-scroll-center");

        if (hasScrollPosition) {
            const blockValue = "center";
            const scrollOptions = {
                behavior: "smooth",
                block: blockValue,
                inline: "nearest",
            };
            section.scrollIntoView(scrollOptions);
        } else {
            const offset = 175;
            const scrollOptions = {
                top: section.offsetTop - offset,
                behavior: "smooth",
            };

            window.scrollTo(scrollOptions);
        }
    };

    return (
        <section className={heroStyles.hero} id="hero">
            <div className={heroStyles.heroImage}>
                <img
                    className={heroStyles.heroLogo}
                    src={heroLogo}
                    alt="Menefex Logo"
                    width={320}
                    height={320}
                />
            </div>
            <div>
                <h1
                    className={`${tpWriterStyles.tpwriter} ${
                        tpWriterStyles.line
                    } ${
                        currentLanguage === "nl"
                            ? tpWriterStyles.animTypewriterNl
                            : tpWriterStyles.animTypewriterEn
                    }`}
                >
                    <span className={tpWriterStyles.wmb}>
                        {t("hero.webMediaCompany")}
                    </span>{" "}
                    <br />
                    <span className={tpWriterStyles.mnfx}>
                        {t("hero.menefex")}
                    </span>
                    <span className={tpWriterStyles.dot}>.</span>{" "}
                    <span className={tpWriterStyles.welkom}>
                        {t("hero.welcome")}
                    </span>
                </h1>
                <h2
                    className={heroStyles.heroSlogan}
                    dangerouslySetInnerHTML={{ __html: t("hero.slogan") }}
                />
            </div>

            <div className={heroStyles.heroCta}>
                <div
                    className={heroStyles.scrollDown}
                    type="button"
                    onClick={() => scrollToSection("cta")}
                />

                <div
                    className={heroStyles.heroButtons}
                    id="cta"
                    data-scroll-center
                >
                    <button
                        type="button"
                        name="cta"
                        onClick={() => scrollToSection("biografie")}
                    >
                        {t("heroBiography")}
                    </button>
                    <span>|</span>
                    <button
                        type="button"
                        name="cta"
                        onClick={() => scrollToSection("services")}
                    >
                        {t("heroServices")}
                    </button>
                    <span>|</span>
                    <button
                        type="button"
                        name="cta"
                        onClick={() => scrollToSection("portfolio")}
                    >
                        {t("heroPortfolio")}
                    </button>
                </div>
            </div>
        </section>
    );
};
export default Hero;
