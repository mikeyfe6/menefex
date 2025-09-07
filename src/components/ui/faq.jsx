import * as React from "react";

import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";

import { StaticImage } from "gatsby-plugin-image";

import * as faqStyles from "../../styles/modules/ui/faq.module.scss";

const Faq = () => {
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
        <section id="faq">
            <div className={faqStyles.faqContainer}>
                <div>
                    <div className={faqStyles.faqImage}>
                        <StaticImage
                            src="../../images/michaelfransman.jpeg"
                            alt="Michael Fransman"
                            objectFit="contain"
                            objectPosition="50% 50%"
                            quality={100}
                        />
                    </div>
                    <div className={faqStyles.faqContent}>
                        <span>
                            <h3>{t("faq.title")}</h3>
                            <Link to="/faq/">{t("faq.seeAll")}</Link>
                        </span>
                        {faqData.map((item, idx) => (
                            <div key={idx} className={faqStyles.faqItem}>
                                <button
                                    onClick={() =>
                                        setOpenIndex(
                                            openIndex === idx ? null : idx
                                        )
                                    }
                                    aria-expanded={openIndex === idx}
                                    className={faqStyles.faqQuestion}
                                    data-faq-question={item.question}
                                >
                                    <h4>{item.question}</h4>
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
                </div>
            </div>
        </section>
    );
};

export default Faq;
