import React, { useEffect, useRef } from "react";

import { Link } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useSiteMetadata from "../../hooks/use-site-metadata";

import useTranslation from "../../hooks/use-translation";

import minilogo from "../../images/logo/mnfx-icon.svg";

import * as footerStyles from "../../styles/modules/layout/footer.module.scss";

// TODO: klaar voor TS'en..

const Footer = () => {
    const { t, i18n, isHydrated } = useTranslation();
    const currentLanguage = i18n.language;

    const { title, email, company, handle } = useSiteMetadata();

    const today = new Date().getFullYear();

    const footerCredits = t("footer.credits")
        .replace("{{today}}", today)
        .replace("{{title}}", title);

    const lastLoadedLang = useRef(null);

    useEffect(() => {
        if (lastLoadedLang.current === currentLanguage) return;

        const loadFacebookSDK = () => {
            const fbLocale = currentLanguage === "nl" ? "nl_NL" : "en_US";

            const existingScript = document.querySelector(
                'script[src*="connect.facebook.net"]'
            );
            if (existingScript) existingScript.remove();

            if (window.FB) delete window.FB;
            const fbRoot = document.getElementById("fb-root");
            if (fbRoot) fbRoot.innerHTML = "";

            const script = document.createElement("script");
            script.defer = true;
            script.crossOrigin = "anonymous";
            script.src = `https://connect.facebook.net/${fbLocale}/sdk.js#xfbml=1&version=v24.0&appId=${process.env.GATSBY_FB_APP_ID}`;
            script.onload = () => {
                if (window.FB) {
                    window.FB.XFBML.parse();
                }
            };

            document.body.appendChild(script);
            lastLoadedLang.current = currentLanguage;
        };

        loadFacebookSDK();
    }, [currentLanguage]);

    if (!isHydrated) return null;

    return (
        <footer>
            <div className={footerStyles.footerQuote}>
                <blockquote>
                    <cite>
                        &quot;Instead of thinking outside of the box, get rid of
                        the box&quot;
                    </cite>{" "}
                    - Deepak Chopra
                </blockquote>
            </div>
            <div className={footerStyles.footerMain}>
                <div className={footerStyles.footerContainer}>
                    <div className={footerStyles.footerInfo}>
                        <div className={footerStyles.footerInfo__contact}>
                            <div>
                                <h4>Connect with us</h4>

                                <div>
                                    <a
                                        href={`mailto:${email}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <span className={footerStyles.mail}>
                                            e:
                                        </span>{" "}
                                        {email}
                                    </a>{" "}
                                    <a href="tel:0611054318">
                                        <span className={footerStyles.tel}>
                                            t:
                                        </span>{" "}
                                        +31 6 11 05 43 18
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h4>Straight from</h4>
                                <p>
                                    <span className={footerStyles.amsterdam}>
                                        x x x
                                    </span>{" "}
                                    amsterdam, {t("footer.nederland")}
                                </p>
                            </div>
                        </div>

                        <div className={footerStyles.footerInfo__services}>
                            <h4>{t("footer.services.title")}</h4>
                            <ul>
                                <li>
                                    <Link to="/diensten/email-template-laten-maken/">
                                        {t("footer.services.email")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/diensten/onderhoud-updates-uitvoeren/">
                                        {t("footer.services.maintenance")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/diensten/optimalisaties-laten-uitvoeren/">
                                        {t("footer.services.optimizations")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/diensten/webapplicatie-laten-maken/">
                                        {t("footer.services.webapp")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/diensten/webshop-laten-maken/">
                                        {t("footer.services.webshop")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/diensten/website-laten-maken/">
                                        {t("footer.services.website")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/diensten/zoekmachineoptimalisatie/">
                                        {t("footer.services.seo")}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className={footerStyles.footerInfo__about}>
                            <h4>{title}</h4>
                            <ul>
                                <li>
                                    <Link to="/over/">{t("footer.about")}</Link>
                                </li>
                                <li>
                                    <Link to="/portfolio/">Portfolio</Link>
                                </li>
                                <li>
                                    <Link to="/prijzen/">
                                        {t("footer.prices")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blog/">Blog</Link>
                                </li>
                                <li>
                                    <Link to="/faq/">FAQ</Link>
                                </li>
                                <li>
                                    <Link to="/sitemap-0.xml">Sitemap</Link>
                                </li>
                            </ul>
                        </div>

                        <hr />

                        <div className={footerStyles.footerInfo__socials}>
                            <h4>{t("footer.followUs")}</h4>

                            <ul>
                                <li>
                                    <a
                                        href={`https://www.facebook.com/${handle}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className={footerStyles.fb}
                                        aria-label="Facebook"
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "facebook-f"]}
                                            size="xl"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`https://www.instagram.com/${handle}/`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className={footerStyles.ig}
                                        aria-label="Instagram"
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "instagram"]}
                                            size="xl"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`https://www.twitter.com/${handle}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className={footerStyles.tw}
                                        aria-label="Twitter"
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "x-twitter"]}
                                            size="xl"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`https://www.linkedin.com/company/${handle}/`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className={footerStyles.li}
                                        aria-label="LinkedIn"
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "linkedin"]}
                                            size="xl"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/mikeyfe6"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className={footerStyles.gh}
                                        aria-label="GitHub"
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "github"]}
                                            size="xl"
                                        />
                                    </a>
                                </li>
                            </ul>

                            <div>
                                <div id="fb-root"></div>
                                <div
                                    className="fb-page"
                                    data-href={`https://www.facebook.com/${handle}`}
                                    data-tabs=""
                                    data-width=""
                                    data-height=""
                                    data-small-header="false"
                                    data-adapt-container-width="true"
                                    data-hide-cover="false"
                                    data-show-facepile="true"
                                >
                                    <blockquote
                                        cite={`https://www.facebook.com/${handle}`}
                                        className="fb-xfbml-parse-ignore"
                                    >
                                        <a
                                            href={`https://www.facebook.com/${handle}`}
                                        >
                                            {company}
                                        </a>
                                    </blockquote>
                                </div>
                            </div>
                            <a
                                href="https://www.buymeacoffee.com/menefex"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://cdn.buymeacoffee.com/buttons/v2/default-white.png"
                                    alt="Buy Me A Coffee"
                                    width={175}
                                    height={50}
                                />
                            </a>

                            {/* <a href="https://www.buymeacoffee.com/menefex">
                                <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=menefex&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
                            </a> */}
                        </div>
                    </div>

                    <Link to="/" className={footerStyles.footerLogo}>
                        <img
                            src={minilogo}
                            alt="Menefex Mini Logo"
                            width={110}
                            height={110}
                        />
                    </Link>

                    <small
                        className={footerStyles.footerCredits}
                        dangerouslySetInnerHTML={{ __html: footerCredits }}
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
