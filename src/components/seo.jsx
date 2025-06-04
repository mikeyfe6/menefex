import * as React from "react";

import { useStaticQuery, graphql, Script } from "gatsby";

const SEO = ({
    title,
    description,
    children,
    keywords,
    article,
    pathname,
    ogimage,
    schemaMarkup,
}) => {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    siteTitle: title
                    defaultDescription: description
                    url: siteUrl
                    image
                    socialHandle
                }
            }
        }
    `);

    const { url, socialHandle, image, defaultDescription, siteTitle } =
        site.siteMetadata;

    const pageDescription = description || defaultDescription;
    const pageImage = ogimage || `${url}${image}`;
    const siteUrl = `${url}${pathname || ""}`;

    return (
        <>
            <title>{siteTitle ? `${title} · ${siteTitle}` : title}</title>

            <meta name="description" content={pageDescription} />
            <meta name="image" content={pageImage} />
            <meta name="keywords" content={keywords} />

            {/* --- OG / Facebook etc. Meta Tags ! --- */}

            <meta property="fb:app_id" content={process.env.GATSBY_FB_APP_ID} />

            {title && <meta property="og:title" content={title} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            {pageImage && <meta property="og:image" content={pageImage} />}
            <meta property="og:site_name" content={siteTitle} />
            {siteUrl && <meta property="og:url" content={siteUrl} />}
            <meta property="og:locale" content="nl_NL" />
            {(article ? (
                false
            ) : (
                <meta property="og:type" content="website" />
            )) || <meta property="og:type" content="article" />}

            {/* --- Twitter Meta Tags ! --- */}

            {title && <meta property="twitter:title" content={title} />}
            {description && (
                <meta property="twitter:description" content={description} />
            )}
            {pageImage && <meta property="twitter:image" content={pageImage} />}
            <meta property="twitter:card" content="summary" />
            {siteUrl && <meta property="twitter:url" content={siteUrl} />}
            <meta property="twitter:site" content={socialHandle} />
            {socialHandle && (
                <meta property="twitter:creator" content={socialHandle} />
            )}

            {/* --- Link Tags ! --- */}

            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />

            {/* --- SchemaMarkup ! --- */}

            {schemaMarkup && (
                <Script type="application/ld+json">
                    {JSON.stringify(schemaMarkup)}
                </Script>
            )}

            {children}
        </>
    );
};

export default SEO;
