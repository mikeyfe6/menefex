import * as React from "react";

import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useSiteMetadata from "../hooks/use-site-metadata";
import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as portfolioStyles from "../styles/modules/pages/portfolio.module.scss";

// TODO: klaar voor TS'en..

const PortfolioPage = () => {
    const { t, isHydrated } = useTranslation();

    const data = useStaticQuery(graphql`
        query {
            allFile(filter: { sourceInstanceName: { eq: "project-images" } }) {
                nodes {
                    name
                    childImageSharp {
                        gatsbyImageData(width: 600)
                    }
                }
            }
        }
    `);

    const getProjectImage = (name) => {
        const node = data.allFile.nodes.find((n) => n.name === name);
        return node ? getImage(node.childImageSharp.gatsbyImageData) : null;
    };

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>{t("portfolio.title")}</h1>
                <h2>{t("portfolio.intro")}</h2>
            </section>

            <section id="portfolio">
                <div className={portfolioStyles.portfolioContainer}>
                    {/*
          // * EDUTAIN U PRODOCTIONS !
          */}
                    <div id="#EUP">
                        <a
                            href="https://edutainuproductions.nl"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={portfolioStyles.portfolioImg}
                        >
                            {getProjectImage("edutainuproductions") && (
                                <GatsbyImage
                                    image={getProjectImage(
                                        "edutainuproductions"
                                    )}
                                    alt="Edutain U Productions"
                                />
                            )}
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Edutain U Productions
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.edutainuproductions"),
                                }}
                            />
                            <div className={portfolioStyles.tools}>
                                <span>Tools:</span>
                                <ul>
                                    <li>GatsbyJS</li>
                                    <li>ReactJS</li>
                                    <li>Netlify</li>
                                </ul>
                            </div>
                        </div>
                        <div className={portfolioStyles.portfolioBtns}>
                            <a
                                href="https://edutainuproductions.nl"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                {t("portfolio.goToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/edutainuproductions"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                {t("portfolio.goToRepo")}
                            </a>
                        </div>
                    </div>

                    {/*
          // * PRIO ZORG !
          */}

                    <div id="#PZ">
                        <a
                            href="#!"
                            // href="https://prio-zorg.nl"
                            // rel="noopener noreferrer"
                            // target="_blank"
                            className={portfolioStyles.portfolioImg}
                        >
                            {/* {getProjectImage("priozorg") && (
                                <GatsbyImage
                                    image={getProjectImage("priozorg")}
                                    alt="Prio Zorg"
                                />
                            )} */}

                            <StaticImage
                                src="../images/mnfx-screens.jpeg"
                                width={600}
                                alt="Prio Zorg (404)"
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Prio Zorg
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.priozorg"),
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
                                // href="https://prio-zorg.nl"
                                // rel="noopener noreferrer"
                                // target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                <strike>{t("portfolio.goToProject")}</strike>
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/prio-zorg"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                {t("portfolio.goToRepo")}
                            </a>
                            {/* <a className={portfolioStyles.btnDark} disabled>
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                <strike>{t("portfolio.noRepo")}</strike>
                            </a> */}
                        </div>
                    </div>

                    {/*
          // * KEEP IT REAL !
          */}

                    <div id="#KIR">
                        <a
                            href="https://keeptreal.nl"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={portfolioStyles.portfolioImg}
                        >
                            {getProjectImage("keeptreal") && (
                                <GatsbyImage
                                    image={getProjectImage("keeptreal")}
                                    alt="Keep It Real"
                                />
                            )}
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Keep It Real
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.keeptreal"),
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
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                {t("portfolio.goToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/keepitreal"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                {t("portfolio.goToRepo")}
                            </a>
                        </div>
                    </div>

                    {/*
          // * AFRODIASPHERE!
          */}

                    <div id="#ADS">
                        <a
                            href="https://afrodiasphere.com"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={portfolioStyles.portfolioImg}
                        >
                            {getProjectImage("afrodiasphere") && (
                                <GatsbyImage
                                    image={getProjectImage("afrodiasphere")}
                                    alt="Afrodiasphere"
                                />
                            )}
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Project:</span>Afrodiasphere
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.afrodiasphere"),
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
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                {t("portfolio.goToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/Afrodiasphere"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                {t("portfolio.goToRepo")}
                            </a>
                        </div>
                    </div>

                    {/*
          // * ETERNITY PERCUSSION !
          */}

                    <div id="#EP">
                        <a
                            href="https://eternitydrum.com"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={portfolioStyles.portfolioImg}
                        >
                            {getProjectImage("eternitydrum") && (
                                <GatsbyImage
                                    image={getProjectImage("eternitydrum")}
                                    alt="Eternity Percussion"
                                />
                            )}
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Eternity Percussion
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.eternitydrum"),
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
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                {t("portfolio.goToProject")}
                            </a>
                            <a
                                href="https://github.com/mikeyfe6/eternity-drum"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={portfolioStyles.btnDark}
                            >
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                {t("portfolio.goToRepo")}
                            </a>
                        </div>
                    </div>

                    {/*
          // * KN-ACDiG!
          */}

                    <div id="#KNA">
                        <a
                            href="#!"
                            // href="https://kn-acdig.com"
                            // rel="noopener noreferrer"
                            // target="_blank"
                            className={portfolioStyles.portfolioImg}
                        >
                            {/* <StaticImage
                                src="../../public/project-images/kn-acdig.png"
                                alt="KN-ACDiG"
                                className={portfolioStyles.portfolioImg}
                            /> */}

                            <StaticImage
                                src="../images/mnfx-screens.jpeg"
                                width={600}
                                alt="KN-ACDiG (404)"
                            />
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>KennisNetwerk ACDiG
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.knacdig"),
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
                                // href="https://kn-acdig.com"
                                // rel="noopener noreferrer"
                                // target="_blank"
                                className={portfolioStyles.btnLight}
                            >
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                <strike>{t("portfolio.goToProject")}</strike>
                            </a>
                            <a className={portfolioStyles.btnDark} disabled>
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                <strike>{t("portfolio.noRepo")}</strike>
                            </a>
                        </div>
                    </div>

                    {/*
          // * DS MELODIES !
          */}

                    <div id="#DSM">
                        <a
                            href="https://dsmelodies.com"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={portfolioStyles.portfolioImg}
                        >
                            {getProjectImage("dsmelodies") && (
                                <GatsbyImage
                                    image={getProjectImage("dsmelodies")}
                                    alt="DS Melodies"
                                />
                            )}
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>DS Melodies
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.dsmelodies"),
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
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                {t("portfolio.goToProject")}
                                {/* Komt Binnenkort */}
                            </a>
                            <a className={portfolioStyles.btnDark} disabled>
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                <strike>{t("portfolio.noRepo")}</strike>
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
                            className={portfolioStyles.portfolioImg}
                        >
                            {getProjectImage("blackharmony") && (
                                <GatsbyImage
                                    image={getProjectImage("blackharmony")}
                                    alt="Black Harmony"
                                />
                            )}
                        </a>
                        <div className={portfolioStyles.portfolioInfo}>
                            <h3>
                                <span>Client:</span>Black Harmony
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("portfolio.blackharmony"),
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
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                {t("portfolio.goToProject")}
                            </a>
                            <a className={portfolioStyles.btnDark} disabled>
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                <strike>{t("portfolio.noRepo")}</strike>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PortfolioPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Portfolio";
    const pageSlug = "/portfolio/";

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
            description="Ontdek de recente projecten van Menefex: van webdesign en webontwikkeling tot op maat gemaakte digitale oplossingen voor klanten. Bekijk ons portfolio en laat je inspireren door onze succesvolle samenwerkingen!"
            keywords="portfolio, projecten, webdesign, webontwikkeling, digitale oplossingen, inspiratie, samenwerkingen"
            pathname={pageSlug}
            schemaMarkup={breadcrumbSchema}
        />
    );
};
