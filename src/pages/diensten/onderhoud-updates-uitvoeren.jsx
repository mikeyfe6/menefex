import * as React from "react";

import { Link } from "gatsby";

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

export default MaintenancePage;

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
                name: "Onderhoud en/of updates uitvoeren",
                item: siteUrl + "/diensten/onderhoud-updates-uitvoeren/",
            },
        ],
    };

    return (
        <SEO
            title="Onderhoud en/of updates uitvoeren"
            description="Regelmatig onderhoud en updates om de optimale prestaties en veiligheid
        van je website of webapplicatie te garanderen. Wij zorgen ervoor dat
        alles up-to-date blijft en probleemloos"
            keywords=""
            pathname="/diensten/onderhoud-updates-uitvoeren/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
