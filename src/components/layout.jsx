import React, { useState } from "react";

import CookieConsent from "react-cookie-consent";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faWhatsapp,
    faSpotify,
    faFacebookF,
    faInstagram,
    faXTwitter,
    faLinkedin,
    faGithub,
    faPatreon,
    faSkype,
    faSearchengin,
} from "@fortawesome/free-brands-svg-icons";
import {
    faRotateLeft,
    faArrowRightLong,
    faRightLong,
    faPhone,
    faEnvelope,
    faRss,
    faChevronLeft,
    faChevronRight,
    faGlobe,
    faMobile,
    faShoppingCart,
    faWrench,
    faRocket,
    fa1,
    fa2,
    fa3,
    fa4,
    fa5,
    faQuoteLeft,
    faQuoteRight,
    faCalendarDays,
    faFeatherPointed,
    faAnglesRight,
    faAnglesLeft,
    faEye,
    faEnvelopeCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

library.add(
    faPenToSquare,
    faRotateLeft,
    faArrowRightLong,
    faWhatsapp,
    faSpotify,
    faRightLong,
    faPhone,
    faEnvelope,
    faFacebookF,
    faInstagram,
    faXTwitter,
    faLinkedin,
    faGithub,
    faRss,
    faPatreon,
    faSkype,
    faChevronLeft,
    faChevronRight,
    faGlobe,
    faMobile,
    faShoppingCart,
    faSearchengin,
    faWrench,
    faRocket,
    fa1,
    fa2,
    fa3,
    fa4,
    fa5,
    faQuoteLeft,
    faQuoteRight,
    faCalendarDays,
    faFeatherPointed,
    faAnglesRight,
    faAnglesLeft,
    faEye,
    faEnvelopeCircleCheck
);

import useTranslation from "../hooks/use-translation";

import DesktopMenu from "./navbar/desktopMenu";
import MobileMenu from "./navbar/mobileMenu";
import MenuOverlay from "./navbar/menuOverlay";
import Footer from "./layout/footer";

import ResponsiveTag from "./helpers/responsiveTag";

import "../styles/layout.scss";

// TODO: klaar voor TS'en..

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

                <main>
                    <div className="page-offset" />
                    {children}
                </main>

                <Footer />

                {process.env.NODE_ENV === "production" && (
                    <CookieConsent
                        expires={60}
                        buttonText={t("cookie.accept")}
                        declineButtonText={t("cookie.decline")}
                        cookieName="menefex-cookie"
                        extraCookieOptions={{ domain: ".menefex.nl" }}
                        enableDeclineButton
                        sameSite="strict"
                        overlayClasses="cookie"
                        containerClasses="cookie-container"
                        contentClasses="cookie-content"
                        buttonWrapperClasses="cookie-btns"
                        buttonClasses="cookie-btn-accept"
                        declineButtonClasses="cookie-btn-decline"
                        disableStyles
                        flipButtons
                        overlay
                    >
                        <h3>Cookies</h3>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t("cookie.text"),
                            }}
                        />
                    </CookieConsent>
                )}
            </div>

            {backdrop}

            {process.env.NODE_ENV === "development" && <ResponsiveTag />}
        </>
    );
};

export default Layout;
