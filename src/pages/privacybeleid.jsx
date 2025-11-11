import * as React from "react";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

const PrivacyPolicy = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section id="privacy-policy">
                <div
                    className="page-docs"
                    dangerouslySetInnerHTML={{ __html: t("privacyPolicy") }}
                />
            </section>
        </Layout>
    );
};

export default PrivacyPolicy;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Privacybeleid";
    const pageSlug = "/privacybeleid/";

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        name: pageTitle,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: pageTitle,
                item: siteUrl + pageSlug,
            },
        ],
    };

    return (
        <SEO
            title={pageTitle}
            description="Ontdek hoe Menefex jouw gegevens beschermt en verwerkt. Bekijk ons privacybeleid voor volledige informatie over ons gebruik van cookies, gegevensbeheer en jouw rechten."
            keywords="privacy policy, privacybeleid, cookies, gegevensbeheer, gegevensbescherming, GDPR, AVG"
            pathname={pageSlug}
            schemaMarkup={breadcrumbSchema}
        />
    );
};
