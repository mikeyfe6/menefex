import React, { useEffect, useState } from "react";

import { Link } from "gatsby";
import axios from "axios";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Disqus } from "gatsby-plugin-disqus";

import {
    useContentfulLiveUpdates,
    useContentfulInspectorMode,
} from "@contentful/live-preview/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

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

const SPACE_ID = process.env.GATSBY_CONTENTFUL_PREVIEW_SPACE_ID;
const PREVIEW_TOKEN = process.env.GATSBY_CONTENTFUL_PREVIEW_TOKEN;

function collectAssetIds(document) {
    const ids = new Set();
    function traverse(node) {
        if (
            node.nodeType === "embedded-asset-block" &&
            node.data?.target?.sys?.id
        ) {
            ids.add(node.data.target.sys.id);
        }
        if (node.content) {
            node.content.forEach(traverse);
        }
    }
    traverse(document);
    return Array.from(ids);
}

const Post = ({ pageContext: { nlContent, enContent } }) => {
    const { t, i18n, isHydrated } = useTranslation();
    const { siteUrl } = useSiteMetadata();

    const currentLanguage = i18n.language;
    const currentContent = currentLanguage === "nl" ? nlContent : enContent;

    const [previewEntry, setPreviewEntry] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewAssets, setPreviewAssets] = useState({});

    const previewContent = useContentfulLiveUpdates(previewEntry);

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") return;

        async function fetchEntry() {
            const entryId = currentContent.contentful_id;
            const locale = currentLanguage || "nl";
            const url = `https://preview.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entryId}?locale=${locale}`;
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${PREVIEW_TOKEN}` },
            });
            setPreviewEntry(res.data);
        }
        fetchEntry();
    }, [currentContent, currentLanguage]);

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") return;

        const imageId = previewEntry?.fields?.image?.sys?.id;
        if (!imageId) return;

        async function fetchAsset() {
            const assetUrl = `https://preview.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${imageId}?access_token=${PREVIEW_TOKEN}`;
            const res = await axios.get(assetUrl);
            setPreviewImage(res.data);
        }
        fetchAsset();
    }, [previewEntry]);

    useEffect(() => {
        if (
            process.env.NODE_ENV !== "development" ||
            !previewContent?.fields?.body
        )
            return;

        const assetIds = collectAssetIds(previewContent.fields.body);
        if (assetIds.length === 0) return;

        async function fetchAssets() {
            const promises = assetIds.map((id) =>
                axios
                    .get(
                        `https://preview.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${id}?access_token=${PREVIEW_TOKEN}`
                    )
                    .then((res) => [id, res.data])
            );
            const results = await Promise.all(promises);
            const map = Object.fromEntries(results);
            setPreviewAssets(map);
        }
        fetchAssets();
    }, [previewContent]);

    const inspectorProps = useContentfulInspectorMode({
        entryId: previewEntry?.sys?.id || currentContent.contentful_id,
    });

    const locale = currentLanguage === "nl" ? nl : enUS;

    const formatDate = (date) => {
        return format(parseISO(date), "eeee d MMMM yyyy", { locale });
    };

    const formatTime = (date) => {
        return format(parseISO(date), "p", { locale });
    };

    const currentOptions = {
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

            [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {},

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

    const previewOptions = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const assetId = node.data.target.sys.id;
                const asset = previewAssets[assetId];
                if (!asset) return null;
                const { title, file } = asset.fields || {};
                const url = file?.url?.startsWith("//")
                    ? `https:${file.url}`
                    : file?.url;
                return url ? (
                    <div className={postStyle.assets}>
                        <img src={url} alt={title} />
                    </div>
                ) : null;
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {},
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

            [INLINES.HYPERLINK]: (node, children) => {
                const { uri } = node.data;
                const isInternal = uri && uri.startsWith(siteUrl);
                const strippedUrl = isInternal ? uri.replace(siteUrl, "") : uri;
                if (isInternal) {
                    return <Link to={strippedUrl}>{children}</Link>;
                } else {
                    return (
                        <a href={uri} target="_blank" rel="noopener noreferrer">
                            {children}
                        </a>
                    );
                }
            },

            [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                const { slug } = node.data.target.fields || {};
                return slug ? (
                    <Link to={`/blog/${slug}`}>{children}</Link>
                ) : (
                    children
                );
            },

            [INLINES.ASSET_HYPERLINK]: (node, children) => {
                const { slug } = node.data.target.fields || {};
                return slug ? <Link to={slug}>{children}</Link> : children;
            },

            [INLINES.EMBEDDED_ENTRY]: (node, children) => {
                const { slug } = node.data.target.fields || {};
                return slug ? (
                    <Link to={`/blog/${slug}`}>{children}</Link>
                ) : (
                    children
                );
            },
        },
    };

    const postTopic = currentContent.topics;
    const relatedPostsSet = new Set();
    const relatedPosts = [];

    const currentPostSlug = currentContent.slug;

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

    if (!isHydrated) return null;

    return (
        <Layout>
            <div className={postStyle.postContainer}>
                <div className={postStyle.postHeader}>
                    <img src={mini} alt="Menefex Icon" width={75} height={75} />

                    <h1
                        {...inspectorProps({
                            fieldId: "title",
                        })}
                    >
                        {previewContent?.fields?.title || currentContent.title}
                    </h1>
                </div>

                <hr />

                <div className={postStyle.postMain}>
                    <section id="post">
                        <div
                            className={postStyle.postImage}
                            {...inspectorProps({
                                fieldId: "image",
                            })}
                        >
                            {previewImage ? (
                                <img
                                    src={
                                        previewImage.fields.file.url.startsWith(
                                            "//"
                                        )
                                            ? `https:${previewImage.fields.file.url}`
                                            : previewImage.fields.file.url
                                    }
                                    alt={previewImage.fields.title}
                                />
                            ) : (
                                <GatsbyImage
                                    image={getImage(
                                        currentContent.image.gatsbyImageData
                                    )}
                                    alt={currentContent.title}
                                />
                            )}
                        </div>

                        <h2
                            {...inspectorProps({
                                fieldId: "subtitle",
                            })}
                        >
                            {previewContent?.fields?.subtitle ||
                                currentContent.subtitle}
                        </h2>
                        <div
                            className={postStyle.postContent}
                            {...inspectorProps({
                                fieldId: "body",
                            })}
                        >
                            {previewContent?.fields?.body
                                ? documentToReactComponents(
                                      previewContent.fields.body,
                                      previewOptions
                                  )
                                : renderRichText(
                                      currentContent.body,
                                      currentOptions
                                  )}
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
                                    url: `https://menefex.nl/blog/${currentContent.slug}/`,
                                    identifier: currentContent.contentful_id,
                                    language: currentLanguage,
                                    title: currentContent.title,
                                }}
                            />
                        </div>
                    </section>
                    <aside>
                        <div className={postStyle.postDate}>
                            <span>{t("blog.postedOn")}</span>{" "}
                            <time dateTime={currentContent.publishedPost}>
                                {formatDate(currentContent.publishedPost)}
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
                                    {currentContent.author}
                                </a>
                                <span>
                                    <u>{t("blog.lastUpdated")}</u>
                                </span>
                                <time dateTime={currentContent.updatedPost}>
                                    {formatDate(currentContent.updatedPost)},{" "}
                                    {formatTime(currentContent.updatedPost)}
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
    const { siteUrl } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        name: nlContent.title,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Blog",
                item: siteUrl + "/blog/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: nlContent.title,
                item: siteUrl + "/blog/" + nlContent.slug + "/",
            },
        ],
    };

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": siteUrl + "/blog/" + nlContent.slug + "/#blogPosting",
        mainEntityOfPage: siteUrl + "/blog/" + nlContent.slug + "/",
        headline: nlContent.title,
        description: nlContent.subtitle,
        image: "https:" + nlContent.image.file.url,
        author: {
            "@id": siteUrl + "/#person",
        },
        publisher: {
            "@id": siteUrl + "/#organization",
        },
        url: siteUrl + "/blog/" + nlContent.slug + "/",
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
