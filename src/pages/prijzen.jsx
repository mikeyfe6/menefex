import React, { useRef } from "react";

import { Link } from "gatsby";

import useSiteMetadata from "../hooks/use-site-metadata";
import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

import PriceTable from "../components/ui/pricetable";
import Notes from "../components/ui/notes";
import CallForm from "../components/forms/callForm";

import * as pricesStyles from "../styles/modules/pages/prices.module.scss";

// TODO: klaar voor TS'en..

const discountUntil = new Date("2025-12-31").toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
});

const Prices = () => {
    const { t, isHydrated } = useTranslation();
    const callRef = useRef(null);

    const goToCallForm = (event) => {
        if (callRef.current) {
            event.preventDefault();
            callRef.current.focus();
        }
    };

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>{t("prices.title")}</h1>
                <h2>
                    {t("prices.intro.one")}{" "}
                    <Link to="/contact/" className={pricesStyles.contactUs}>
                        {t("prices.intro.contactUs")}
                    </Link>{" "}
                    {t("prices.intro.two")}{" "}
                    <button
                        className={pricesStyles.callBack}
                        onClick={goToCallForm}
                        tabIndex={0}
                    >
                        {t("prices.intro.callBack")}
                    </button>
                    .
                </h2>
            </section>

            <PriceTable />

            <div className={pricesStyles.notesCall}>
                <Notes />
                <CallForm callRef={callRef} />
            </div>
        </Layout>
    );
};

export default Prices;

export const Head = () => {
    const { siteUrl, priceImage } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Prijzen & tarieven",
                item: siteUrl + "/prijzen/",
            },
        ],
    };

    const budgetPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Budget Plan",
        image: siteUrl + priceImage,
        description:
            "Het Budget Plan biedt een betaalbare oplossing voor kleine projecten met ontwikkeling van website, webapplicatie of webshop, inclusief SEO-optimalisatie en een maand gratis ondersteuning.",
        brand: {
            "@id": siteUrl + "/#organization",
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "295.00",
            availability: "https://schema.org/OnlineOnly",
            priceValidUntil: discountUntil,
        },
    };

    const starterPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Starter Plan",
        image: siteUrl + priceImage,
        description:
            "Het Starter Plan is ideaal voor groeiende bedrijven, met meer pagina's en functies, inclusief een blog en drie maanden gratis ondersteuning.",
        brand: {
            "@id": siteUrl + "/#organization",
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "595.00",
            availability: "https://schema.org/OnlineOnly",
            priceValidUntil: discountUntil,
        },
    };

    const establishedPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Established Plan",
        image: siteUrl + priceImage,
        description:
            "Het Established Plan is geschikt voor gevestigde bedrijven, met een uitgebreider pakket aan diensten en zes maanden gratis ondersteuning.",
        brand: {
            "@id": siteUrl + "/#organization",
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "1025.00",
            availability: "https://schema.org/OnlineOnly",
            priceValidUntil: discountUntil,
        },
    };

    const businessPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Business Plan",
        image: siteUrl + priceImage,
        description:
            "Het Business Plan is ontworpen voor grote bedrijven of e-commerce, met onbeperkte pagina's, e-commercefunctionaliteit en een jaar gratis ondersteuning.",
        brand: {
            "@id": siteUrl + "/#organization",
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "1575.00",
            availability: "https://schema.org/OnlineOnly",
            priceValidUntil: discountUntil,
        },
    };

    return (
        <SEO
            title="Prijzen & Tarieven"
            description="Bekijk de scherpe tarieven van Menefex voor webdesign, webontwikkeling en op maat gemaakte digitale oplossingen. Kies uit onze flexibele pakketten vanaf €265,50 (excl btw) en realiseer uw online ambities. Vraag een offerte of terugbelverzoek aan!"
            keywords="prijzen, tarieven, webdesign, webontwikkeling, digitale oplossingen, online ambities, offerte, terugbelverzoek"
            pathname="/prijzen/"
            schemaMarkup={[
                breadcrumbSchema,
                budgetPlanSchema,
                starterPlanSchema,
                establishedPlanSchema,
                businessPlanSchema,
            ]}
        />
    );
};
