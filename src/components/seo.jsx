import * as React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";

const SEO = ({
    title,
    description,
    children,
    keywords,
    article,
    pathname,
    ogimage,
    schemaMarkup,
    noindex,
}) => {
    const {
        siteTitle,
        defaultDescription,
        siteUrl: url,
        image,
        socialHandle,
        company,
        favicon,
        bizTel,
        author,
        authorImage,
    } = useSiteMetadata();

    const pageDescription = description || defaultDescription;
    const pageImage = ogimage || `${url}${image}`;
    const siteUrl = `${url}${pathname || ""}`;

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
                telephone: bizTel,
                areaServed: ["NL", "BE", "SR", "GB"],
                contactOption: "TollFree",
                contactType: "customer service",
                availableLanguage: ["Dutch", "Spanish", "English", "German"],
            },
            {
                "@type": "ContactPoint",
                "@id": url + "/#technicalsupport",
                telephone: bizTel,
                areaServed: ["NL", "BE", "SR", "GB"],
                contactOption: "TollFree",
                contactType: "technical support",
                availableLanguage: ["Dutch", "Spanish", "English", "German"],
            },
        ],
        sameAs: [
            "https://www.facebook.com/MenefexWMB",
            "https://www.twitter.com/MenefexWMB",
            "https://www.instagram.com/menefexwmb/",
            "https://www.linkedin.com/company/menefexwmb/",
            "https://github.com/mikeyfe6",
            "https://www.patreon.com/menefexWMB",
            "https://feeds.feedburner.com/MenefexWMB",
            "https://wa.me/31611054318",
            "https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300",
        ],
    };

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}${pathname || ""}#webpage`,
        url: `${url}${pathname || ""}`,
        name: title,
        description: pageDescription,
        isPartOf: {
            "@id": `${url}/#website`,
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": url + "/#website",
        name: title,
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
            "https://www.twitter.com/mikeyfe",
            "https://www.instagram.com/mikeyfe6/",
            "https://github.com/mikeyfe6",
            "https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300",
        ],
        jobTitle: "Founder & Web Developer",
        worksFor: {
            "@id": url + "/#organization",
        },
    };

    const combinedSchema = schemaMarkup
        ? Array.isArray(schemaMarkup)
            ? [
                  ...schemaMarkup,
                  organizationSchema,
                  webPageSchema,
                  websiteSchema,
                  personSchema,
              ]
            : [
                  schemaMarkup,
                  organizationSchema,
                  webPageSchema,
                  websiteSchema,
                  personSchema,
              ]
        : [organizationSchema, webPageSchema, websiteSchema, personSchema];

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
            <meta property="og:locale:alternate" content="en_US" />
            <meta
                property="og:type"
                content={article ? "article" : "website"}
            />

            {/* --- Twitter Meta Tags ! --- */}

            <meta property="twitter:card" content="summary" />
            {title && <meta property="twitter:title" content={title} />}
            {description && (
                <meta property="twitter:description" content={description} />
            )}
            {pageImage && <meta property="twitter:image" content={pageImage} />}
            {siteUrl && <meta property="twitter:url" content={siteUrl} />}
            <meta property="twitter:site" content={socialHandle} />
            {socialHandle && (
                <meta property="twitter:creator" content={socialHandle} />
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
