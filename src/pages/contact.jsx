import React from "react";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import LeadForm from "../components/forms/leadForm";
import Info from "../components/ui/info";
import Maps from "../components/google/maps";

const ContactPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                Contact<span>.</span>
            </h1>

            <div dangerouslySetInnerHTML={{ __html: t("contactIntro") }} />

            <div className="form-info">
                <LeadForm />
                <Info />
            </div>

            <Maps />
        </Layout>
    );
};

export default ContactPage;

export const Head = () => {
    const {
        title,
        author,
        siteUrl,
        image,
        favicon,
        description,
        bizTel,
        bizEmail,
    } = useSiteMetadata();

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
            {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: siteUrl + "/contact/",
            },
        ],
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": siteUrl + "/#localbusiness",
        name: title,
        founder: {
            "@type": "Person",
            name: author,
        },
        image: siteUrl + image,
        logo: siteUrl + favicon,
        "@id": siteUrl, // #localbusiness
        description: description,
        url: siteUrl,
        telephone: bizTel,
        email: bizEmail,
        hasMap: "https://g.page/MenefexWMB?share",
        areaServed: {
            "@type": "geoShape",
            addressCountry: ["Netherlands", "Belgium", "Surinam"],
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
            latitude: "52.31049600748774",
            longitude: "4.973736770446289",
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "19:00",
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
        <SEO
            title="Contact"
            description="Contacteer Menefex voor een offerte, samenwerking of algemene vragen. Wij staan klaar om samen iets geweldigs te creëren! Binnen één werkdag reactie."
            keywords="contact, offerte, samenwerking, algemene vragen, reactie, Menefex, webontwikkeling, digitalisering, SEO, technologie"
            pathname="/contact/"
            schemaMarkup={[breadcrumbSchema, localBusinessSchema]}
        />
    );
};
