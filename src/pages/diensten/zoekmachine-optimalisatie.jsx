import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..
// TODO: 'zoekmachineoptimalisatie' is vast aan elkaar..

const SeoPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1 className="page-title">
                    {t("services.seo.title")}
                    <span>.</span>
                </h1>

                <h2>{t("services.seo.intro")}</h2>
            </section>

            <section className={servicesStyles.servicesDetail}>
                <div className={servicesStyles.servicesContainer}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: t("services.seo.content"),
                        }}
                        className={servicesStyles.servicesContent}
                    />

                    <div className={servicesStyles.servicesButtons}>
                        <Link to="/diensten/">
                            <i className="fa-solid fa-angles-left" />{" "}
                            {t("services.showAllServices")}
                        </Link>
                        <Link to="/prijzen/">
                            {t("services.goToPrices")}{" "}
                            <i className="fa-solid fa-angles-right" />
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default SeoPage;

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
                name: "Diensten",
                item: siteUrl + "/diensten/",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Zoekmachine Optimalisatie (SEO)",
                item: siteUrl + "/diensten/zoekmachine-optimalisatie/",
            },
        ],
    };

    return (
        <SEO
            title="Zoekmachine Optimalisatie (SEO)"
            description="Verbeter de vindbaarheid van je website in zoekmachines met gerichte
        SEO-strategieën. Wij optimaliseren je website om hogere posities te
        behalen in zoekresultaten, zodat je meer verkeer en klanten aantrekt."
            keywords=""
            pathname="/diensten/zoekmachine-optimalisatie/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
