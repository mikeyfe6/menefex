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
                <h1 className="page-title">
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
                name: "Diensten",
                item: siteUrl + "/diensten/",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Optimalisaties laten uitvoeren",
                item: siteUrl + "/diensten/optimalisaties-laten-uitvoeren/",
            },
        ],
    };

    return (
        <SEO
            title="Optimalisaties laten uitvoeren"
            description="Laat een e-mailtemplate maken die past bij jouw huisstijl en merkidentiteit. Perfect voor nieuwsbrieven, marketingcampagnes en meer."
            keywords=""
            pathname="/diensten/optimalisaties-laten-uitvoeren/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
