import * as React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..

const OptimizationPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>
                    {t("services.optimizations.title")}
                    <span>.</span>
                </h1>

                <h2>{t("services.optimizations.intro")}</h2>
            </section>

            <section className={servicesStyles.servicesDetail}>
                <div className={servicesStyles.servicesContainer}>
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

export default OptimizationPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Optimalisaties laten uitvoeren";
    const pageDescription =
        "Professioneel ontworpen optimalisaties die volledig zijn afgestemd op jouw bedrijfsprocessen en gebruikersbehoeften. Onze op maat gemaakte optimalisaties bieden een gebruiksvriendelijke interface en optimale functionaliteit om jouw online succes te maximaliseren.";
    const pageSlug = "/diensten/optimalisaties-laten-uitvoeren/";

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
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
            keywords=""
            pathname={pageSlug}
            schemaMarkup={[breadcrumbSchema, serviceSchema]}
        />
    );
};
