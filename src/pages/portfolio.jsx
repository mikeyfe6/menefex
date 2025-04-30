import React from "react";

import { StaticImage } from "gatsby-plugin-image";

import useSiteMetadata from "../hooks/use-site-metadata";
import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as portfolioStyles from "../styles/modules/pages/portfolio.module.scss";

const PortfolioPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                {t("portfolioTitle")}
                <span>.</span>
            </h1>

            <h2 className="page-sub">{t("portfolioIntro")}</h2>

            <section>
                <div className={portfolioStyles.portfolio}>
                    {/*
          // * AFRODIASPHERE !
          */}

                    <div id="#PZ">
                        <a
                            href="https://prio-zorg.nl"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <StaticImage
                                src="../../public/project-images/priozorg.png"
                                alt="Prio Zorg"
                                className={portfolioStyles.portfolioImg}
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Prio Zorg
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolioPZbio"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>GatsbyJS</li>
                                    <li>ReactJS</li>
                                    <li>Netlify</li>
                                    <li>Contentful</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://prio-zorg.nl"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <i className="fa-solid fa-eye" />
                                {t("portfolioGoToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/prio-zorg"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <i className="fa-brands fa-github" />
                                {t("portfolioGoToRepo")}
                            </a>
                        </div>
                    </div>

                    <div id="#KIR">
                        <a
                            href="https://keeptreal.nl"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <StaticImage
                                src="../../public/project-images/keeptreal.png"
                                alt="Keep It Real"
                                className={portfolioStyles.portfolioImg}
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Keep It Real
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolioKIRbio"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>GatsbyJS</li>
                                    <li>ReactJS</li>
                                    <li>Netlify</li>
                                    <li>Contentful</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://keeptreal.nl"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <i className="fa-solid fa-eye" />
                                {t("portfolioGoToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/keepitreal"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <i className="fa-brands fa-github" />
                                {t("portfolioGoToRepo")}
                            </a>
                        </div>
                    </div>

                    <div id="#ADS">
                        <a
                            href="https://afrodiasphere.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <StaticImage
                                src="../../public/project-images/afrodiasphere.png"
                                alt="Afrodiasphere"
                                className={portfolioStyles.portfolioImg}
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Project:</span>Afrodiasphere
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolioADSbio"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>GatsbyJS</li>
                                    <li>ReactJS</li>
                                    <li>Strapi</li>
                                    <li>Netlify</li>
                                    <li>RESTful API</li>
                                    <li>Heroku</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://afrodiasphere.com"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <i className="fa-solid fa-eye" />
                                {t("portfolioGoToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/Afrodiasphere"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <i className="fa-brands fa-github" />
                                {t("portfolioGoToRepo")}
                            </a>
                        </div>
                    </div>

                    {/*
          // * ETERNITY PERCUSSION!
          */}

                    <div id="#EP">
                        <a
                            href="https://eternitydrum.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <StaticImage
                                src="../../public/project-images/eternitydrum.png"
                                alt="Eternity Percussion"
                                className={portfolioStyles.portfolioImg}
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Eternity Percussion
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolioEPbio"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>GatsbyJS</li>
                                    <li>ReactJS</li>
                                    <li>Netlify</li>
                                    <li>Contentful</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://eternitydrum.com"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <i className="fa-solid fa-eye" />
                                {t("portfolioGoToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/eternity-drum"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <i className="fa-brands fa-github" />
                                {t("portfolioGoToRepo")}
                            </a>
                        </div>
                    </div>

                    {/*
          // * KN-ACDiG!
          */}

                    <div id="#KNA">
                        <a
                            href="https://kn-acdig.com"
                            // href="#!"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <StaticImage
                                src="../../public/project-images/kn-acdig.png"
                                alt="KN-ACDiG"
                                className={portfolioStyles.portfolioImg}
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>KennisNetwerk ACDiG
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolioKNbio"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>Wordpress</li>
                                    <li>Custom CSS</li>
                                    <li>Elementor</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://kn-acdig.com"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <i className="fa-solid fa-eye" />
                                {t("portfolioGoToProject")}
                            </a>
                            <a className={portfolioStyles.btnDark}>
                                <i className="fa-brands fa-github" />
                                <strike>{t("portfolioNoRepo")}</strike>
                            </a>
                        </div>
                    </div>

                    {/*
          // * DS Melodies !
          */}

                    <div id="#DSM">
                        <a
                            href="https://dsmelodies.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <StaticImage
                                src="../../public/project-images/dsmelodies.png"
                                alt="DS Melodies"
                                className={portfolioStyles.portfolioImg}
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>DS Melodies
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolioDSbio"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>Wordpress</li>
                                    <li>Custom CSS</li>
                                    <li>Elementor</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://dsmelodies.com"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <i className="fa-solid fa-eye" />
                                {t("portfolioGoToProject")}
                                {/* Komt Binnenkort */}
                            </a>
                            <a className={portfolioStyles.btnDark}>
                                <i className="fa-brands fa-github" />
                                <strike>{t("portfolioNoRepo")}</strike>
                            </a>
                        </div>
                    </div>

                    {/*
          // * BLACK HARMONY !
          */}

                    <div id="#BH">
                        <a
                            href="https://blackharmony.nl"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <StaticImage
                                src="../../public/project-images/blackharmony.png"
                                alt="Eternity Percussion"
                                className={portfolioStyles.portfolioImg}
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Black Harmony
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolioBHbio"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>Wordpress</li>
                                    <li>Advanced Custom Field Types</li>
                                    <li>Custom CSS</li>
                                    <li>Elementor</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://blackharmony.nl"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <i className="fa-solid fa-eye" />
                                {t("portfolioGoToProject")}
                            </a>
                            <a className={portfolioStyles.btnDark}>
                                <i className="fa-brands fa-github" />
                                <strike>{t("portfolioNoRepo")}</strike>
                            </a>
                        </div>
                    </div>

                    {/*
          // * EXTRA PROJECTEN BIJVOEGEN HIERONDER!
          */}
                </div>
            </section>
        </Layout>
    );
};

export default PortfolioPage;

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
                name: "Portfolio",
                item: siteUrl + "/portfolio/",
            },
        ],
    };

    return (
        <SEO
            title="Portfolio"
            description="Ontdek de recente projecten van Menefex: van webdesign en webontwikkeling tot op maat gemaakte digitale oplossingen voor klanten. Bekijk ons portfolio en laat u inspireren door onze succesvolle samenwerkingen!"
            keywords="portfolio, projecten, webdesign, webontwikkeling, digitale oplossingen, inspiratie, samenwerkingen"
            pathname="/portfolio/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
