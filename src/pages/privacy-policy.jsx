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
            <section>
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

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Privacybeleid",
                item: siteUrl + "/privacy-policy/",
            },
        ],
    };

    return (
        <SEO
            title="Privacybeleid"
            description="Ontdek hoe Menefex uw gegevens beschermt en verwerkt. Bekijk ons privacybeleid voor volledige informatie over ons gebruik van cookies, gegevensbeheer en uw rechten."
            keywords="privacy policy, privacybeleid, cookies, gegevensbeheer, gegevensbescherming, GDPR, AVG"
            pathname="/privacy-policy/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
