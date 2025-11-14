import * as React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";

const SEO = ({
    title,
    description,
    children,
    keywords,
    article,
    pathname,
    ogImage,
    ogImageAlt,
    schemaMarkup,
    publishedDate,
    modifiedDate,
    noindex,
}) => {
    const {
        title: siteTitle,
        defaultDescription,
        siteUrl: url,
        image,
        handle,
        company,
        favicon,
        telephone,
        author,
        authorImage,
    } = useSiteMetadata();

    const siteUrl = `${url}${pathname || ""}`;

    const pageDescription = description || defaultDescription;

    const pageImage = ogImage || `${url}${image}`;
    const pageImageAlt =
        ogImageAlt || (title ? `${title} | ${siteTitle}` : siteTitle);

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": url + "/#organization",
        name: siteTitle,
        alternateName: company,
        founder: {
            "@id": url + "/#person",
        },
        url: url,
        image: url + image,
        logo: {
            "@type": "ImageObject",
            "@id": url + "/#logo",
            url: url + favicon,
        },
        contactPoint: [
            {
                "@type": "ContactPoint",
                "@id": url + "/#customerService",
                telephone: telephone,
                areaServed: ["NL", "BE", "SR", "GB"],
                contactOption: "TollFree",
                contactType: "customer service",
                availableLanguage: ["Dutch", "Spanish", "English", "German"],
            },
            {
                "@type": "ContactPoint",
                "@id": url + "/#technicalsupport",
                telephone: telephone,
                areaServed: ["NL", "BE", "SR", "GB"],
                contactOption: "TollFree",
                contactType: "technical support",
                availableLanguage: ["Dutch", "Spanish", "English", "German"],
            },
        ],
        sameAs: [
            `https://www.facebook.com/${handle}`,
            `https://www.x.com/${handle}`,
            `https://www.instagram.com/${handle}/`,
            `https://www.linkedin.com/company/${handle}/`,
            `https://github.com/mikeyfe6`,
            `https://www.patreon.com/${handle}`,
            `https://feeds.feedburner.com/${handle}`,
            `https://wa.me/${telephone}`,
            `https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300`,
        ],
    };

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${url}${pathname || ""}`,
        name: title,
        description: pageDescription,
        isPartOf: {
            "@id": url + "/#webSite",
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": url + "/#webSite",
        name: siteTitle,
        url: url,
    };

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": url + "/#person",
        name: author,
        url: url + "/over/",
        image: url + authorImage,
        sameAs: [
            "https://www.linkedin.com/in/michaelfransman/",
            "https://www.facebook.com/michaelfransman",
            "https://www.x.com/mikeyfe6",
            "https://www.instagram.com/mikeyfe6/",
            "https://github.com/mikeyfe6",
            "https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300",
        ],
        jobTitle: "Founder & Web Developer",
        worksFor: {
            "@id": url + "/#organization",
        },
    };

    const createCombinedSchema = (customSchema, baseSchemas) => {
        if (!customSchema) return baseSchemas;

        const customSchemas = Array.isArray(customSchema)
            ? customSchema
            : [customSchema];
        return [...customSchemas, ...baseSchemas];
    };

    const baseSchemas = [
        organizationSchema,
        webPageSchema,
        websiteSchema,
        personSchema,
    ];

    const combinedSchema = createCombinedSchema(schemaMarkup, baseSchemas);

    return (
        <>
            <title>{siteTitle ? `${title} · ${siteTitle}` : title}</title>

            <meta name="description" content={pageDescription} />
            <meta name="image" content={pageImage} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            {/* --- OG / Facebook etc. Meta Tags ! --- */}

            <meta property="fb:app_id" content={process.env.GATSBY_FB_APP_ID} />
            <meta property="fb:domains" content="menefex.nl" />

            {title && <meta property="og:title" content={title} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            {pageImage && <meta property="og:image" content={pageImage} />}
            {pageImageAlt && (
                <meta property="og:image:alt" content={pageImageAlt} />
            )}
            <meta property="og:site_name" content={siteTitle} />
            {siteUrl && <meta property="og:url" content={siteUrl} />}
            <meta property="og:locale" content="nl_NL" />
            <meta property="og:locale:alternate" content="en_US" />
            <meta
                property="og:type"
                content={article ? "article" : "website"}
            />

            {article && (
                <>
                    <meta
                        property="article:published_time"
                        content={publishedDate}
                    />
                    <meta
                        property="article:modified_time"
                        content={modifiedDate}
                    />
                    <meta
                        property="article:author"
                        content={`https://www.facebook.com/${handle}`}
                    />
                </>
            )}

            {/* --- Twitter Meta Tags ! --- */}

            <meta property="twitter:card" content="summary_large_image" />
            {title && <meta property="twitter:title" content={title} />}
            {description && (
                <meta property="twitter:description" content={description} />
            )}
            {pageImage && <meta property="twitter:image" content={pageImage} />}
            {siteUrl && <meta property="twitter:url" content={siteUrl} />}
            <meta property="twitter:site" content={`@${handle}`} />
            {handle && (
                <meta property="twitter:creator" content={`@${handle}`} />
            )}

            {/* --- Schema Markup ! --- */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(combinedSchema),
                }}
            />

            {/* Robots Meta Tag ! */}

            {noindex && <meta name="robots" content="noindex" />}

            {children}
        </>
    );
};

export default SEO;
