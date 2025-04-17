import React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as powersStyles from "../../styles/modules/powers.module.scss";

const MaintenancePage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                {t("powersMaintenanceTitle")}
                <span>.</span>
            </h1>
            <h2 className="page-sub">{t("powersMaintenanceInfo")}</h2>

            <div className={powersStyles.buttons}>
                <Link to="/diensten/">
                    <i className="fa-solid fa-angles-left" />{" "}
                    {t("powersServices")}
                </Link>
                <Link to="/prijzen/">
                    {t("powersPrices")}{" "}
                    <i className="fa-solid fa-angles-right" />
                </Link>
            </div>
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
