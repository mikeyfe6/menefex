import * as React from "react";

import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { format, parseISO } from "date-fns";
import { nl, enUS } from "date-fns/locale";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as topicStyles from "../styles/modules/templates/topic.module.scss";

// TODO: klaar voor TS'en..

const DefaultInfo = ({ text }) => (
    <li>
        <p>
            <b>{text}</b>
        </p>
    </li>
);

const Topic = ({ pageContext: { nlContent, enContent } }) => {
    const { t, i18n, isHydrated } = useTranslation();

    const currentLanguage = i18n.language;
    const content = currentLanguage === "nl" ? nlContent : enContent;

    const locale = currentLanguage === "nl" ? nl : enUS;

    const formatDate = (date) => {
        return format(parseISO(date), "eeee d MMMM yyyy", { locale });
    };

    if (!content) {
        return <DefaultInfo text={t("topics.noContent")} />;
    }

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>
                    Topics
                    <span>.</span>
                </h1>

                <h2>
                    <span
                        style={{ color: content.bdcolor, fontWeight: "bold" }}
                    >
                        #
                    </span>{" "}
                    {content.name}
                </h2>
            </section>

            <section id="topic">
                <div className={topicStyles.topicContainer}>
                    <ul>
                        {!content.topicPosts ||
                        content.topicPosts.length === 0 ? (
                            <DefaultInfo text={t("topics.noPosts")} />
                        ) : (
                            content.topicPosts.map(
                                ({
                                    slug,
                                    contentful_id,
                                    title,
                                    subtitle,
                                    createdAt,
                                    author,
                                    image,
                                }) => {
                                    const topcImage = getImage(
                                        image.gatsbyImageData
                                    );

                                    return (
                                        <li key={contentful_id}>
                                            <Link to={`/blog/${slug}/`}>
                                                <div>
                                                    <h3>{title}</h3>
                                                    <p>{subtitle}</p>
                                                    <small>
                                                        <span>
                                                            <FontAwesomeIcon
                                                                icon={[
                                                                    "fas",
                                                                    "calendar-days",
                                                                ]}
                                                            />
                                                            <strong>
                                                                <time
                                                                    dateTime={
                                                                        createdAt
                                                                    }
                                                                >
                                                                    {formatDate(
                                                                        createdAt
                                                                    )}
                                                                </time>
                                                            </strong>
                                                        </span>
                                                        <span>
                                                            <FontAwesomeIcon
                                                                icon={[
                                                                    "fas",
                                                                    "feather-pointed",
                                                                ]}
                                                            />
                                                            <strong>
                                                                {author}
                                                            </strong>
                                                        </span>
                                                    </small>
                                                </div>
                                                <div>
                                                    <GatsbyImage
                                                        image={topcImage}
                                                        alt={image.title}
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                }
                            )
                        )}
                    </ul>

                    <Link to="/topics/">
                        <FontAwesomeIcon icon={["fas", "angles-left"]} />{" "}
                        {t("topics.allTopics")}
                    </Link>
                </div>
            </section>
        </Layout>
    );
};

export default Topic;

export const Head = ({ pageContext: { nlContent } }) => {
    const { title, siteUrl } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
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
            {
                "@type": "ListItem",
                position: 3,
                name: nlContent.name,
                item: siteUrl + "/topics/" + nlContent.slug + "/",
            },
        ],
    };

    return (
        <SEO
            title={nlContent.name}
            description={nlContent.description}
            pathname={`/topics/${nlContent.slug}/`}
            schemaMarkup={breadcrumbSchema}
        />
    );
};
