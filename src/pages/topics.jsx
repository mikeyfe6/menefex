import * as React from "react";

import { Link, graphql, useStaticQuery } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as topicStyles from "../styles/modules/pages/topics.module.scss";

// TODO: klaar voor TS'en..

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
            <section className="page-intro">
                <h1>Topics</h1>
                <h2>{t("topics.intro")}</h2>
            </section>

            <section id="topics">
                <div className={topicStyles.topicsContainer}>
                    <ul>
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
                                        <h3>
                                            <span style={{ color: bdcolor }}>
                                                #
                                            </span>{" "}
                                            {name}
                                        </h3>
                                        <p>{description.description}</p>
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>

                    <Link to="/blog/">
                        &apos;Blog&apos;{" "}
                        <FontAwesomeIcon icon={["fas", "angles-right"]} />
                    </Link>
                </div>
            </section>
        </Layout>
    );
};

export default TopicPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Topics";
    const pageSlug = "/topics/";

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
            description="Ontdek onze diverse blogcategorieën van doe-het-zelf tips tot SEO-gidsen, informatieve artikelen, nieuws, en meer. Vind hier het volledige overzicht van onderwerpen!"
            keywords="onderwerpen, posts, topics, views, nieuws, stories, content, news, mind, actualiteiten, artikelen, blog, blogposts, categorieën, categorie, categorieën, categorie, doe-het-zelf, DIY, SEO, gidsen, informatief"
            pathname={pageSlug}
            schemaMarkup={breadcrumbSchema}
        />
    );
};
