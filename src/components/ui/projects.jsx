import React, { useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

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

import * as projectsStyles from "../../styles/modules/ui/projects.module.scss";

// TODO: klaar voor TS'en..

const Projects = () => {
    const { t, isHydrated } = useTranslation();

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);

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

            logos: allFile(
                filter: {
                    sourceInstanceName: { eq: "images" }
                    relativeDirectory: { eq: "projects" }
                }
            ) {
                nodes {
                    name
                    childImageSharp {
                        gatsbyImageData(height: 70)
                    }
                }
            }
        }
    `);

    const projectData = [
        {
            logo: "ep-logo",
            name: "eternitydrum",
            title: "Eternity Percussion",
            description: t("projects.eternitydrum"),
            url: "https://eternitydrum.com",
            type: "site",
            stack: ["GatsbyJS", "ReactJS", "Netlify", "Contentful"],
        },
        {
            logo: "bh-logo",
            name: "blackharmony",
            title: "Black Harmony",
            description: t("projects.blackharmony"),
            url: "https://blackharmony.nl",
            type: "site",
            stack: [
                "Wordpress",
                "Advanced Custom Field Types",
                "Custom CSS",
                "Elementor",
            ],
        },
        {
            logo: "ads-logo",
            name: "afrodiasphere",
            title: "Afrodiasphere",
            description: t("projects.afrodiasphere"),
            url: "https://afrodiasphere.com",
            type: "app",
            stack: ["GatsbyJS", "Strapi", "Netlify", "GraphQl", "RESTful API"],
        },
        {
            logo: "dsm-logo",
            name: "dsmelodies",
            title: "DS Melodies",
            description: t("projects.dsmelodies"),
            url: "https://dsmelodies.com",
            type: "site",
            stack: ["Wordpress", "Custom CSS", "Elementor"],
        },
        {
            logo: "knacdig-logo",
            name: "kn-acdig",
            title: "KN-ACDiG",
            description: t("projects.knacdig"),
            // url: "https://kn-acdig.com",
            type: "site",
            stack: ["Wordpress", "Custom CSS", "Elementor"],
        },
        {
            logo: "kir-logo",
            name: "keeptreal",
            title: "Keep It Real",
            description: t("projects.keeptreal"),
            url: "https://keeptreal.nl",
            type: "site",
            stack: ["GatsbyJS", "ReactJS", "Netlify", "Contentful"],
        },
        {
            logo: "pz-logo",
            name: "priozorg",
            title: "Prio Zorg",
            description: t("projects.priozorg"),
            url: "https://prio-zorg.nl",
            type: "site",
            stack: ["GatsbyJS", "ReactJS", "Netlify", "Contentful"],
        },
        {
            logo: "eup-logo",
            name: "edutainuproductions",
            title: "Edutain U Productions",
            description: t("projects.edutainuproductions"),
            url: "https://edutainuproductions.nl",
            type: "site",
            stack: ["GatsbyJS", "ReactJS", "Netlify"],
        },
    ];

    const [activeIndex, setActiveIndex] = React.useState(0);

    const currentProject = projectData[activeIndex] || projectData[0];

    const getLogoImage = (name, logo) => {
        const logoNode = data.logos.nodes.find(
            (node) =>
                node.name === logo ||
                node.name === name ||
                node.name === `${name}-logo`
        );
        return logoNode
            ? getImage(logoNode.childImageSharp.gatsbyImageData)
            : null;
    };

    const logoImg = getLogoImage(currentProject.name, currentProject.logo);

    const slideShowImages = React.useMemo(() => {
        const map = {};
        data.slideShow.edges.forEach(({ node }) => {
            map[node.name] = node;
        });
        return map;
    }, [data.slideShow.edges]);

    if (!isHydrated) return null;

    return (
        <section id="portfolio" className={projectsStyles.projects}>
            <div className={projectsStyles.projectsContainer}>
                <h3 className={projectsStyles.homeTitle}>
                    {t("projects.title")}
                </h3>
                <div className={projectsStyles.projectsWrapper}>
                    <div className={projectsStyles.projectsContent}>
                        {logoImg && (
                            <div className={projectsStyles.projectsLogo}>
                                <GatsbyImage
                                    image={logoImg}
                                    alt={currentProject.title + " logo"}
                                />
                            </div>
                        )}

                        <h4>{currentProject.title}</h4>

                        <p>{currentProject.description}</p>

                        <span>Tools:</span>
                        <ul>
                            {currentProject.stack.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>

                        {currentProject.url && (
                            <a
                                href={currentProject.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {currentProject.type === "app"
                                    ? t("projects.viewWebapp")
                                    : t("projects.viewWebsite")}
                            </a>
                        )}
                    </div>
                    <div className={projectsStyles.projectsSlider}>
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
                            slidesPerView={1.1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1.2,
                                },
                            }}
                            autoplay={{
                                delay: 10000,
                            }}
                            onSlideChange={(swiper) =>
                                setActiveIndex(swiper.realIndex)
                            }
                            onInit={(swiper) => {
                                setActiveIndex(swiper.realIndex);
                                swiper.params.navigation.prevEl =
                                    prevRef.current;
                                swiper.params.navigation.nextEl =
                                    nextRef.current;
                                swiper.params.pagination.el =
                                    paginationRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                                swiper.pagination.init();
                                swiper.pagination.update();
                            }}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            pagination={{
                                el: paginationRef.current,
                                clickable: true,
                            }}
                            loop
                            parallax
                        >
                            {projectData.map((project, idx) => {
                                const imageNode = slideShowImages[project.name];
                                const projectImg = imageNode
                                    ? getImage(
                                          imageNode.childImageSharp
                                              .gatsbyImageData
                                      )
                                    : null;
                                return (
                                    <SwiperSlide key={project.name}>
                                        {projectImg ? (
                                            <a
                                                href={project.url}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <GatsbyImage
                                                    image={projectImg}
                                                    alt={project.title}
                                                />
                                            </a>
                                        ) : (
                                            <div
                                                className={
                                                    projectsStyles.projectsNoImage
                                                }
                                            >
                                                <StaticImage
                                                    src="../../images/mnfx-screens.jpeg"
                                                    alt={project.title}
                                                />
                                            </div>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <div className={projectsStyles.projectsNavigation}>
                            <button ref={prevRef}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <div ref={paginationRef}></div>
                            <button ref={nextRef}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
