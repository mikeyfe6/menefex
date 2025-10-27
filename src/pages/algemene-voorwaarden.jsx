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
            <section id="terms-conditions">
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
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Algemene Voorwaarden";
    const pageSlug = "/algemene-voorwaarden/";

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
            description="Bekijk de algemene voorwaarden van Menefex. Deze voorwaarden zijn van toepassing op alle offertes, aanbiedingen, werkzaamheden, en diensten van Menefex, en omvatten informatie over prijzen, betaling, levering, garanties, en meer."
            keywords="terms and conditions, algemene voorwaarden, offertes, aanbiedingen, werkzaamheden, diensten, prijzen, betaling, levering, garanties"
            pathname={pageSlug}
            schemaMarkup={breadcrumbSchema}
        />
    );
};
