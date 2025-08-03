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
    const { siteUrl } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Over Ons",
                item: siteUrl + "/over/",
            },
        ],
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: siteUrl + "/over/",
        name: "Over Ons",
        description:
            "Ontdek Menefex, het innovatieve webmediabedrijf onder leiding van Michael Fransman. Leer meer over onze missie, waarden, en unieke aanpak voor op maat gemaakte digitale oplossingen en webontwikkeling.",
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
            title="Over Ons"
            description="Ontdek Menefex, het innovatieve webmediabedrijf onder leiding van Michael Fransman. Leer meer over onze missie, waarden, en unieke aanpak voor op maat gemaakte digitale oplossingen en webontwikkeling."
            keywords="Menefex, Michael Fransman, webmediabedrijf, webontwikkeling, digitale oplossingen, innovatie, missie, waarden, aanpak"
            pathname="/over/"
            schemaMarkup={[breadcrumbSchema, aboutPageSchema]}
        />
    );
};
