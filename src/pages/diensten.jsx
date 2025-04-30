import React from "react";

import { Link } from "gatsby";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as powersStyles from "../styles/modules/pages/powers.module.scss";

const powersPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                {t("powersTitle")}
                <span>.</span>
            </h1>
            <h2 className="page-sub">{t("powersIntro")}</h2>
            <section className={powersStyles.powers}>
                <div>
                    <h3
                        dangerouslySetInnerHTML={{ __html: t("powersWebsite") }}
                    />
                    <hr />
                    <p>{t("powersWebsiteInfo")}</p>
                    <Link to="/diensten/website-laten-maken/" name="service">
                        {t("powersMoreInfo")}
                    </Link>
                </div>
                <div>
                    <h3
                        dangerouslySetInnerHTML={{ __html: t("powersWebapp") }}
                    />
                    <hr />
                    <p>{t("powersWebappInfo")}</p>
                    <Link
                        to="/diensten/webapplicatie-laten-maken/"
                        name="service"
                    >
                        {t("powersMoreInfo")}
                    </Link>
                </div>
                <div>
                    <h3
                        dangerouslySetInnerHTML={{ __html: t("powersWebshop") }}
                    />
                    <hr />
                    <p>{t("powersWebshopInfo")}</p>
                    <Link to="/diensten/webshop-laten-maken/" name="service">
                        {t("powersMoreInfo")}
                    </Link>
                </div>
                <div>
                    <h3
                        dangerouslySetInnerHTML={{ __html: t("powersEmail") }}
                    />
                    <hr />
                    <p>{t("powersEmailInfo")}</p>
                    <Link
                        to="/diensten/email-template-laten-maken/"
                        name="service"
                    >
                        {t("powersMoreInfo")}
                    </Link>
                </div>
                <div>
                    <h3
                        dangerouslySetInnerHTML={{
                            __html: t("powersMaintenance"),
                        }}
                    />
                    <hr />
                    <p>{t("powersMaintenanceInfo")}</p>
                    <Link
                        to="/diensten/onderhoud-updates-uitvoeren/"
                        name="service"
                    >
                        {t("powersMoreInfo")}
                    </Link>
                </div>
                <div>
                    <h3 dangerouslySetInnerHTML={{ __html: t("powersSeo") }} />
                    <hr />
                    <p>{t("powersSeoInfo")}</p>
                    <Link
                        to="/diensten/zoekmachine-optimalisatie/"
                        name="service"
                    >
                        {t("powersMoreInfo")}
                    </Link>
                </div>
            </section>
        </Layout>
    );
};

export default powersPage;

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
        ],
    };

    return (
        <SEO
            title="Diensten"
            description="Hier een overzicht van de verschillende diensten die wij aanbieden. Deze diensten zijn ontworpen om bedrijven te helpen met hun online aanwezigheid en efficiëntie."
            keywords=""
            pathname="/diensten/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
