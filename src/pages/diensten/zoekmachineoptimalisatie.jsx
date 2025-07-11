import * as React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";
import useSiteMetadata from "../../hooks/use-site-metadata";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import * as servicesStyles from "../../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..

const SeoPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1 className="page-title">
                    {t("services.seo.title")}
                    <span>.</span>
                </h1>

                <h2>{t("services.seo.intro")}</h2>
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

export default SeoPage;

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
                name: "Zoekmachineoptimalisatie (SEO)",
                item: siteUrl + "/diensten/zoekmachineoptimalisatie/",
            },
        ],
    };

    return (
        <SEO
            title="Zoekmachineoptimalisatie (SEO)"
            description="Verbeter de vindbaarheid van je website in zoekmachines met gerichte
        SEO-strategieën. Wij optimaliseren je website om hogere posities te
        behalen in zoekresultaten, zodat je meer verkeer en klanten aantrekt."
            keywords=""
            pathname="/diensten/zoekmachineoptimalisatie/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
