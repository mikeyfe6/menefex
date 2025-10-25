const fetchLastCommitDate = require("./src/utils/fetchLastCommitDate");

const superSiteUrl = process.env.URL || "https://menefex.nl";

require("dotenv").config({
    path: ".env",
});

const siteMetadata = {
    siteUrl: "https://menefex.nl",

    title: "Menefex",
    company: "Menefex Webmediabedrijf",
    description:
        "Bij Menefex bouwen wij websites, webshops & webapplicaties met oog voor detail.",

    telephone: "31611054318",
    email: "info@menefex.nl",

    author: "Michael Fransman",
    authorImage: "/michaelFransman.jpeg",
    authorEmail: "michaelfransman@menefex.nl",

    handle: "MenefexWMB",

    image: "/mnfx-scl.png",
    favicon: "/mnfx-favi.png",

    screens: "/mnfx-screens.jpeg",

    primary: "#FFCC00",
    secondary: "#a9a9a9",
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: "GTM-5X6VS2L",
                includeInDevelopment: false,
                defaultDataLayer: { platform: "gatsby" },

                // Specify optional GTM environment details.
                // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
                // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
            },
        },
        {
            resolve: "gatsby-plugin-canonical-urls",
            options: {
                siteUrl: siteMetadata.siteUrl,
            },
        },
        {
            resolve: "gatsby-source-contentful",
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                host: process.env.CONTENTFUL_HOST,
            },
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                implementation: require("sass"),
                sassOptions: {
                    silenceDeprecations: ["legacy-js-api"],
                },
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: `${__dirname}/src/images/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `project-images`,
                path: `${__dirname}/static/project-images`,
            },
        },
        "gatsby-plugin-image",
        {
            resolve: "gatsby-plugin-sharp",
            options: {
                defaults: {
                    placeholder: `blurred`,
                },
                // Set to false to allow builds to continue on image errors
                failOn: "warning",
            },
        },
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-plugin-disqus",
            options: {
                shortname: siteMetadata.title.toLowerCase(),
            },
        },
        {
            resolve: "gatsby-plugin-nprogress",
            options: {
                color: "#595858",
                showSpinner: true,
            },
        },
        {
            resolve: "gatsby-plugin-feed",
            options: {
                query: `
                {
                    site {
                        siteMetadata {
                            title
                            author
                            description
                            email
                            authorEmail
                            siteUrl
                        }
                    }
                }
                `,
                setup: ({ query: { site } }, options) => ({
                    ...options,
                    title: "Menefex WMB: RSS Feeds",
                    description: site.siteMetadata.description,
                    site_url: site.siteMetadata.siteUrl,
                    feed_url: `${site.siteMetadata.siteUrl}/rss.xml`,
                    image_url: `${site.siteMetadata.siteUrl} + ${site.siteMetadata.favicon}`,
                    webMaster: `${site.siteMetadata.email} (${site.siteMetadata.title})`,
                    managingEditor: `${site.siteMetadata.authorEmail} (${site.siteMetadata.author})`,
                    copyright: `© 2019 - ${new Date().getFullYear()} ${
                        site.siteMetadata.title
                    }, Alle rechten voorbehouden.`,
                    language: "nl",
                    generator: "GatsbyJS",
                    ttl: "60",
                    custom_namespaces: {
                        webfeeds: "http://webfeeds.org/rss/1.0",
                    },
                    custom_elements: [
                        {
                            "webfeeds:cover": {
                                _attr: {
                                    image: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
                                },
                            },
                        },
                        {
                            "webfeeds:icon": `${site.siteMetadata.siteUrl}${site.siteMetadata.favicon}`,
                        },
                        {
                            "webfeeds:logo": `${site.siteMetadata.siteUrl}${site.siteMetadata.favicon}`,
                        },
                        { "webfeeds:accentColor": "FFCC00" },
                        {
                            "webfeeds:related": {
                                _attr: {
                                    layout: "card",
                                    target: "browser",
                                },
                            },
                        },
                        {
                            "webfeeds:analytics": {
                                _attr: {
                                    id: "G-XWVP0BZJLR",
                                    engine: "GoogleAnalytics",
                                },
                            },
                        },
                    ],
                }),
                feeds: [
                    {
                        serialize: ({
                            query: { site, allContentfulBlogPost },
                        }) =>
                            allContentfulBlogPost.edges.map((edge) => {
                                const { siteUrl } = site.siteMetadata;
                                const {
                                    contentful_id,
                                    title,
                                    subtitle,
                                    slug,
                                    createdAt,
                                    body,
                                    image,
                                    topics,
                                } = edge.node;

                                return {
                                    title: title,
                                    description: subtitle,
                                    categories: topics.map(
                                        (topic) => topic.name
                                    ),
                                    date: createdAt,
                                    url: `${siteUrl}/blog/${slug}`,
                                    guid: contentful_id,
                                    lat: 52.30994007862562,
                                    long: 4.974422834381031,
                                    enclosure: {
                                        url: `https:${image.file.url}`,
                                    },
                                    custom_elements: [
                                        {
                                            "webfeeds:featuredImage": `https:${image.file.url}`,
                                        },
                                        {
                                            "content:encoded": body.rssHtml,
                                        },
                                    ],
                                };
                            }),
                        query: `
                        {
                            allContentfulBlogPost(sort: {createdAt: DESC} filter: { node_locale: { eq: "nl" } }) {
                                edges {
                                    node {
                                    contentful_id
                                    title
                                    subtitle
                                    slug
                                    createdAt
                                    body {
                                        rssHtml
                                        references {
                                            ... on ContentfulAsset {
                                                contentful_id
                                                __typename
                                            }
                                            ... on ContentfulBlogPost {
                                                contentful_id
                                                __typename
                                            }
                                        }
                                    }
                                    image {
                                        file {
                                        url
                                        }
                                    }
                                    topics {
                                        name
                                        }
                                    }
                                }
                            }
                        }
                        `,
                        output: "/rss.xml",
                        title: "Menefex WMB: RSS Feeds",
                        link: `https://feeds.feedburner.com/${siteMetadata.handle}`,
                        match: "^/blog/",
                        language: "nl-NL",
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: "menefex.nl",
                sitemap: `${siteMetadata.siteUrl}/sitemap-index.xml`,
                policy: [{ userAgent: "*", allow: "/" }],
            },
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                excludes: ["/success/"],
                query: `
                {
                    site {
                        siteMetadata {
                            siteUrl
                        }
                    }
            
                    allSitePage {
                        nodes {
                            path
                        }
                    }
            
                    allContentfulBlogPost {
                        nodes {
                            slug
                            updatedAt
                        }
                    }
            
                    allContentfulTopic {
                        nodes {
                            slug
                            updatedAt
                        }
                    }
                }
                `,
                resolveSiteUrl: () => superSiteUrl,
                resolvePages: async ({
                    allSitePage,
                    allContentfulBlogPost,
                    allContentfulTopic,
                }) => {
                    const blogPostsMap = allContentfulBlogPost.nodes.reduce(
                        (acc, post) => {
                            const { slug, updatedAt } = post;
                            acc[`/blog/${slug}/`] = {
                                path: `/blog/${slug}/`,
                                updatedAt,
                            };
                            return acc;
                        },
                        {}
                    );

                    const topicsMap = allContentfulTopic.nodes.reduce(
                        (acc, post) => {
                            const { slug, updatedAt } = post;
                            acc[`/topics/${slug}/`] = {
                                path: `/topics/${slug}/`,
                                updatedAt,
                            };
                            return acc;
                        },
                        {}
                    );

                    const sitePagesMap = {};
                    for (const page of allSitePage.nodes) {
                        const { path } = page;

                        const filePath = `src/pages${
                            path === "/" ? "/index" : path.replace(/\/$/, "")
                        }.jsx`;

                        const lastmod = await fetchLastCommitDate(filePath);
                        sitePagesMap[path] = { path, updatedAt: lastmod };
                    }

                    const pagesMap = {
                        ...sitePagesMap,
                        ...blogPostsMap,
                        ...topicsMap,
                    };

                    return Object.values(pagesMap);
                },
                serialize: ({ path, updatedAt }) => ({
                    url: path,
                    changefreq: "daily",
                    priority: 0.7,
                    lastmod: updatedAt,
                }),
            },
        },
        "gatsby-plugin-catch-links",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: siteMetadata.company,
                short_name: siteMetadata.title,
                description: siteMetadata.description,
                start_url: "/",
                lang: "nl",
                theme_color: siteMetadata.primary,
                background_color: siteMetadata.secondary,
                display: "standalone",
                icon: "src/images/favicon/mnfx-icon.png",
                icon_options: {
                    purpose: "any maskable",
                },
                crossOrigin: "use-credentials",
            },
        },
        "gatsby-plugin-offline",
    ],
};
