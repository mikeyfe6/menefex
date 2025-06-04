import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";

import * as mobileMenuStyles from "../../styles/modules/layout/mobileMenu.module.scss";

const MobileMenu = ({ show }) => {
    const { t } = useTranslation();

    let drawerClasses = mobileMenuStyles.mobileMenu;
    if (show) {
        drawerClasses = `${mobileMenuStyles.mobileMenu} ${mobileMenuStyles.open}`;
    }

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
                        {t("menu.home").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/diensten/"
                        activeClassName={mobileMenuStyles.activePage}
                        partiallyActive
                    >
                        {t("menu.services").toLowerCase()}

                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/portfolio/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menu.portfolio").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/prijzen/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menu.prices").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/blog/"
                        activeClassName={mobileMenuStyles.activePage}
                        getProps={checkIfPartiallyActive}
                    >
                        {t("menu.blog").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/faq/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menu.faq").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/over/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menu.about").toLowerCase()}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact/"
                        activeClassName={mobileMenuStyles.activePage}
                    >
                        {t("menu.contact").toLowerCase()}
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
                        {t("menu.whatsapp")}
                        <span className={mobileMenuStyles.dots}>.</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default MobileMenu;
