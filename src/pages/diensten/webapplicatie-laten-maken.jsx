import * as React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..

const WebappPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1
                    dangerouslySetInnerHTML={{
                        __html: t("services.webapps.title"),
                    }}
                />
                <h2>{t("services.webapps.intro")}</h2>
            </section>

            <section className={servicesStyles.servicesDetail}>
                <div className={servicesStyles.servicesContainer}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: t("services.webapps.content"),
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

                    <div className={servicesStyles.servicesWatermark}>
                        <FontAwesomeIcon icon={["fas", "mobile"]} />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default WebappPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Webapplicatie laten maken";
    const pageDescription =
        "Professioneel ontworpen webapplicaties die volledig zijn afgestemd op jouw bedrijfsprocessen en gebruikersbehoeften. Onze op maat gemaakte webapplicaties bieden een gebruiksvriendelijke interface en optimale functionaliteit om jouw online succes te maximaliseren.";
    const pageSlug = "/diensten/webapplicatie-laten-maken/";

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
            keywords="webapplicatie laten maken, webapp laten maken, professionele webapplicaties, op maat gemaakte webapplicaties"
            pathname={pageSlug}
            schemaMarkup={[breadcrumbSchema, serviceSchema]}
        />
    );
};
