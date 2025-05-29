import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";

import * as mobileMenuStyles from "../../styles/modules/layout/mobileMenu.module.scss";

const MobileMenu = ({ show }) => {
    const { t, isHydrated } = useTranslation();

    let drawerClasses = mobileMenuStyles.mobileMenu;
    if (show) {
        drawerClasses = `${mobileMenuStyles.mobileMenu} ${mobileMenuStyles.open}`;
    }

    if (!isHydrated) return null;

    const checkIfPartiallyActive = ({ isPartiallyCurrent, location }) => {
        return location.pathname.includes("/blog") ||
            location.pathname.includes("/topics")
            ? { className: mobileMenuStyles.activePage }
            : isPartiallyCurrent
            ? { className: mobileMenuStyles.activePage }
            : null;
    };

    return (
        <nav className={drawerClasses}>
            <ul>
                <li>
                    <Link to="/" activeClassName={mobileMenuStyles.activePage}>
                        {t("menuItemHome").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/diensten/"
                        activeClassName={mobileMenuStyles.activePage}
                        partiallyActive
                    >
                        {t("menuItemServices").toLowerCase()}

                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/portfolio/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menuItemPortfolio").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/prijzen/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menuItemPrices").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/blog/"
                        activeClassName={mobileMenuStyles.activePage}
                        getProps={checkIfPartiallyActive}
                    >
                        {t("menuItemBlog").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/faq/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menuItemFaq").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/over/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menuItemAbout").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menuItemContact").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <a
                        href="https://wa.me/31611054318"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={mobileMenuStyles.whapp}
                    >
                        <i className="fa-brands fa-whatsapp" />
                        {t("menuItemWhatsapp")}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default MobileMenu;
