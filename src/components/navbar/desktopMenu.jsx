import * as React from "react";

import { Link } from "gatsby";
import { useTranslation } from "react-i18next";

import Hamburger from "./hamburger";

import logo from "../../images/logo/mnfx-logo.svg";

import * as desktopMenuStyles from "../../styles/modules/layout/desktopMenu.module.scss";

// TODO: klaar voor TS'en..

const DesktopMenu = ({ drawerClickHandler }) => {
    const { t, i18n } = useTranslation();

    const currentLanguage = i18n.language;

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        window.localStorage.setItem("i18nextLng", lang);
    };

    const checkIfPartiallyActive = ({ isPartiallyCurrent, location }) => {
        return location.pathname.includes("/blog") ||
            location.pathname.includes("/topics")
            ? { className: desktopMenuStyles.activePage }
            : isPartiallyCurrent
            ? { className: desktopMenuStyles.activePage }
            : null;
    };

    return (
        <div className={desktopMenuStyles.desktopMenu}>
            <nav>
                <Link to="/" className={desktopMenuStyles.logo}>
                    <img src={logo} alt="Menefex Logo" width={225} />
                </Link>

                <ul>
                    <li>
                        <Link
                            to="/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menu.home")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/diensten/"
                            activeClassName={desktopMenuStyles.activePage}
                            partiallyActive
                        >
                            {t("menu.services")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/portfolio/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menu.portfolio")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/prijzen/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menu.prices")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/blog/"
                            activeClassName={desktopMenuStyles.activePage}
                            getProps={checkIfPartiallyActive}
                        >
                            {t("menu.blog")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/faq/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menu.faq")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/over/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menu.about")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menu.contact")}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://wa.me/31611054318"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={desktopMenuStyles.whapp}
                        >
                            <i className="fa-brands fa-whatsapp" />
                        </a>
                    </li>
                    <li className={desktopMenuStyles.language}>
                        <button
                            onClick={() => switchLanguage("nl")}
                            className={
                                currentLanguage === "nl"
                                    ? desktopMenuStyles.active
                                    : ""
                            }
                        >
                            nl
                        </button>
                        <span>·</span>
                        <button
                            onClick={() => switchLanguage("en")}
                            className={
                                currentLanguage === "en"
                                    ? desktopMenuStyles.active
                                    : ""
                            }
                        >
                            en
                        </button>
                    </li>
                </ul>

                <div className={desktopMenuStyles.langAndHamburger}>
                    <div className={desktopMenuStyles.language}>
                        <button
                            onClick={() => switchLanguage("nl")}
                            className={
                                currentLanguage === "nl"
                                    ? desktopMenuStyles.active
                                    : ""
                            }
                        >
                            nl
                        </button>
                        <span>|</span>
                        <button
                            onClick={() => switchLanguage("en")}
                            className={
                                currentLanguage === "en"
                                    ? desktopMenuStyles.active
                                    : ""
                            }
                        >
                            en
                        </button>
                    </div>

                    <Hamburger click={drawerClickHandler} />
                </div>
            </nav>
        </div>
    );
};

export default DesktopMenu;
