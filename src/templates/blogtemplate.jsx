import React, { useEffect } from "react";

import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Disqus } from "gatsby-plugin-disqus";

import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { format, parseISO } from "date-fns";
import { nl, enUS } from "date-fns/locale";

import useSiteMetadata from "../hooks/use-site-metadata";
import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

import GoogleAdsDisplay from "../components/google/adsdisp";
import GoogleAdsMulti from "../components/google/adsmulti";

import mini from "../images/logo/mnfx-icon.svg";

import * as postStyle from "../styles/modules/templates/blog.module.scss";

// TODO: klaar voor TS'en..

const Post = ({ pageContext: { nlContent, enContent } }) => {
    const { t, i18n, isHydrated } = useTranslation();
    const { siteUrl } = useSiteMetadata();

    const currentLanguage = i18n.language;
    const content = currentLanguage === "nl" ? nlContent : enContent;

    const locale = currentLanguage === "nl" ? nl : enUS;

    const formatDate = (date) => {
        return format(parseISO(date), "eeee d MMMM yyyy", { locale });
    };

    const options = {
        preserveWhitespace: false,
        renderMark: {
            [MARKS.BOLD]: (text) => <b>{text}</b>,
            [MARKS.CODE]: (text) => <code>{text}</code>,
            [MARKS.ITALIC]: (text) => <em>{text}</em>,
            [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
        },
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                const {
                    data: {
                        target: { title, gatsbyImageData },
                    },
                } = node;

                const image = getImage(gatsbyImageData);

                return (
                    <div className={postStyle.assets}>
                        <GatsbyImage image={image} alt={title} />
                    </div>
                );
            },

            [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
                // // const {
                // //   data: {
                // //     target: { title, file },
                // //   },
                // // } = node;
                // console.log('huhhhh');
                // console.log('MFNXWMB: EMBEDDED_ENTRY', node); // Changed comma to semicolon
                // return <img alt="" src="" />;
            },

            [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
            [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
            [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
            [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
            [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
            [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
            [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
            [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
            [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,

            [BLOCKS.HR]: () => <hr />,

            [BLOCKS.QUOTE]: (node, children) => (
                <blockquote>{children}</blockquote>
            ),

            [INLINES.HYPERLINK]: ({ data }, children) => {
                const isInternal = data.uri.startsWith(siteUrl);
                const strippedUrl = isInternal
                    ? data.uri.replace(siteUrl, "")
                    : data.uri;

                if (isInternal) {
                    return <Link to={strippedUrl}>{children}</Link>;
                } else {
                    return (
                        <a
                            href={data.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    );
                }
            },

            [INLINES.ENTRY_HYPERLINK]: ({ data }, children) => {
                const { slug } = data.target;

                return <Link to={"/blog/" + slug}>{children}</Link>;
            },

            [INLINES.ASSET_HYPERLINK]: ({ data }, children) => {
                const { slug } = data.target;

                return <Link to={slug}>{children}</Link>;
            },

            [INLINES.EMBEDDED_ENTRY]: ({ data }, children) => {
                const { slug } = data.target;

                return <Link to={"/blog/" + slug}>{children}</Link>;
            },
        },
    };

    const postTopic = content.topics;
    const relatedPostsSet = new Set();
    const relatedPosts = [];

    const currentPostSlug = content.slug;

    postTopic.forEach((topic) => {
        topic.blog_post.forEach((post) => {
            if (
                post.slug !== currentPostSlug &&
                !relatedPostsSet.has(post.slug)
            ) {
                relatedPostsSet.add(post.slug);
                relatedPosts.push(post);
            }
        });
    });

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            const script = document.createElement("script");
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GATSBY_GOOGLE_CA_PUB}`;
            script.crossOrigin = "anonymous";
            script.async = true;

            document.body.appendChild(script);
            console.log("MFNXWMB: Google Adsense is geladen!");

            return () => {
                document.body.removeChild(script);
                console.log("MFNXWMB: Google Adsense is gestopt!");
            };
        }
    }, []);

    const image = getImage(content.image.gatsbyImageData);

    if (!isHydrated) return null;

    return (
        <Layout>
            <div className={postStyle.postContainer}>
                <div className={postStyle.postHeader}>
                    <img src={mini} alt="Menefex Icon" width={75} height={75} />

                    <h1>{content.title}</h1>
                </div>

                <hr />

                <div className={postStyle.postMain}>
                    <section id="post">
                        <div className={postStyle.postImage}>
                            <GatsbyImage
                                image={image}
                                alt={content.image.title}
                            />
                        </div>

                        <h2>{content.subtitle}</h2>
                        <div className={postStyle.postContent}>
                            {renderRichText(content.body, options)}
                        </div>

                        <div className={postStyle.postRss}>
                            <div className={postStyle.feedly}>
                                <a
                                    href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fmenefex.nl%2Frss.xml"
                                    title="Menefex WMB: RSS Feeds"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <img
                                        id="feedlyFollow"
                                        src="https://s3.feedly.com/img/follows/feedly-follow-circle-flat-green_2x.png"
                                        alt={t("blog.feedly")}
                                        width="18"
                                        height="18"
                                    />{" "}
                                    <span>{t("blog.feedly")}</span>
                                </a>
                            </div>
                            <div className={postStyle.feedburner}>
                                <a
                                    href="https://feeds.feedburner.com/MenefexWMB"
                                    type="application/rss+xml"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", "rss"]}
                                        size="lg"
                                    />{" "}
                                    <span>{t("blog.feedburner")}</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <Disqus
                                config={{
                                    url: `https://menefex.nl/blog/${content.slug}/`,
                                    identifier: content.contentful_id,
                                    language: currentLanguage,
                                    title: content.title,
                                }}
                            />
                        </div>
                    </section>
                    <aside>
                        <div className={postStyle.postDate}>
                            <span>{t("blog.postedOn")}</span>{" "}
                            <time dateTime={content.publishedPost}>
                                {formatDate(content.publishedPost)}
                            </time>
                        </div>
                        <div className={postStyle.postSidebar}>
                            <div className={postStyle.postAuthor}>
                                <span>
                                    <u>{t("blog.author")}</u>
                                </span>
                                <a
                                    href="https://www.linkedin.com/in/michaelfransman/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {content.author}
                                </a>
                                <span>
                                    <u>{t("blog.lastUpdated")}</u>
                                </span>
                                <time dateTime={content.updatedPost}>
                                    {formatDate(content.updatedPost)}
                                </time>
                            </div>

                            {relatedPosts?.length === 0 ? null : <hr />}

                            <div className={postStyle.postRelated}>
                                {relatedPosts?.length === 0 ? null : (
                                    <div>
                                        <h6>
                                            <u>{t("blog.relatedPosts")}</u>
                                        </h6>
                                    </div>
                                )}

                                <ul>
                                    {relatedPosts?.slice(0, 3).map((post) => (
                                        <li key={post.contentful_id}>
                                            <Link to={`/blog/${post.slug}/`}>
                                                <h5>{post.title}</h5>
                                                <p>{post.subtitle}</p>
                                                <span>
                                                    {t("blog.readMore")}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className={postStyle.postTopics}>
                    <ul>
                        {postTopic.map((relTopic) => (
                            <li key={relTopic.id}>
                                <Link
                                    to={`/topics/${relTopic.slug}/`}
                                    key={relTopic.id}
                                    style={{
                                        borderColor: relTopic.bdcolor,
                                    }}
                                >
                                    {relTopic.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link to="/blog/">
                        <FontAwesomeIcon icon={["fas", "angles-left"]} />{" "}
                        {t("blog.allPosts")}
                    </Link>
                </div>

                <section className={postStyle.postFamily}>
                    {relatedPosts?.length === 0 ? null : (
                        <h6>{t("blog.alsoInteresting")}</h6>
                    )}

                    <ul>
                        {relatedPosts?.slice(0, 3).map((post) => {
                            const projectImg = getImage(
                                post?.image?.gatsbyImageData
                            );

                            return (
                                <li key={post?.contentful_id}>
                                    <Link to={`/blog/${post?.slug}/`}>
                                        <GatsbyImage
                                            image={projectImg}
                                            alt={post?.image?.title}
                                        />
                                        <h5>{post?.title}</h5>
                                        <p>{post?.subtitle}</p>
                                        <span>{t("blog.readMore")}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                {process.env.NODE_ENV !== "development" && (
                    <GoogleAdsDisplay slot="3266975443" />
                )}

                {process.env.NODE_ENV !== "development" && (
                    <GoogleAdsMulti slot="1625762341" />
                )}
            </div>
        </Layout>
    );
};

export default Post;

export const Head = ({ pageContext: { nlContent } }) => {
    const { title: siteTitle, siteUrl, favicon } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "@id": siteUrl + "/#breadcrumb",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: siteTitle,
                item: siteUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: siteUrl + "/blog/",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: nlContent.title,
                item: siteUrl + "/blog/" + nlContent.slug + "/",
            },
        ],
    };

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": siteUrl + "/#blogpost",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": siteUrl + "/blog/" + nlContent.slug + "/",
        },
        headline: nlContent.title,
        description: nlContent.subtitle,
        image: "https:" + nlContent.image.file.url,
        author: {
            "@type": "Person",
            name: nlContent.author,
        },
        publisher: {
            "@type": "Organization",
            name: siteTitle,
            logo: {
                "@type": "ImageObject",
                url: siteUrl + favicon,
            },
        },
        datePublished: nlContent.publishedPost,
        dateModified: nlContent.updatedPost,
    };

    return (
        <SEO
            title={nlContent.title}
            description={nlContent.subtitle}
            keywords={nlContent.keywords.join(", ")}
            pathname={`/blog/${nlContent.slug}/`}
            ogimage={`https:${nlContent.image.file.url}`}
            schemaMarkup={[breadcrumbSchema, blogPostingSchema]}
            article
        />
    );
};
