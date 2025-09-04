import * as React from "react";

import { Link } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                <h1>{t("services.title")}</h1>
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
                        <FontAwesomeIcon icon={["fas", "globe"]} />
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
                        <FontAwesomeIcon icon={["fas", "mobile"]} />
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
                        <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
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
                        <FontAwesomeIcon icon={["fab", "searchengin"]} />
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
                        <FontAwesomeIcon icon={["fas", "wrench"]} />
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
                        <FontAwesomeIcon icon={["fas", "rocket"]} />
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
                        <FontAwesomeIcon
                            icon={["fas", "envelope-circle-check"]}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ServicesPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Diensten";
    const pageSlug = "/diensten/";

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        name: pageTitle,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: pageTitle,
                item: siteUrl + pageSlug,
            },
        ],
    };

    return (
        <SEO
            title={pageTitle}
            description="Hier een overzicht van de verschillende diensten die wij aanbieden. Deze diensten zijn ontworpen om bedrijven te helpen met hun online aanwezigheid en efficiëntie."
            keywords="diensten, website laten maken, webapplicatie laten maken, webshop laten maken, zoekmachineoptimalisatie, onderhoud en updates, optimalisaties, email template laten maken"
            pathname={pageSlug}
            schemaMarkup={breadcrumbSchema}
        />
    );
};
