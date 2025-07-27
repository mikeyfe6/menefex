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
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqData = [
        {
            question: t("faq.itemOne.question"),
            answer: t("faq.itemOne.answer"),
        },
        {
            question: t("faq.itemTwo.question"),
            answer: t("faq.itemTwo.answer"),
        },
        {
            question: t("faq.itemThree.question"),
            answer: t("faq.itemThree.answer"),
            link: "/prijzen/",
        },
        {
            question: t("faq.itemFour.question"),
            answer: t("faq.itemFour.answer"),
        },
        {
            question: t("faq.itemFive.question"),
            answer: t("faq.itemFive.answer"),
        },
        {
            question: t("faq.itemSix.question"),
            answer: t("faq.itemSix.answer"),
        },
        {
            question: t("faq.itemSeven.question"),
            answer: t("faq.itemSeven.answer"),
        },
        {
            question: t("faq.itemEight.question"),
            answer: t("faq.itemEight.answer"),
        },
        {
            question: t("faq.itemNine.question"),
            answer: t("faq.itemNine.answer"),
        },
        {
            question: t("faq.itemTen.question"),
            answer: t("faq.itemTen.answer"),
        },
    ];

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>
                    {t("faq.title")}
                    <span>.</span>
                </h1>

                <h2>{t("faq.intro")}</h2>
            </section>
            <section className={faqStyles.faqOverview}>
                <div className={faqStyles.faqContainer}>
                    {faqData.map((item, idx) => (
                        <div key={idx} className={faqStyles.faqItem}>
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === idx ? null : idx)
                                }
                                aria-expanded={openIndex === idx}
                                className={faqStyles.faqQuestion}
                            >
                                <h3>{item.question}</h3>
                            </button>
                            <div
                                className={`${faqStyles.faqAnswer} ${
                                    openIndex === idx ? faqStyles.open : ""
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={["fas", "right-long"]}
                                    size="lg"
                                />
                                <p>
                                    {item.answer}{" "}
                                    {item.link && (
                                        <>
                                            {t("faq.priceText")}{" "}
                                            <Link to={item.link}>
                                                {t("faq.priceLink")}
                                            </Link>
                                            .
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
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
