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
// TODO: FAQ schema maken

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
    const { title, company, siteUrl, image, favicon, bizTel } =
        useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "@id": siteUrl + "/#breadcrumb",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: title,
                item: siteUrl,
            },
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": siteUrl + "/#website",
        name: title,
        url: siteUrl,
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": siteUrl + "/#organization",
        name: title,
        alternateName: company,
        url: siteUrl,
        image: siteUrl + image,
        logo: siteUrl + favicon,
        contactPoint: [
            {
                "@type": "ContactPoint",
                "@id": siteUrl + "/#customerService",
                telephone: bizTel,
                areaServed: ["NL", "BE", "SR", "GB"],
                contactOption: "TollFree",
                contactType: "customer service",
                availableLanguage: ["Dutch", "es", "en", "German"],
            },
            {
                "@type": "ContactPoint",
                "@id": siteUrl + "/#technicalsupport",
                telephone: bizTel,
                areaServed: ["NL", "BE", "SR", "GB"],
                contactOption: "TollFree",
                contactType: "technical support",
                availableLanguage: ["Dutch", "es", "en", "German"],
            },
        ],
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
                schemaMarkup={[
                    breadcrumbSchema,
                    websiteSchema,
                    organizationSchema,
                ]}
            />
        </>
    );
};
