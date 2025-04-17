import React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";
import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Hero from "../components/hero";
import Service from "../components/services";
import Projects from "../components/slider";
import Smallbio from "../components/smallbio";
import Actual from "../components/actual";

const IndexPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <Hero />

            <div className="vertical-line-long" />

            <h3 className="home-title">{t("homeBiographyTitle")}</h3>

            <Smallbio />

            <div className="vertical-line-short" />

            <h3 className="home-title">{t("homeActualTitle")}</h3>

            <Actual />

            <div className="vertical-line-short" />

            <h3 className="home-title">{t("homeServicesTitle")}</h3>

            <Service />

            <div className="vertical-line-short" />

            <h3 className="home-title">{t("homeProjectsTitle")}</h3>

            <Projects />
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
