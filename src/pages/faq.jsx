import React, { useState } from "react";

import { Link } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import nlTranslations from "../i18n/nl.js";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as faqStyles from "../styles/modules/pages/faq.module.scss";

const FaqPage = () => {
    const { t, isHydrated } = useTranslation();
    const [openItem, setOpenItem] = useState(null);

    const faqCategories = {
        websites: [
            {
                question: t("faq.websites.itemOne.question"),
                answer: t("faq.websites.itemOne.answer"),
            },
            {
                question: t("faq.websites.itemTwo.question"),
                answer: t("faq.websites.itemTwo.answer"),
            },
            {
                question: t("faq.websites.itemThree.question"),
                answer: t("faq.websites.itemThree.answer"),
            },
            {
                question: t("faq.websites.itemFour.question"),
                answer: t("faq.websites.itemFour.answer"),
            },
            {
                question: t("faq.websites.itemFive.question"),
                answer: t("faq.websites.itemFive.answer"),
            },
        ],
        webapps: [
            {
                question: t("faq.webapps.itemOne.question"),
                answer: t("faq.webapps.itemOne.answer"),
            },
            {
                question: t("faq.webapps.itemTwo.question"),
                answer: t("faq.webapps.itemTwo.answer"),
            },
            {
                question: t("faq.webapps.itemThree.question"),
                answer: t("faq.webapps.itemThree.answer"),
            },
            {
                question: t("faq.webapps.itemFour.question"),
                answer: t("faq.webapps.itemFour.answer"),
            },
            {
                question: t("faq.webapps.itemFive.question"),
                answer: t("faq.webapps.itemFive.answer"),
            },
        ],
        webshops: [
            {
                question: t("faq.webshops.itemOne.question"),
                answer: t("faq.webshops.itemOne.answer"),
            },
            {
                question: t("faq.webshops.itemTwo.question"),
                answer: t("faq.webshops.itemTwo.answer"),
            },
            {
                question: t("faq.webshops.itemThree.question"),
                answer: t("faq.webshops.itemThree.answer"),
            },
            {
                question: t("faq.webshops.itemFour.question"),
                answer: t("faq.webshops.itemFour.answer"),
            },
            {
                question: t("faq.webshops.itemFive.question"),
                answer: t("faq.webshops.itemFive.answer"),
            },
        ],
        seo: [
            {
                question: t("faq.seo.itemOne.question"),
                answer: t("faq.seo.itemOne.answer"),
            },
            {
                question: t("faq.seo.itemTwo.question"),
                answer: t("faq.seo.itemTwo.answer"),
            },
            {
                question: t("faq.seo.itemThree.question"),
                answer: t("faq.seo.itemThree.answer"),
            },
            {
                question: t("faq.seo.itemFour.question"),
                answer: t("faq.seo.itemFour.answer"),
            },
            {
                question: t("faq.seo.itemFive.question"),
                answer: t("faq.seo.itemFive.answer"),
            },
        ],
        maintenance: [
            {
                question: t("faq.maintenance.itemOne.question"),
                answer: t("faq.maintenance.itemOne.answer"),
            },
            {
                question: t("faq.maintenance.itemTwo.question"),
                answer: t("faq.maintenance.itemTwo.answer"),
            },
            {
                question: t("faq.maintenance.itemThree.question"),
                answer: t("faq.maintenance.itemThree.answer"),
            },
            {
                question: t("faq.maintenance.itemFour.question"),
                answer: t("faq.maintenance.itemFour.answer"),
            },
            {
                question: t("faq.maintenance.itemFive.question"),
                answer: t("faq.maintenance.itemFive.answer"),
            },
        ],
        optimizations: [
            {
                question: t("faq.optimizations.itemOne.question"),
                answer: t("faq.optimizations.itemOne.answer"),
            },
            {
                question: t("faq.optimizations.itemTwo.question"),
                answer: t("faq.optimizations.itemTwo.answer"),
            },
            {
                question: t("faq.optimizations.itemThree.question"),
                answer: t("faq.optimizations.itemThree.answer"),
            },
            {
                question: t("faq.optimizations.itemFour.question"),
                answer: t("faq.optimizations.itemFour.answer"),
            },
            {
                question: t("faq.optimizations.itemFive.question"),
                answer: t("faq.optimizations.itemFive.answer"),
            },
        ],
        emailTemplates: [
            {
                question: t("faq.emailTemplates.itemOne.question"),
                answer: t("faq.emailTemplates.itemOne.answer"),
            },
            {
                question: t("faq.emailTemplates.itemTwo.question"),
                answer: t("faq.emailTemplates.itemTwo.answer"),
            },
            {
                question: t("faq.emailTemplates.itemThree.question"),
                answer: t("faq.emailTemplates.itemThree.answer"),
            },
            {
                question: t("faq.emailTemplates.itemFour.question"),
                answer: t("faq.emailTemplates.itemFour.answer"),
            },
            {
                question: t("faq.emailTemplates.itemFive.question"),
                answer: t("faq.emailTemplates.itemFive.answer"),
            },
        ],
    };

    const toggleAnswer = (categoryKey, itemIndex) => {
        const itemId = `${categoryKey}-${itemIndex}`;

        if (openItem === itemId) {
            setOpenItem(null);
        } else {
            setOpenItem(itemId);
        }
    };

    const scrollToCategory = (categoryKey) => {
        const element = document.getElementById(`category-${categoryKey}`);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>{t("faq.title")}</h1>
                <h2>{t("faq.intro")}</h2>
            </section>

            <section className={faqStyles.faqOverview}>
                <div className={faqStyles.faqNavigation}>
                    {Object.keys(faqCategories).map((categoryKey) => (
                        <button
                            key={categoryKey}
                            onClick={() => scrollToCategory(categoryKey)}
                        >
                            {t(`faq.categories.${categoryKey}`)}
                        </button>
                    ))}
                </div>

                <div className={faqStyles.faqContainer}>
                    {Object.entries(faqCategories).map(
                        ([categoryKey, items]) => (
                            <div
                                key={categoryKey}
                                id={`category-${categoryKey}`}
                            >
                                <div className={faqStyles.faqCategory}>
                                    <h3>
                                        {t(`faq.categories.${categoryKey}`)}
                                    </h3>
                                </div>

                                <div className={faqStyles.faqCategoryItems}>
                                    {items.map((item, idx) => {
                                        const itemId = `${categoryKey}-${idx}`;
                                        const isOpen = openItem === itemId;

                                        return (
                                            <div
                                                key={idx}
                                                className={faqStyles.faqItem}
                                            >
                                                <button
                                                    onClick={() =>
                                                        toggleAnswer(
                                                            categoryKey,
                                                            idx
                                                        )
                                                    }
                                                    aria-expanded={isOpen}
                                                    className={
                                                        faqStyles.faqQuestion
                                                    }
                                                >
                                                    <h4 className="faq-tracking">
                                                        {item.question}
                                                    </h4>
                                                </button>
                                                <div
                                                    className={`${
                                                        faqStyles.faqAnswer
                                                    } ${
                                                        isOpen
                                                            ? faqStyles.open
                                                            : ""
                                                    }`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fas",
                                                            "right-long",
                                                        ]}
                                                        size="lg"
                                                    />
                                                    <p>
                                                        {item.answer}
                                                        {item.link && (
                                                            <>
                                                                {" "}
                                                                {t(
                                                                    "faq.priceText"
                                                                )}{" "}
                                                                <Link
                                                                    to={
                                                                        item.link
                                                                    }
                                                                >
                                                                    {t(
                                                                        "faq.priceLink"
                                                                    )}
                                                                </Link>
                                                                .
                                                            </>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default FaqPage;

export const Head = () => {
    const { siteUrl } = useSiteMetadata();

    const pageTitle = "FAQ";
    const pageSlug = "/faq/";

    const generateFaqSchema = () => {
        const allFaqs = [];

        const categories = [
            "websites",
            "webapps",
            "webshops",
            "seo",
            "maintenance",
            "optimizations",
            "emailTemplates",
        ];

        categories.forEach((category) => {
            ["itemOne", "itemTwo", "itemThree", "itemFour", "itemFive"].forEach(
                (item) => {
                    const faqItem = nlTranslations.faq[category]?.[item];
                    if (faqItem) {
                        allFaqs.push({
                            question: faqItem.question,
                            answer: faqItem.answer,
                        });
                    }
                }
            );
        });

        return allFaqs;
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        name: pageTitle,
        mainEntity: generateFaqSchema().map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

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

    return (
        <SEO
            title={pageTitle}
            description="Heb je een vraag? Wij hebben waarschijnlijk het antwoord! Hieronder vind je de meest gestelde vragen over onze diensten, processen en meer. Staat je vraag er niet bij? Neem dan gerust contact met ons op."
            keywords="FAQ, veelgestelde vragen, diensten, processen, contact"
            pathname={pageSlug}
            schemaMarkup={[breadcrumbSchema, faqSchema]}
        />
    );
};
