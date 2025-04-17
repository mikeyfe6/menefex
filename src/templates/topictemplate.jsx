import React from "react";

import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { format, parseISO } from "date-fns";
import { nl, enUS } from "date-fns/locale";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as topicStyles from "../styles/modules/topics.module.scss";

// TODO: images naar GatsbyImage verwerken

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
        return <DefaultInfo text={t("noContentAvailable")} />;
    }

    if (!isHydrated) return null;

    return (
        <Layout>
            <h1 className="page-title">
                Topics
                <span>.</span>
            </h1>

            <h2 className="page-sub">
                <span style={{ color: content.bdcolor, fontWeight: "bold" }}>
                    #
                </span>{" "}
                {content.name}
            </h2>

            <ul className={topicStyles.posts}>
                {!content.topicPosts || content.topicPosts.length === 0 ? (
                    <DefaultInfo text={t("noBlogPosts")} />
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
                            const topcImage = getImage(image.gatsbyImageData);

                            return (
                                <li key={contentful_id}>
                                    <Link to={`/blog/${slug}/`}>
                                        <div>
                                            <h4>{title}</h4>
                                            <p>{subtitle}</p>
                                            <span>
                                                {t("blogPostedOn")}{" "}
                                                <strong>
                                                    {formatDate(createdAt)}
                                                </strong>{" "}
                                                ⌁ {t("blogAuthor")}{" "}
                                                <strong>{author}</strong>
                                            </span>
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

            <Link to="/topics/" className={topicStyles.backBtn}>
                <i className="fa-solid fa-angles-left" /> {t("topicsBackToAll")}
            </Link>
        </Layout>
    );
};

export default Topic;

export const Head = ({ pageContext: { nlContent } }) => {
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
