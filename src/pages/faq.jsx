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
            <section className="page-intro">
                <h1 className="page-title">
                    {t("faq.title")}
                    <span>.</span>
                </h1>

                <h2 className="page-sub">{t("faq.intro")}</h2>
            </section>
        </Layout>
    );
};

export default FaqPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
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
