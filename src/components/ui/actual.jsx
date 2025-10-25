import * as React from "react";

import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import useTranslation from "../../hooks/use-translation";

import * as actualStyles from "../../styles/modules/ui/actual.module.scss";

// TODO: klaar voor TS'en..

const Actual = () => {
    const { t, i18n, isHydrated } = useTranslation();
    const currentLanguage = i18n.language;

    const data = useStaticQuery(graphql`
        query ActualQuery {
            nlContent: allContentfulBlogPost(
                limit: 3
                sort: { publishedDate: DESC }
                filter: { node_locale: { eq: "nl" } }
            ) {
                edges {
                    node {
                        subtitle
                        title
                        slug
                        topics {
                            name
                            bdcolor
                            slug
                        }
                        node_locale
                        publishedDate
                        image {
                            title
                            gatsbyImageData(width: 550)
                        }
                    }
                }
            }

            enContent: allContentfulBlogPost(
                limit: 3
                sort: { publishedDate: DESC }
                filter: { node_locale: { eq: "en" } }
            ) {
                edges {
                    node {
                        subtitle
                        title
                        slug
                        topics {
                            name
                            bdcolor
                            slug
                        }
                        node_locale
                        publishedDate
                        image {
                            title
                            gatsbyImageData(width: 550)
                        }
                    }
                }
            }
        }
    `);

    const posts =
        currentLanguage === "nl" ? data.nlContent.edges : data.enContent.edges;

    if (!posts.length) {
        return <p>Geen content beschikbaar / No content available.</p>;
    }

    if (!isHydrated) return null;

    return (
        <section className={actualStyles.actual} id="actual">
            <span>
                <h3>{t("actual.title")}</h3>
                <Link to="/blog/">{t("actual.seeAll")}</Link>
            </span>
            <div className={actualStyles.actualContainer}>
                {posts.map(({ node }) => (
                    <div className={actualStyles.actualWrapper} key={node.slug}>
                        {node.image && (
                            <div className={actualStyles.actualImage}>
                                <Link to={`/blog/${node.slug}/`}>
                                    <GatsbyImage
                                        image={getImage(node.image)}
                                        alt={node.image.title}
                                    />
                                </Link>
                            </div>
                        )}
                        <div className={actualStyles.actualContent}>
                            <h4>{node.title}</h4>

                            <div>
                                <time dateTime={node.publishedDate}>
                                    {new Date(
                                        node.publishedDate
                                    ).toLocaleDateString(
                                        currentLanguage === "nl"
                                            ? "nl-NL"
                                            : "en-GB",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </time>
                                <span> · </span>
                                <Link
                                    to={`/blog/${node.slug}/`}
                                    aria-label={`Lees meer: ${node.title}`}
                                >
                                    <b>{t("actual.readMore")}</b>
                                </Link>
                            </div>
                        </div>
                        <ul>
                            {node.topics &&
                                node.topics
                                    .slice()
                                    .sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                    )
                                    .map((topic) => (
                                        <li key={topic.slug}>
                                            <Link
                                                to={`/topics/${topic.slug}/`}
                                                style={{
                                                    borderColor: topic.bdcolor,
                                                }}
                                            >
                                                {topic.name}
                                            </Link>
                                        </li>
                                    ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Actual;
