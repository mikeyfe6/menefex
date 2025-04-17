import React from "react";

import { Link, graphql, useStaticQuery } from "gatsby";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as topicStyles from "../styles/modules/topics.module.scss";

// TODO: images naar GatsbyImage verwerken

// CONTENTFUL blogposts genereren
const TopicPage = () => {
    const { t, i18n, isHydrated } = useTranslation();
    const currentLanguage = i18n.language;

    const data = useStaticQuery(graphql`
        query TopicQuery {
            nlContent: allContentfulTopic(
                sort: { name: ASC }
                filter: { node_locale: { eq: "nl" } }
            ) {
                edges {
                    node {
                        contentful_id
                        name
                        slug
                        bdcolor
                        description {
                            description
                        }
                    }
                }
            }
            enContent: allContentfulTopic(
                sort: { name: ASC }
                filter: { node_locale: { eq: "en" } }
            ) {
                edges {
                    node {
                        contentful_id
                        name
                        slug
                        bdcolor
                        description {
                            description
                        }
                    }
                }
            }
        }
    `);

    const currentContent =
        currentLanguage === "nl" ? data.nlContent.edges : data.enContent.edges;

    if (!currentContent) {
        return <p>Geen content beschikbaar / No content available.</p>;
    }

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                Topics<span>.</span>
            </h1>

            <h2 className="page-sub">{t("topicsIntro")}</h2>

            <section>
                <ul className={topicStyles.topics}>
                    {currentContent.map(
                        ({
                            node: {
                                contentful_id,
                                slug,
                                bdcolor,
                                name,
                                description,
                            },
                        }) => (
                            <li key={contentful_id}>
                                <Link
                                    to={`/topics/${slug}/`}
                                    style={{ borderColor: bdcolor }}
                                >
                                    <h4>
                                        <span style={{ color: bdcolor }}>
                                            #
                                        </span>{" "}
                                        {name}
                                    </h4>
                                    <p>{description.description}</p>
                                </Link>
                            </li>
                        )
                    )}
                </ul>

                <Link to="/blog/" className={topicStyles.backBtn}>
                    &apos;Blog&apos; <i className="fa-solid fa-angles-right" />
                </Link>
            </section>
        </Layout>
    );
};

export default TopicPage;

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
                name: "Topics",
                item: siteUrl + "/topics/",
            },
        ],
    };

    return (
        <SEO
            title="Topics"
            description="Ontdek onze diverse blogcategorieën van doe-het-zelf tips tot SEO-gidsen, informatieve artikelen, nieuws, en meer. Vind hier het volledige overzicht van onderwerpen!"
            keywords="onderwerpen, posts, topics, views, nieuws, stories, content, news, mind, actualiteiten, artikelen, blog, blogposts, categorieën, categorie, categorieën, categorie, doe-het-zelf, DIY, SEO, gidsen, informatief"
            pathname="/topics/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
