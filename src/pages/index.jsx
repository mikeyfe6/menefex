import * as React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Hero from "../components/layout/hero";
import Biography from "../components/ui/biography";
import Actual from "../components/ui/actual";
import Services from "../components/ui/services";
import Projects from "../components/ui/projects";
import Usp from "../components/ui/usp";
import Faq from "../components/ui/faq";
import SmartForm from "../components/forms/smartForm";

import * as indexStyles from "../styles/modules/pages/index.module.scss";

// TODO: klaar voor TS'en..

const IndexPage = () => {
    return (
        <Layout>
            <Hero />

            <div className={indexStyles.verticalLineLong} />

            <Usp />

            <div className={indexStyles.verticalLineShort} />

            <Biography />

            <div className={indexStyles.verticalLineShort} />

            <Actual />

            <div className={indexStyles.verticalLineShort} />

            <Services />

            <div className={indexStyles.verticalLineShort} />

            <Projects />

            <div className={indexStyles.verticalLineShort} />

            <Faq />

            <div className={indexStyles.verticalLineShort} />

            <SmartForm />
        </Layout>
    );
};

export default IndexPage;

export const Head = () => {
    const {
        title,
        company,
        siteUrl,
        image,
        favicon,
        bizTel,
        author,
        description,
        bizEmail,
    } = useSiteMetadata();

    const faqData = [
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
        ],
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": siteUrl + "/#localbusiness",
        name: title,
        parentOrganization: {
            "@id": siteUrl + "/#organization",
        },
        image: siteUrl + image,
        logo: siteUrl + favicon,
        description: description,
        url: siteUrl,
        telephone: bizTel,
        email: bizEmail,
        hasMap: "https://g.page/MenefexWMB?share",
        areaServed: {
            "@type": "geoShape",
            addressCountry: ["Netherlands", "Belgium", "Surinam"],
        },
        priceRange: "$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Kelbergen 192",
            postalCode: "1104LJ",
            addressLocality: "Amsterdam",
            addressRegion: "Noord-Holland",
            addressCountry: "NL",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "52.31049600748774",
            longitude: "4.973736770446289",
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "19:00",
        },
        sameAs: [
            "https://www.facebook.com/MenefexWMB",
            "https://www.twitter.com/MenefexWMB",
            "https://www.instagram.com/menefexwmb/",
            "https://www.linkedin.com/company/menefexwmb/",
            "https://github.com/mikeyfe6",
            "https://www.patreon.com/menefexWMB",
            "https://feeds.feedburner.com/MenefexWMB",
            "https://wa.me/31611054318",
            "https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300",
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <>
            <SEO
                title="#1 Website Specialist"
                description="Menefex is een vooraanstaand & innovatief webmediabedrijf in Amsterdam. Wij ontwerpen, ontwikkelen en optimaliseren op maat gemaakte websites, webshops en webapplicaties. Vanaf €295,- uw digitale ambities waarmaken. Neem vandaag nog contact op!"
                keywords="website specialist, webmediabedrijf, webdesign, webdevelopment, webshop, webapplicatie, digitale ambities, contact"
                schemaMarkup={[
                    breadcrumbSchema,
                    localBusinessSchema,
                    faqSchema,
                ]}
            />
        </>
    );
};
