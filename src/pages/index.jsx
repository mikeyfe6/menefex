import * as React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Hero from "../components/layout/hero";
import Biography from "../components/ui/biography";
import Actual from "../components/ui/actual";
import Services from "../components/ui/services";
import Projects from "../components/ui/projects";
import Usp from "../components/ui/usp";
import Faq from "../components/ui/faq";
import SmartForm from "../components/forms/smartForm";

import * as indexStyles from "../styles/modules/pages/index.module.scss";

// TODO: klaar voor TS'en..

const IndexPage = () => {
    return (
        <Layout>
            <Hero />

            <div className={indexStyles.verticalLineLong} />

            <Usp />

            <div className={indexStyles.verticalLineShort} />

            <Biography />

            <div className={indexStyles.verticalLineShort} />

            <Actual />

            <div className={indexStyles.verticalLineShort} />

            <Services />

            <div className={indexStyles.verticalLineShort} />

            <Projects />

            <div className={indexStyles.verticalLineShort} />

            <Faq />

            <div className={indexStyles.verticalLineShort} />

            <SmartForm />
        </Layout>
    );
};

export default IndexPage;

export const Head = () => {
    const { title, siteUrl, image, bizTel, description, bizEmail } =
        useSiteMetadata();

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": siteUrl + "/#localbusiness",
        name: title,
        parentOrganization: {
            "@id": siteUrl + "/#organization",
        },
        image: siteUrl + image,
        logo: {
            "@id": siteUrl + "/#logo",
        },
        description: description,
        url: siteUrl,
        telephone: bizTel,
        email: bizEmail,
        hasMap: "https://g.page/MenefexWMB?share",
        areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: {
                "@id": siteUrl + "/#geo",
            },
            geoRadius: "1000",
        },
        priceRange: "$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Kelbergen 192",
            postalCode: "1104LJ",
            addressLocality: "Amsterdam",
            addressRegion: "Noord-Holland",
            addressCountry: "NL",
        },
        geo: {
            "@type": "GeoCoordinates",
            "@id": siteUrl + "/#geo",
            latitude: "52.31049600748774",
            longitude: "4.973736770446289",
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00:00",
            closes: "19:00:00",
        },
        sameAs: [
            "https://www.facebook.com/MenefexWMB",
            "https://www.twitter.com/MenefexWMB",
            "https://www.instagram.com/menefexwmb/",
            "https://www.linkedin.com/company/menefexwmb/",
            "https://github.com/mikeyfe6",
            "https://www.patreon.com/menefexWMB",
            "https://feeds.feedburner.com/MenefexWMB",
            "https://wa.me/31611054318",
            "https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300",
        ],
    };

    return (
        <>
            <SEO
                title="#1 Website Specialist"
                description="Menefex is een vooraanstaand & innovatief webmediabedrijf in Amsterdam. Wij ontwerpen, ontwikkelen en optimaliseren op maat gemaakte websites, webshops en webapplicaties. Vanaf €295,- uw digitale ambities waarmaken. Neem vandaag nog contact op!"
                keywords="website specialist, webmediabedrijf, webdesign, webdevelopment, webshop, webapplicatie, digitale ambities, contact"
                schemaMarkup={localBusinessSchema}
            />
        </>
    );
};
