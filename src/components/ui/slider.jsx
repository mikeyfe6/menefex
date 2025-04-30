import React from "react";

import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Parallax,
    Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/parallax";
import "swiper/css/autoplay";

import useTranslation from "../../hooks/use-translation";

import * as sliderStyles from "../../styles/modules/ui/slider.module.scss";

const Projects = () => {
    const data = useStaticQuery(graphql`
        query {
            slideShow: allFile(
                filter: {
                    sourceInstanceName: { eq: "project-images" }
                    name: { regex: "/^(?!.*-backup).*$/i" }
                }
                sort: { base: ASC }
            ) {
                edges {
                    node {
                        id
                        base
                        name
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    `);

    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    const eternityDrum = (
        <div className={sliderStyles.sliderInfo}>
            <div>
                <a
                    href="https://eternitydrum.com"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t("recentProjectsViewSiteButton")}
                </a>
                <Link to="/portfolio/">
                    <h5>Eternity Percussion</h5>
                </Link>
            </div>

            <p>{t("recentProjectsEPbio")}</p>
            <ul>
                <li>GatsbyJS</li>
                <li>ReactJS</li>
                <li>Netlify</li>
                <li>Contentful</li>
            </ul>
        </div>
    );

    const blackHarmony = (
        <div className={sliderStyles.sliderInfo}>
            <div>
                <a
                    href="https://blackharmony.nl"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t("recentProjectsViewSiteButton")}
                </a>
                <Link to="/portfolio/">
                    <h5>Black Harmony</h5>
                </Link>
            </div>

            <p>{t("recentProjectsBHbio")}</p>
            <ul>
                <li>Wordpress</li>
                <li>Advanced Custom Field Types</li>
                <li>Custom CSS</li>
                <li>Elementor</li>
            </ul>
        </div>
    );

    const afroDiaSphere = (
        <div className={sliderStyles.sliderInfo}>
            <div>
                <a
                    href="https://afrodiasphere.com"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t("recentProjectsViewAppButton")}
                </a>
                <Link to="/portfolio/">
                    <h5>Afrodiasphere</h5>
                </Link>
            </div>

            <p>{t("recentProjectsADSbio")}</p>
            <ul>
                <li>GatsbyJS</li>
                <li>Strapi</li>
                <li>Netlify</li>
                <li>GraphQl</li>
                <li>RESTful API</li>
            </ul>
        </div>
    );

    const dsMelodies = (
        <div className={sliderStyles.sliderInfo}>
            <div>
                <a
                    href="https://dsmelodies.com"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t("recentProjectsViewSiteButton")}
                </a>
                <Link to="/portfolio/">
                    <h5>DS Melodies</h5>
                </Link>
            </div>

            <p>{t("recentProjectsDSbio")}</p>
            <ul>
                <li>Wordpress</li>
                <li>Custom CSS</li>
                <li>Elementor</li>
            </ul>
        </div>
    );

    const knAcdig = (
        <div className={sliderStyles.sliderInfo}>
            <div>
                <a
                    href="https://kn-acdig.com"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t("recentProjectsViewSiteButton")}
                </a>
                <Link to="/portfolio/">
                    <h5>KN-ACDiG</h5>
                </Link>
            </div>

            <p>{t("recentProjectsKNbio")}</p>
            <ul>
                <li>Wordpress</li>
                <li>Custom CSS</li>
                <li>Elementor</li>
            </ul>
        </div>
    );

    const keepItReal = (
        <div className={sliderStyles.sliderInfo}>
            <div>
                <a
                    href="https://keeptreal.nl"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t("recentProjectsViewSiteButton")}
                </a>
                <Link to="/portfolio/">
                    <h5>Keep It Real</h5>
                </Link>
            </div>

            <p>{t("recentProjectsKIRbio")}</p>
            <ul>
                <li>GatsbyJS</li>
                <li>ReactJS</li>
                <li>Netlify</li>
                <li>Contentful</li>
            </ul>
        </div>
    );

    const prioZorg = (
        <div className={sliderStyles.sliderInfo}>
            <div>
                <a
                    href="https://prio-zorg.nl"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t("recentProjectsViewSiteButton")}
                </a>
                <Link to="/portfolio/">
                    <h5>Prio Zorg</h5>
                </Link>
            </div>

            <p>{t("recentProjectsPZbio")}</p>
            <ul>
                <li>GatsbyJS</li>
                <li>ReactJS</li>
                <li>Netlify</li>
                <li>Contentful</li>
            </ul>
        </div>
    );

    // TODO: swiper met thumbnails fixen

    return (
        <section id="portfolio" data-scroll-center>
            <Swiper
                modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    Parallax,
                    Autoplay,
                ]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides
                loop
                parallax
                navigation
                pagination={{
                    clickable: true,
                }}
                scrollbar={{
                    draggable: true,
                }}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                className={sliderStyles.sliderWrapper}
            >
                {data.slideShow.edges.map(({ node }) => {
                    const projectImg = getImage(
                        node.childImageSharp.gatsbyImageData
                    );

                    return (
                        <SwiperSlide key={node.id}>
                            <GatsbyImage
                                image={projectImg}
                                alt={node.name}
                                className={sliderStyles.sliderContainer}
                            />
                            {(() => {
                                switch (node.name) {
                                    case "eternitydrum":
                                        return eternityDrum;
                                    case "blackharmony":
                                        return blackHarmony;
                                    case "afrodiasphere":
                                        return afroDiaSphere;
                                    case "dsmelodies":
                                        return dsMelodies;
                                    case "kn-acdig":
                                        return knAcdig;
                                    case "keeptreal":
                                        return keepItReal;
                                    case "priozorg":
                                        return prioZorg;
                                    default:
                                        return null;
                                }
                            })()}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
};

export default Projects;
