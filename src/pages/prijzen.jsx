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

const dateReview = new Date("2024-04-16").toLocaleDateString("nl-NL", {
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
                <h1>
                    {t("prices.title")}
                    <span>.</span>
                </h1>

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
    const { title, siteUrl, priceImage } = useSiteMetadata();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
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
                name: "Prijzen & tarieven",
                item: siteUrl + "/prijzen/",
            },
        ],
    };

    const budgetPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": siteUrl + "/#budgetplan",
        name: "Budget Plan",
        image: siteUrl + priceImage,
        description:
            "Het Budget Plan biedt een betaalbare oplossing voor kleine projecten met ontwikkeling van website, webapplicatie of webshop, inclusief SEO-optimalisatie en een maand gratis ondersteuning.",
        brand: {
            "@type": "Brand",
            name: title,
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "295.00",
            availability: "https://schema.org/OnlineOnly",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: discountUntil,
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                returnPolicyCategory:
                    "https://schema.org/MerchantReturnNotPermitted",
                applicableCountry: "NL",
            },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "0.00",
                    currency: "EUR",
                },
                shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "NL",
                },
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                        "@type": "QuantitativeValue",
                        minValue: 0,
                        maxValue: 1,
                        unitCode: "DAY",
                    },
                    transitTime: {
                        "@type": "QuantitativeValue",
                        minValue: 1,
                        maxValue: 5,
                        unitCode: "DAY",
                    },
                },
            },
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "10",
        },

        review: {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
            },
            author: {
                "@type": "Person",
                name: "John Doe",
            },
            datePublished: dateReview,
            reviewBody: "Great product!",
        },
    };

    const starterPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": siteUrl + "/#starterplan",
        name: "Starter Plan",
        image: siteUrl + priceImage,
        description:
            "Het Starter Plan is ideaal voor groeiende bedrijven, met meer pagina's en functies, inclusief een blog en drie maanden gratis ondersteuning.",
        brand: {
            "@type": "Brand",
            name: title,
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "595.00",
            availability: "https://schema.org/OnlineOnly",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: discountUntil,
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                returnPolicyCategory:
                    "https://schema.org/MerchantReturnNotPermitted",
                applicableCountry: "NL",
            },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "0.00",
                    currency: "EUR",
                },
                shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "NL",
                },
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                        "@type": "QuantitativeValue",
                        minValue: 0,
                        maxValue: 1,
                        unitCode: "DAY",
                    },
                    transitTime: {
                        "@type": "QuantitativeValue",
                        minValue: 1,
                        maxValue: 5,
                        unitCode: "DAY",
                    },
                },
            },
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "10",
        },

        review: {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
            },
            author: {
                "@type": "Person",
                name: "Jane Smith",
            },
            datePublished: dateReview,
            reviewBody: "Great product!",
        },
    };

    const establishedPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": siteUrl + "/#establishedplan",
        name: "Established Plan",
        image: siteUrl + priceImage,
        description:
            "Het Established Plan is geschikt voor gevestigde bedrijven, met een uitgebreider pakket aan diensten en zes maanden gratis ondersteuning.",
        brand: {
            "@type": "Brand",
            name: title,
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "1025.00",
            availability: "https://schema.org/OnlineOnly",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: discountUntil,
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                returnPolicyCategory:
                    "https://schema.org/MerchantReturnNotPermitted",
                applicableCountry: "NL",
            },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "0.00",
                    currency: "EUR",
                },
                shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "NL",
                },
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                        "@type": "QuantitativeValue",
                        minValue: 0,
                        maxValue: 1,
                        unitCode: "DAY",
                    },
                    transitTime: {
                        "@type": "QuantitativeValue",
                        minValue: 1,
                        maxValue: 5,
                        unitCode: "DAY",
                    },
                },
            },
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "10",
        },

        review: {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
            },
            author: {
                "@type": "Person",
                name: "Joe Blow",
            },
            datePublished: dateReview,
            reviewBody: "Great product!",
        },
    };

    const businessPlanSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": siteUrl + "/#businessplan",
        name: "Business Plan",
        image: siteUrl + priceImage,
        description:
            "Het Business Plan is ontworpen voor grote bedrijven of e-commerce, met onbeperkte pagina's, e-commercefunctionaliteit en een jaar gratis ondersteuning.",
        brand: {
            "@type": "Brand",
            name: title,
        },

        offers: {
            "@type": "Offer",
            url: siteUrl + "/prijzen/",
            priceCurrency: "EUR",
            price: "1575.00",
            availability: "https://schema.org/OnlineOnly",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: discountUntil,
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                returnPolicyCategory:
                    "https://schema.org/MerchantReturnNotPermitted",
                applicableCountry: "NL",
            },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "0.00",
                    currency: "EUR",
                },
                shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "NL",
                },
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                        "@type": "QuantitativeValue",
                        minValue: 0,
                        maxValue: 1,
                        unitCode: "DAY",
                    },
                    transitTime: {
                        "@type": "QuantitativeValue",
                        minValue: 1,
                        maxValue: 5,
                        unitCode: "DAY",
                    },
                },
            },
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "10",
        },

        review: {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
            },
            author: {
                "@type": "Person",
                name: "Joe Schmo",
            },
            datePublished: dateReview,
            reviewBody: "Great product!",
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
