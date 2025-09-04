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
                <h1>{t("about.title")}</h1>
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
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Over Ons";
    const pageDescription =
        "Ontdek Menefex, het innovatieve webmediabedrijf onder leiding van Michael Fransman. Leer meer over onze missie, waarden, en unieke aanpak voor op maat gemaakte digitale oplossingen en webontwikkeling.";
    const pageSlug = "/over/";

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        name: pageTitle,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: pageTitle,
                item: siteUrl + pageSlug,
            },
        ],
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: siteUrl + pageSlug,
        name: pageTitle,
        description: pageDescription,
        about: {
            "@id": siteUrl + "/#organization",
        },
        mainEntity: {
            "@id": siteUrl + "/#person",
        },
        isPartOf: {
            "@id": siteUrl + "/#webSite",
        },
    };

    return (
        <SEO
            title={pageTitle}
            description={pageDescription}
            keywords="Menefex, Michael Fransman, webmediabedrijf, webontwikkeling, digitale oplossingen, innovatie, missie, waarden, aanpak"
            pathname={pageSlug}
            schemaMarkup={[breadcrumbSchema, aboutPageSchema]}
        />
    );
};
