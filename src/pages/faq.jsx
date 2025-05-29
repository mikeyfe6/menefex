import * as React from "react";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

const FaqPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                {t("faqTitle")}
                <span>.</span>
            </h1>

            <h2 className="page-sub">{t("faqIntro")}</h2>
        </Layout>
    );
};

export default FaqPage;

export const Head = () => {
    const { title, siteUrl } = useSiteMetadata();

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
                name: "FAQ (Veelgestelde vragen)",
                item: siteUrl + "/faq/",
            },
        ],
    };

    return (
        <SEO
            title="FAQ"
            description=""
            keywords=""
            pathname="/faq/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
