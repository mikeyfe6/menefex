import * as React from "react";

import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import useTranslation from "../../hooks/use-translation";

import * as actualStyles from "../../styles/modules/ui/actual.module.scss";

const Actual = () => {
    const { t, i18n, isHydrated } = useTranslation();
    const currentLanguage = i18n.language;

    const data = useStaticQuery(graphql`
        query ActualQuery {
            nlContent: allContentfulBlogPost(
                limit: 1
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
                limit: 1
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

    const currentContent =
        currentLanguage === "nl"
            ? data.nlContent.edges[0]?.node
            : data.enContent.edges[0]?.node;

    if (!currentContent) {
        return <p>Geen content beschikbaar / No content available.</p>;
    }

    const frontImage = getImage(currentContent.image);

    if (!isHydrated) return null;

    return (
        <section className={actualStyles.actualContainer} id="actual">
            <div className={actualStyles.actualWrapper}>
                <div>
                    <Link to={`/blog/${currentContent.slug}/`}>
                        <GatsbyImage
                            image={frontImage}
                            alt={currentContent.image.title}
                            style={{ borderRadius: "5px" }}
                        />
                    </Link>
                </div>
                <div className={actualStyles.actualText}>
                    <h4>{currentContent.title}</h4>
                    <p>
                        {currentContent.subtitle}{" "}
                        <Link to={`/blog/${currentContent.slug}/`}>
                            <b>{t("actualReadMore")}</b>
                        </Link>
                    </p>
                    <ul>
                        {currentContent.topics.map((topic) => (
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
            </div>
        </section>
    );
};

export default Actual;
