import * as React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../hooks/use-translation";
import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as faqStyles from "../styles/modules/pages/faq.module.scss";

const FaqPage = () => {
    const { t, isHydrated } = useTranslation();
    const [openItem, setOpenItem] = React.useState(null);

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
                                    <h2>
                                        {t(`faq.categories.${categoryKey}`)}
                                    </h2>
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
                                                    <h3>{item.question}</h3>
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fas",
                                                            isOpen
                                                                ? "chevron-up"
                                                                : "chevron-down",
                                                        ]}
                                                    />
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

    const faqSchemaData = [
        {
            question: "Wat heb ik nodig om een website te laten maken?",
            answer: "Helemaal niks ingewikkelds. Tijdens een gratis kennismaking bespreken we samen je wensen, doelen en ideeën. Daarna regelen wij de rest.",
        },
        {
            question: "Hoe lang duurt het voordat mijn website online staat?",
            answer: "Gemiddeld tussen de 2 en 4 weken, afhankelijk van de complexiteit. Voor uitgebreidere projecten zoals een webshop kan dit oplopen tot 6 à 8 weken. We bepalen samen een realistische planning die past bij jouw wensen.",
        },
        {
            question: "Wat kost het om een website te laten maken?",
            answer: "Dat hangt af van wat je nodig hebt. Maar: de kennismaking én offerte zijn helemaal kosteloos en vrijblijvend.",
        },
        {
            question: "Moet ik zelf teksten en afbeeldingen aanleveren?",
            answer: "Ja, je levert zelf de teksten en afbeeldingen aan. Wij focussen op de technische realisatie van de website – je eigen content en tevens design zijn dus nodig om te kunnen starten.",
        },
        {
            question: "Wordt mijn website goed vindbaar in Google?",
            answer: "Zeker! We bouwen je site SEO-vriendelijk op, met de juiste techniek én basisoptimalisatie.",
        },
        {
            question: "Kan ik straks zelf aanpassingen doen aan mijn website?",
            answer: "Ja. Je krijgt toegang tot een gebruiksvriendelijk CMS waarmee je zelf eenvoudig teksten en afbeeldingen kunt aanpassen. Liever uitbesteden? Dan kunnen wij het contentbeheer ook voor je verzorgen.",
        },
        {
            question:
                "Bieden jullie ook onderhoud en support aan na oplevering?",
            answer: "Absoluut. We bieden onderhoudspakketten aan, of je kunt losse support afnemen wanneer nodig.",
        },
        {
            question: "Kan ik ook een webshop of boekingsfunctie laten bouwen?",
            answer: "Yes. Of je nu iets wilt verkopen, reserveringen wil laten maken of iets op maat nodig hebt – we denken met je mee.",
        },
        {
            question: "Wat als ik nog helemaal geen idee heb wat ik wil?",
            answer: "Geen probleem. We starten met een brainstorm, kijken wat bij jou past en bouwen van daaruit verder.",
        },
        {
            question: "Is het eerste gesprek echt gratis?",
            answer: "Ja zeker. Geen addertjes, geen verplichtingen. Gewoon even kennismaken en kijken of we een match zijn.",
        },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSchemaData.map((faq) => ({
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
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "FAQ (Veelgestelde vragen)",
                item: siteUrl + "/faq/",
            },
        ],
    };

    return (
        <SEO
            title="FAQ"
            description="Heeft u een vraag? Wij hebben waarschijnlijk het antwoord! Hieronder vindt u de meest gestelde vragen over onze diensten, processen en meer. Staat uw vraag er niet bij? Neem dan gerust contact met ons op."
            keywords=""
            pathname="/faq/"
            schemaMarkup={[breadcrumbSchema, faqSchema]}
        />
    );
};
