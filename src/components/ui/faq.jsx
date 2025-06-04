import * as React from "react";
import useTranslation from "../../hooks/use-translation";

import * as faqStyles from "../../styles/modules/ui/faq.module.scss";

const faqData = [
    {
        question: "How do I contact support?",
        answer: "You can contact support via the contact form on our website or by emailing support@example.com.",
    },
    {
        question: "Can I change my account details?",
        answer: "Yes, you can update your account details in your profile settings after logging in.",
    },
    {
        question: "Is my data secure?",
        answer: "We use industry-standard security measures to protect your data at all times.",
    },
];

const Faq = () => {
    const { t, isHydrated } = useTranslation();
    const [openIndex, setOpenIndex] = React.useState(null);

    if (!isHydrated) return null;

    return (
        <section className={faqStyles.faq} id="faq">
            <div className={faqStyles.faqContainer}>
                <h2>FAQ</h2>
                <div>
                    {faqData.map((item, idx) => (
                        <div key={idx}>
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === idx ? null : idx)
                                }
                                aria-expanded={openIndex === idx}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    margin: "1rem 0 0.5rem 0",
                                    cursor: "pointer",
                                }}
                            >
                                {item.question}
                            </button>
                            {openIndex === idx && (
                                <div style={{ marginBottom: "1rem" }}>
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
