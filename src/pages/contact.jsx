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
                <h1>
                    Contact<span>.</span>
                </h1>
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
    const { title, siteUrl } = useSiteMetadata();

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
                name: "Contact",
                item: siteUrl + "/contact/",
            },
        ],
    };

    return (
        <SEO
            title="Contact"
            description="Contacteer Menefex voor een offerte, samenwerking of algemene vragen. Wij staan klaar om samen iets geweldigs te creëren! Binnen één werkdag reactie."
            keywords="contact, offerte, samenwerking, algemene vragen, reactie, Menefex, webontwikkeling, digitalisering, SEO, technologie"
            pathname="/contact/"
            schemaMarkup={[breadcrumbSchema]}
        />
    );
};
