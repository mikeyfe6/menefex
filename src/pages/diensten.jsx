import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as servicesStyles from "../styles/modules/pages/services.module.scss";

// TODO: klaar voor TS'en..

const ServicesPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>
                    {t("services.title")}
                    <span>.</span>
                </h1>
                <h2>{t("services.intro")}</h2>
            </section>
            <section className={servicesStyles.servicesOverview}>
                <div className={servicesStyles.servicesContainer}>
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: t("services.websites.caption"),
                            }}
                        />
                        <hr />
                        <p>{t("services.websites.snippet")}</p>
                        <Link
                            to="/diensten/website-laten-maken/"
                            name="service"
                        >
                            {t("services.websites.cta")}
                        </Link>
                    </div>
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: t("services.webapps.caption"),
                            }}
                        />
                        <hr />
                        <p>{t("services.webapps.snippet")}</p>
                        <Link
                            to="/diensten/webapplicatie-laten-maken/"
                            name="service"
                        >
                            {t("services.webapps.cta")}
                        </Link>
                    </div>
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: t("services.webshops.caption"),
                            }}
                        />
                        <hr />
                        <p>{t("services.webshops.snippet")}</p>
                        <Link
                            to="/diensten/webshop-laten-maken/"
                            name="service"
                        >
                            {t("services.webshops.cta")}
                        </Link>
                    </div>
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: t("services.seo.caption"),
                            }}
                        />
                        <hr />
                        <p>{t("services.seo.snippet")}</p>
                        <Link
                            to="/diensten/zoekmachineoptimalisatie/"
                            name="service"
                        >
                            {t("services.seo.cta")}
                        </Link>
                    </div>
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: t("services.maintenance.caption"),
                            }}
                        />
                        <hr />
                        <p>{t("services.maintenance.snippet")}</p>
                        <Link
                            to="/diensten/onderhoud-updates-uitvoeren/"
                            name="service"
                        >
                            {t("services.maintenance.cta")}
                        </Link>
                    </div>
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: t("services.optimizations.caption"),
                            }}
                        />
                        <hr />
                        <p>{t("services.optimizations.snippet")}</p>
                        <Link
                            to="/diensten/optimalisaties-laten-uitvoeren/"
                            name="service"
                        >
                            {t("services.optimizations.cta")}
                        </Link>
                    </div>
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: t("services.email.caption"),
                            }}
                        />
                        <hr />
                        <p>{t("services.email.snippet")}</p>
                        <Link
                            to="/diensten/email-template-laten-maken/"
                            name="service"
                        >
                            {t("services.email.cta")}
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ServicesPage;

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
