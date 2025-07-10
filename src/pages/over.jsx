import * as React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";
import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

import About from "../components/ui/about";
import Spotify from "../components/ui/spotify";

import * as aboutStyles from "../styles/modules/pages/about.module.scss";

// TODO: klaar voor TS'en..

const AboutPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>
                    {t("about.title")}
                    <span>.</span>
                </h1>
            </section>

            <div className={aboutStyles.aboutSpotify}>
                <div className={aboutStyles.aboutSpotifyContainer}>
                    <About />
                    <Spotify />
                </div>
            </div>
        </Layout>
    );
};

export default AboutPage;

export const Head = () => {
    const { siteUrl, title, authorImage, author } = useSiteMetadata();

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
                name: "Over Ons",
                item: siteUrl + "/over/",
            },
        ],
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": siteUrl + "/over/#aboutpage",
        url: siteUrl + "/over/",
        name: "Over Ons",
        description: "Ontdek Menefex, het innovatieve webmediabedrijf onder leiding van Michael Fransman. Leer meer over onze missie, waarden, en unieke aanpak voor op maat gemaakte digitale oplossingen en webontwikkeling.",
        about: {
            "@id": siteUrl + "/#organization",
        },
        mainEntity: {
            "@id": siteUrl + "/#person",
        },
        isPartOf: {
            "@id": siteUrl + "/#website",
        },
    };

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": siteUrl + "/#person",
        name: author,
        url: siteUrl,
        image: siteUrl + authorImage,
        sameAs: [
            "https://www.facebook.com/michaelfransman",
            "https://www.twitter.com/mikeyfe",
            "https://www.instagram.com/mikeyfe6/",
            "https://www.linkedin.com/in/michaelfransman/",
            "https://github.com/mikeyfe6",
            "https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300",
            "https://menefex.nl",
        ],
        jobTitle: "Founder & Web Developer",
        worksFor: {
            "@id": siteUrl + "/#organization",
        },
    };

    return (
        <SEO
            title="Over Ons"
            description="Ontdek Menefex, het innovatieve webmediabedrijf onder leiding van Michael Fransman. Leer meer over onze missie, waarden, en unieke aanpak voor op maat gemaakte digitale oplossingen en webontwikkeling."
            keywords="Menefex, Michael Fransman, webmediabedrijf, webontwikkeling, digitale oplossingen, innovatie, missie, waarden, aanpak"
            pathname="/over/"
            schemaMarkup={[breadcrumbSchema, aboutPageSchema, personSchema]}
        />
    );
};
