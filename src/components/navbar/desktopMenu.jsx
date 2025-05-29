import * as React from "react";

import { Link } from "gatsby";
import { useTranslation } from "react-i18next";

import HamburgerBtn from "./hamburgerBtn";

import logo from "../../images/logo/mnfx-logo.svg";

import * as desktopMenuStyles from "../../styles/modules/layout/desktopMenu.module.scss";

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
        <header className={desktopMenuStyles.desktopMenu}>
            <nav>
                <Link to="/">
                    <img
                        className={desktopMenuStyles.logo}
                        src={logo}
                        alt="Menefex Logo"
                        width={225}
                        height={60}
                    />
                </Link>

                <ul>
                    <li>
                        <Link
                            to="/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menuItemHome").toLowerCase()}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/diensten/"
                            activeClassName={desktopMenuStyles.activePage}
                            partiallyActive
                        >
                            {t("menuItemServices").toLowerCase()}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/portfolio/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menuItemPortfolio").toLowerCase()}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/prijzen/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menuItemPrices").toLowerCase()}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/blog/"
                            activeClassName={desktopMenuStyles.activePage}
                            getProps={checkIfPartiallyActive}
                        >
                            {t("menuItemBlog").toLowerCase()}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/faq/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menuItemFaq").toLowerCase()}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/over/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menuItemAbout").toLowerCase()}
                            <span>.</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact/"
                            activeClassName={desktopMenuStyles.activePage}
                        >
                            {t("menuItemContact").toLowerCase()}
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

                    <HamburgerBtn click={drawerClickHandler} />
                </div>
            </nav>
        </header>
    );
};

export default DesktopMenu;
