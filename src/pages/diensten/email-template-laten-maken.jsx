import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

const EmailTemplatePage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                {t("powersEmailTitle")}
                <span>.</span>
            </h1>
            <h2 className="page-sub">{t("powersEmailInfo")}</h2>

            <div className={servicesStyles.buttons}>
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

export default EmailTemplatePage;

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
                name: "E-mailtemplate laten maken",
                item: siteUrl + "/diensten/email-template-laten-maken/",
            },
        ],
    };

    return (
        <SEO
            title="E-mailtemplate laten maken"
            description="Op maat gemaakte e-mail templates die passen bij jouw branding en zorgen
        voor een consistente en professionele uitstraling in al je
        e-mailcommunicatie."
            keywords=""
            pathname="/diensten/email-template-laten-maken/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
