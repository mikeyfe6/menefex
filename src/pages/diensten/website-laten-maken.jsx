import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as powersStyles from "../../styles/modules/pages/powers.module.scss";

const WebsitePage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1
                dangerouslySetInnerHTML={{ __html: t("powersWebsiteTitle") }}
                className="page-title"
            />

            <h2 className="page-sub">{t("powersWebsiteIntro")}</h2>

            <br />

            <div
                dangerouslySetInnerHTML={{ __html: t("powersWebsiteDetail") }}
                className="page-content"
            />

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

export default WebsitePage;

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
                name: "Website laten maken",
                item: siteUrl + "/diensten/website-laten-maken/",
            },
        ],
    };

    return (
        <SEO
            title="Website laten maken"
            description="Op maat gemaakte websites die perfect aansluiten bij jouw branding en
        doelstellingen. Wij ontwerpen professionele, gebruiksvriendelijke
        websites die zorgen voor een sterke online aanwezigheid en optimale
        gebruikerservaring."
            keywords=""
            pathname="/diensten/website-laten-maken/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
