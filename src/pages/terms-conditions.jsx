import * as React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";
import useTranslation from "../hooks/use-translation";

import SEO from "../components/seo";
import Layout from "../components/layout";

const TermsConditions = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section>
                <div
                    className="page-docs"
                    dangerouslySetInnerHTML={{ __html: t("termsConditions") }}
                />
            </section>
        </Layout>
    );
};

export default TermsConditions;

export const Head = () => {
    const { title, siteUrl } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
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
                name: "Algemene Voorwaarden",
                item: siteUrl + "/terms-conditions/",
            },
        ],
    };

    return (
        <SEO
            title="Algemene Voorwaarden"
            description="Bekijk de algemene voorwaarden van Menefex. Deze voorwaarden zijn van toepassing op alle offertes, aanbiedingen, werkzaamheden, en diensten van Menefex, en omvatten informatie over prijzen, betaling, levering, garanties, en meer."
            keywords="terms and conditions, algemene voorwaarden, offertes, aanbiedingen, werkzaamheden, diensten, prijzen, betaling, levering, garanties"
            pathname="/terms-conditions/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
