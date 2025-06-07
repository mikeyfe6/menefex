import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..

const EmailTemplatePage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1 className="page-title">
                    {t("services.email.title")}
                    <span>.</span>
                </h1>

                <h2>{t("services.email.intro")}</h2>
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
