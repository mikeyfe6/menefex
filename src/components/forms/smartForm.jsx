import React, { useState, useEffect, useRef } from "react";

import { Link } from "gatsby";
import axios from "axios";

import useTranslation from "../../hooks/use-translation";

import * as smartFormStyles from "../../styles/modules/forms/smartForm.module.scss";

const flow = [
    {
        id: "need",
        type: "select",
        options: [
            { value: "Website", label: "Website laten maken" },
            { value: "Webshop", label: "Webshop laten maken" },
            { value: "Webapp", label: "Webapplicatie laten maken" },
            { value: "SEO", label: "Zoekmachineoptimalisatie (SEO)" },
            { value: "Other", label: "Anders / maatwerk" },
        ],
    },
    {
        id: "hasWebsite",
        type: "radio",
        dependsOn: {
            id: "need",
            value: ["Website", "Webshop", "Webapp"],
        },
    },
    {
        id: "websiteUrl",
        type: "url",
        name: "website-url",
        autoComplete: "url",
        placeholder: "bijv. https://www.jouwwebsite.nl",

        dependsOn: [
            { id: "hasWebsite", value: ["Ja"] },
            { id: "need", value: ["SEO"] },
        ],
    },
    {
        id: "selfManage",
        type: "radio",
        dependsOn: { id: "need", value: ["Website", "Webshop", "Webapp"] },
    },
    {
        id: "budget",
        type: "select",
        options: ["< €500", "€500 - €1000", "€1000 - €2500", "€2500 >"],
        options: [
            { value: "< €500", label: "< €500" },
            { value: "€500 - €1000", label: "€500 - €1000" },
            { value: "€1000 - €2500", label: "€1000 - €2500" },
            { value: "€2500 >", label: "€2500 >" },
        ],
        dependsOn: {
            id: "need",
            value: ["Website", "Webshop", "Webapp"],
        },
    },
    {
        id: "name",
        type: "text",
        name: "full-name",
        autoComplete: "name",
        placeholder: "bijv. Jan Jansen",
    },
    {
        id: "email",
        type: "text",
        name: "email",
        autoComplete: "email",
        placeholder: "bijv. jan.jansen@example.com",
    },
    {
        id: "phone",
        type: "tel",
        name: "phone",
        autoComplete: "tel",
        placeholder: "bijv. 0612345678",
        optional: true,
    },
    {
        id: "message",
        type: "textarea",
        name: "message",
        autoComplete: "off",
        placeholder: "Jouw bericht of aanvullende informatie",
        optional: true,
    },
];

const QuestionBlock = ({ question, inputValue, setInputValue }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [question?.id]);

    if (!question) return null;

    switch (question.type) {
        case "select":
            return (
                <>
                    <label htmlFor={question.id}>{question.question}</label>
                    <select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id={question.id}
                    >
                        <option value="">-- Kies --</option>
                        {question.options.map((opt, idx) => (
                            <option key={idx} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </>
            );
        case "radio":
            return (
                <>
                    <p>{question.question}</p>
                    {["Ja", "Nee"].map((opt) => (
                        <div key={opt}>
                            <label htmlFor={`${question.id}-${opt}`}>
                                <input
                                    type="radio"
                                    value={opt}
                                    checked={inputValue === opt}
                                    id={`${question.id}-${opt}`}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                />
                                <span />
                                {opt}
                            </label>
                        </div>
                    ))}
                </>
            );
        case "url":
            return (
                <>
                    <label htmlFor={question.id}>{question.question}</label>
                    <input
                        ref={inputRef}
                        type="url"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id={question.id}
                        name={question.name}
                        autoComplete={question.autoComplete}
                        placeholder={question.placeholder}
                    />
                </>
            );
        case "text":
            return (
                <>
                    <label htmlFor={question.id}>{question.question}</label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id={question.id}
                        name={question.name}
                        autoComplete={question.autoComplete}
                        placeholder={question.placeholder}
                    />
                </>
            );
        case "tel":
            return (
                <>
                    <label htmlFor={question.id}>{question.question}</label>
                    <input
                        ref={inputRef}
                        type="tel"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id={question.id}
                        name={question.name}
                        autoComplete={question.autoComplete}
                        placeholder={question.placeholder}
                    />
                </>
            );
        case "textarea":
            return (
                <>
                    <label htmlFor={question.id}>{question.question}</label>
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id={question.id}
                        name={question.name}
                        rows="4"
                        autoComplete={question.autoComplete}
                        placeholder={question.placeholder}
                    />
                </>
            );
        default:
            return null;
    }
};

const SmartForm = () => {
    const { t, isHydrated } = useTranslation();
    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);

    const isVisible = (q) => {
        if (!q.dependsOn) return true;
        if (Array.isArray(q.dependsOn)) {
            // At least one condition must match
            return q.dependsOn.some((dep) => {
                const answer = answers[dep.id];
                return dep.value.includes(answer);
            });
        } else {
            const answer = answers[q.dependsOn.id];
            return q.dependsOn.value.includes(answer);
        }
    };

    const visibleFlow = flow.filter((q) => isVisible(q));
    const currentQuestion = visibleFlow[currentStep];

    const [inputValue, setInputValue] = useState(
        answers[currentQuestion?.id] || ""
    );

    useEffect(() => {
        setInputValue(answers[currentQuestion?.id] || "");
    }, [currentQuestion?.id, answers]);

    if (!isHydrated) return null;

    const handleNext = () => {
        setAnswers((prevAnswers) => {
            const newAnswers = {
                ...prevAnswers,
                [currentQuestion.id]: inputValue,
            };
            const newVisibleFlow = flow.filter((q) => {
                if (!q.dependsOn) return true;
                if (Array.isArray(q.dependsOn)) {
                    return q.dependsOn.some((dep) => {
                        const answer = newAnswers[dep.id];
                        return dep.value.includes(answer);
                    });
                } else {
                    const answer = newAnswers[q.dependsOn.id];
                    return q.dependsOn.value.includes(answer);
                }
            });

            if (currentStep + 1 < newVisibleFlow.length) {
                setCurrentStep(currentStep + 1);
            } else {
                setCurrentStep(newVisibleFlow.length);
            }

            return newAnswers;
        });
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const getDynamicQuestion = (id, need) => {
        if (id === "need") return "Wat heb je nodig?";
        if (id === "hasWebsite") {
            if (!need) return "Heb je al een website/webshop/webapp?";
            if (need === "Website" || need === "SEO")
                return "Heb je al een website?";
            if (need === "Webshop") return "Heb je al een webshop?";
            if (need === "Webapp") return "Heb je al een webapp?";
        }
        if (id === "websiteUrl") {
            if (!need) return "Wat is de URL?";
            if (need === "Website" || need === "SEO")
                return "Wat is de URL van je website?";
            if (need === "Webshop") return "Wat is de URL van je webshop?";
            if (need === "Webapp") return "Wat is de URL van je webapp?";
            return "Wat is de URL?";
        }
        if (id === "selfManage") {
            if (!need) return "Wil je het zelf beheren?";
            if (need === "Website") return "Wil je de website zelf beheren?";
            if (need === "Webshop") return "Wil je de webshop zelf beheren?";
            if (need === "Webapp") return "Wil je de webapp zelf beheren?";
        }
        if (id === "budget") return "Heb je een idee van je budget?";
        if (id === "name") return "Wat is je naam?";
        if (id === "email") return "Wat is je e-mailadres?";
        if (id === "phone") return "Wat is je telefoonnummer? (optioneel)";
        if (id === "message")
            return "Heb je nog iets toe te voegen? (optioneel)";
        return "";
    };

    const getAdvice = (answers) => {
        let hourCosts = "";
        if (answers.selfManage === "Nee") {
            hourCosts =
                "* Het uitbesteden van contentbeheer kost €45 per uur (excl. BTW).";
        }

        // Special case: Webshop + low budget
        if (
            answers.need === "Webshop" &&
            (answers.budget === "< €500" || answers.budget === "€500 - €1000")
        ) {
            return {
                title: "Ons advies: BUSINESS PLAN",
                description:
                    "Voor een webshop adviseren we altijd ons Business Plan voor maximale schaalbaarheid en ondersteuning.",
                extra: "Je budget is iets lager dan onze pakketprijzen, maar dat hoeft geen probleem te zijn. Vraag een offerte aan, dan bekijken we samen wat haalbaar is.",
                cta: "Offerte aanvragen",
                price: "€1595",
                hourCosts,
            };
        }

        // Always show Business Plan for Webshop
        if (answers.need === "Webshop") {
            return {
                title: "Ons advies: BUSINESS PLAN",
                description:
                    "Voor een webshop adviseren we altijd ons Business Plan voor maximale schaalbaarheid en ondersteuning.",
                cta: "Offerte aanvragen",
                price: "€1595",
                hourCosts,
            };
        }

        // Always show hourly rate for SEO
        if (answers.need === "SEO") {
            return {
                title: "Ons advies: gebruikelijke uurtarief",
                description:
                    "Voor SEO en andere gerelateerde diensten hanteren we een uurtarief van €45 per uur (excl. BTW).",
                cta: "Offerte aanvragen",
                price: "€45 p/u",
            };
        }

        if (answers.need === "Other") {
            return {
                title: "Ons advies: neem contact op",
                description:
                    "Voor andere diensten of maatwerkoplossingen adviseren we om contact met ons op te nemen voor een offerte.",
                cta: "Contactverzoek",
            };
        }

        switch (answers.budget) {
            case "< €500":
                return {
                    title: "Ons advies: BUDGET PLAN",
                    description:
                        "Op basis van je input past ons 'Budget Plan' het beste bij jouw wensen.",
                    cta: "Offerte aanvragen",
                    price: "€295",
                    hourCosts,
                };
            case "€500 - €1000":
                return {
                    title: "Ons advies: STARTER PLAN",
                    description:
                        "Het 'Starter Plan' biedt meer mogelijkheden en flexibiliteit.",
                    cta: "Offerte aanvragen",
                    price: "€595",
                    hourCosts,
                };
            case "€1000 - €2500":
                return {
                    title: "Ons advies: ESTABLISHED PLAN",
                    description:
                        "Voor uitgebreide wensen adviseren we het 'Established Plan'.",
                    cta: "Offerte aanvragen",
                    price: "€1025",
                    hourCosts,
                };
            case "€2500 >":
                return {
                    title: "Ons advies: BUSINESS PLAN",
                    description:
                        "Voor grote projecten bieden we een maatwerkoplossing.",
                    cta: "Offerte aanvragen",
                    price: "€1595",
                    hourCosts,
                };
            default:
                return {
                    title: "Advies",
                    description:
                        "Vul je budget in om een passend advies te ontvangen.",
                    cta: "Offerte aanvragen",
                    hourCosts,
                };
        }
    };

    const isAdviceStep = currentStep >= visibleFlow.length;

    const progress =
        visibleFlow.length > 0
            ? Math.min(currentStep / visibleFlow.length, 1)
            : 0;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios({
                url: "/.netlify/functions/sendmail",
                method: "POST",
                data: {
                    ...answers,
                    formId: "smartForm",
                },
            });
            alert("Bedankt! Je aanvraag is verstuurd.");
            handleReset();
        } catch (error) {
            alert("Er ging iets mis bij het versturen. Probeer het opnieuw.");
            console.error(error);
        }
    };

    const handleReset = () => {
        setAnswers({});
        setCurrentStep(0);
    };

    return (
        <section>
            <div className={smartFormStyles.smartFormContainer}>
                <div className={smartFormStyles.smartFormWrapper}>
                    <div className={smartFormStyles.smartFormContent}>
                        <h3>Benieuwd wat wij kunnen betekenen!</h3>
                        <p>
                            Vertel ons kort wat je zoekt door een aantal vragen
                            te beantwoorden, dan helpen we je snel verder.
                        </p>
                        <ul>
                            {visibleFlow.slice(0, currentStep).map((q, idx) =>
                                answers[q.id] ? (
                                    <li key={q.id}>
                                        <small>
                                            {getDynamicQuestion(
                                                q.id,
                                                answers["need"]
                                            )}
                                            : <strong>{answers[q.id]}</strong>{" "}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setCurrentStep(idx)
                                                }
                                            >
                                                <i class="fa-regular fa-pen-to-square fa-sm"></i>
                                            </button>
                                        </small>
                                    </li>
                                ) : null
                            )}
                        </ul>
                        {progress > 0 && (
                            <div className={smartFormStyles.smartFormProgress}>
                                <div
                                    style={{
                                        width: `${progress * 100}%`,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    {isAdviceStep ? (
                        <div className={smartFormStyles.smartFormAdvice}>
                            {(() => {
                                const advice = getAdvice(answers);
                                return (
                                    <>
                                        <h4>
                                            {advice.title}{" "}
                                            {advice.price && (
                                                <span>{advice.price}</span>
                                            )}
                                        </h4>
                                        <p>{advice.description}</p>
                                        {advice.hourCosts && (
                                            <em>{advice.hourCosts}</em>
                                        )}
                                        {advice.extra && (
                                            <span>{advice.extra}</span>
                                        )}
                                        <Link to="/prijzen/">
                                            Zie onze prijspakketten{" "}
                                            <i class="fa-solid fa-arrow-right-long fa-sm"></i>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={handleReset}
                                        >
                                            Opnieuw beginnen{" "}
                                            <i class="fa-solid fa-rotate-left fa-xs"></i>
                                        </button>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                            >
                                                Terug
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                type="submit"
                                                form="smart-form"
                                            >
                                                {advice.cta}
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleNext();
                            }}
                            id="smart-form"
                        >
                            <div className={smartFormStyles.smartFormQuestion}>
                                <QuestionBlock
                                    question={{
                                        ...currentQuestion,
                                        question:
                                            getDynamicQuestion(
                                                currentQuestion.id,
                                                answers["need"]
                                            ) || currentQuestion.question,
                                    }}
                                    inputValue={inputValue}
                                    setInputValue={setInputValue}
                                />
                            </div>

                            <div className={smartFormStyles.smartFormButtons}>
                                {currentStep > 0 && (
                                    <button type="button" onClick={handleBack}>
                                        Terug
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={
                                        !inputValue && !currentQuestion.optional
                                    }
                                >
                                    Volgende
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SmartForm;
