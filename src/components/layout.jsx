import React, { useState } from "react";

import CookieConsent from "react-cookie-consent";

import useTranslation from "../hooks/use-translation";

import DesktopMenu from "./navbar/desktopMenu";
import MobileMenu from "./navbar/mobileMenu";
import MenuOverlay from "./navbar/menuOverlay";
import Footer from "./layout/footer";

import ResponsiveTag from "./helpers/responsiveTag";

import "../styles/layout.scss";

const Layout = ({ children }) => {
    const { t, isHydrated } = useTranslation();
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen((prevState) => !prevState);
    };

    const menuOverlayClickHandler = () => {
        setSideDrawerOpen(false);
    };

    let backdrop;

    if (sideDrawerOpen) {
        backdrop = <MenuOverlay click={menuOverlayClickHandler} />;
    }

    if (!isHydrated) return null;

    return (
        <>
            <div className="menefex">
                <header>
                    <DesktopMenu
                        drawerClickHandler={drawerToggleClickHandler}
                    />
                    <MobileMenu show={sideDrawerOpen} />
                </header>

                <main>{children}</main>

                <Footer />

                <CookieConsent
                    expires={60}
                    buttonText={t("cookieAccept")}
                    declineButtonText={t("cookieDecline")}
                    cookieName="menefex-cookie"
                    extraCookieOptions={{ domain: ".menefex.nl" }}
                    enableDeclineButton
                    sameSite="strict"
                    overlayClasses="cookie"
                    containerClasses="cookie-container"
                    contentClasses="cookie-content"
                    buttonWrapperClasses="cookie-btn-wrapper"
                    buttonClasses="cookie-btn-accept"
                    declineButtonClasses="cookie-btn-decline"
                    disableStyles
                    flipButtons
                    overlay
                >
                    <h3>Cookies</h3>
                    <p dangerouslySetInnerHTML={{ __html: t("cookieText") }} />
                </CookieConsent>
            </div>

            {backdrop}

            {process.env.NODE_ENV === "development" && <ResponsiveTag />}
        </>
    );
};

export default Layout;
