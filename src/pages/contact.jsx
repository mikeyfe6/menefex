import * as React from "react";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import LeadForm from "../components/forms/leadForm";
import Info from "../components/ui/info";
import Maps from "../components/google/maps";

import * as contactStyles from "../styles/modules/pages/contact.module.scss";

// TODO: klaar voor TS'en..

const ContactPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro contact">
                <h1>Contact</h1>
                <h2 dangerouslySetInnerHTML={{ __html: t("contact.intro") }} />
            </section>

            <div className={contactStyles.formInfo}>
                <div className={contactStyles.formInfoContainer}>
                    <LeadForm />
                    <Info />
                </div>
            </div>

            <Maps />
        </Layout>
    );
};

export default ContactPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "Contact";
    const pageDescription =
        "Contacteer Menefex voor een offerte, samenwerking of algemene vragen. Wij staan klaar om samen iets geweldigs te creëren! Binnen één werkdag reactie.";
    const pageSlug = "/contact/";

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

    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: siteUrl + pageSlug,
        name: pageTitle,
        description: pageDescription,
        about: {
            "@id": siteUrl + "/#organization",
        },
        mainEntity: {
            "@id": siteUrl + "/#organization",
        },
        isPartOf: {
            "@id": siteUrl + "/#webSite",
        },
    };

    return (
        <SEO
            title={pageTitle}
            description={pageDescription}
            keywords="contact, offerte, samenwerking, algemene vragen, reactie, Menefex, webontwikkeling, digitalisering, SEO, technologie"
            pathname={pageSlug}
            schemaMarkup={[breadcrumbSchema, contactPageSchema]}
        />
    );
};
