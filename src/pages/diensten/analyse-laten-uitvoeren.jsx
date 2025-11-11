import * as React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..

const AnalysePage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>{t("services.analyse.title")}</h1>
                <h2>{t("services.analyse.intro")}</h2>
            </section>

            <section className={servicesStyles.servicesDetail}>
                <div className={servicesStyles.servicesContainer}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: t("services.analyse.content"),
                        }}
                        className={servicesStyles.servicesContent}
                    />

                    <div className={servicesStyles.servicesButtons}>
                        <Link to="/diensten/">
                            <FontAwesomeIcon icon={["fas", "angles-left"]} />{" "}
                            {t("services.allServices")}
                        </Link>
                        <Link to="/prijzen/">
                            {t("services.goToPrices")}{" "}
                            <FontAwesomeIcon icon={["fas", "angles-right"]} />
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AnalysePage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Analyse laten uitvoeren";
    const pageDescription =
        "Professionele analyse diensten om inzicht te krijgen in jouw bedrijfsprocessen en online prestaties, zodat je weloverwogen beslissingen kunt nemen.";
    const pageSlug = "/diensten/analyse-laten-uitvoeren/";

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        name: pageTitle,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Diensten",
                item: siteUrl + "/diensten/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: pageTitle,
                item: siteUrl + pageSlug,
            },
        ],
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: pageTitle,
        description: pageDescription,
        provider: {
            "@id": siteUrl + "/#organization",
        },
        serviceType: pageTitle,
        category: "Web Development",
        areaServed: {
            "@type": "Country",
            name: "Netherlands",
        },
    };

    return (
        <SEO
            title={pageTitle}
            description={pageDescription}
            keywords="analyse laten uitvoeren, professionele analyse diensten, bedrijfsanalyse, online prestaties analyse"
            pathname={pageSlug}
            schemaMarkup={[breadcrumbSchema, serviceSchema]}
        />
    );
};
