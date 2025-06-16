import * as React from "react";

import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as blogStyles from "../styles/modules/pages/blog.module.scss";

// TODO: klaar voor TS'en..

const BlogPage = () => {
    const { i18n, isHydrated } = useTranslation();
    const currentLanguage = i18n.language;

    const data = useStaticQuery(graphql`
        query BlogQuery {
            nlContent: allContentfulBlogPost(
                sort: { createdAt: DESC }
                filter: { node_locale: { eq: "nl" } }
            ) {
                edges {
                    node {
                        id
                        title
                        slug
                        subtitle
                        author
                        image {
                            title
                            gatsbyImageData
                        }
                        createdAt(
                            formatString: "dddd D MMMM YYYY"
                            locale: "nl"
                        )
                    }
                }
            }

            enContent: allContentfulBlogPost(
                sort: { createdAt: DESC }
                filter: { node_locale: { eq: "en" } }
            ) {
                edges {
                    node {
                        id
                        title
                        slug
                        subtitle
                        author
                        image {
                            title
                            gatsbyImageData
                        }
                        createdAt(
                            formatString: "dddd D MMMM YYYY"
                            locale: "en"
                        )
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
                <h1>
                    Blog
                    <span>.</span>
                </h1>
                <h2>What goes through our mind..</h2>
            </section>

            <section id="blog">
                <div className={blogStyles.blogContainer}>
                    <ul>
                        {currentContent.map((edge) => {
                            const image = getImage(
                                edge.node.image.gatsbyImageData
                            );
                            return (
                                <li key={edge.node.id}>
                                    <Link to={`/blog/${edge.node.slug}/`}>
                                        <div>
                                            <h3>{edge.node.title}</h3>
                                            <p>{edge.node.subtitle}</p>
                                            <small>
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fas",
                                                            "calendar-days",
                                                        ]}
                                                    />
                                                    <strong>
                                                        {edge.node.createdAt}
                                                    </strong>{" "}
                                                </span>
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fas",
                                                            "feather-pointed",
                                                        ]}
                                                    />
                                                    <strong>
                                                        {edge.node.author}
                                                    </strong>
                                                </span>
                                            </small>
                                        </div>

                                        <div>
                                            <GatsbyImage
                                                image={image}
                                                alt={edge.node.image.title}
                                            />
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <Link to="/topics/">
                        &apos;Topics&apos;{" "}
                        <FontAwesomeIcon icon={["fas", "angles-right"]} />
                    </Link>
                </div>
            </section>
        </Layout>
    );
};

export default BlogPage;

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
                name: "Blog",
                item: siteUrl + "/blog/",
            },
        ],
    };

    return (
        <SEO
            title="Blog"
            description="Lees de nieuwste inzichten van Menefex over webontwikkeling, digitalisering, SEO, technologie, en meer. Ontdek tips, trends en verhalen die jouw digitale strategie versterken!"
            keywords="blog, webontwikkeling, digitalisering, SEO, technologie, tips, trends, verhalen, digitale strategie"
            pathname="/blog/"
            schemaMarkup={breadcrumbSchema}
        />
    );
};
