import * as React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..

const MaintenancePage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1 className="page-title">
                    {t("services.maintenance.title")}
                    <span>.</span>
                </h1>

                <h2>{t("services.maintenance.intro")}</h2>
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

export default MaintenancePage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Onderhoud en/of updates uitvoeren";
    const pageDescription =
        "Regelmatig onderhoud en updates om de optimale prestaties en veiligheid van je website of webapplicatie te garanderen. Wij zorgen ervoor dat alles up-to-date blijft en probleemloos werkt.";
    const pageSlug = "/diensten/onderhoud-updates-uitvoeren/";

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
