import React, { useState, useEffect, useRef } from "react";

import { Link } from "gatsby";
import axios from "axios";

import useTranslation from "../../hooks/use-translation";

import * as smartFormStyles from "../../styles/modules/forms/smartForm.module.scss";

const SmartForm = () => {
    const { t, isHydrated } = useTranslation();
    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [success, setSuccess] = useState(false);

    const flow = [
        {
            id: "need",
            type: "select",
            options: [
                { value: "website", label: t("smartform.options.website") },
                { value: "webshop", label: t("smartform.options.webshop") },
                { value: "webapp", label: t("smartform.options.webapp") },
                { value: "seo", label: t("smartform.options.seo") },
                { value: "other", label: t("smartform.options.other") },
            ],
        },
        {
            id: "hasWebsite",
            type: "radio",
            dependsOn: {
                id: "need",
                value: ["website", "webshop", "webapp"],
            },
        },
        {
            id: "websiteUrl",
            type: "url",
            name: "website-url",
            autoComplete: "url",
            placeholder: t("smartform.placeholder.websiteUrl"),

            dependsOn: [
                { id: "hasWebsite", value: ["yes"] },
                { id: "need", value: ["seo"] },
            ],
        },
        {
            id: "selfManage",
            type: "radio",
            dependsOn: { id: "need", value: ["website", "webshop", "webapp"] },
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
                value: ["website", "webshop", "webapp"],
            },
        },
        {
            id: "name",
            type: "text",
            name: "full-name",
            autoComplete: "name",
            placeholder: t("smartform.placeholder.name"),
        },
        {
            id: "email",
            type: "text",
            name: "email",
            autoComplete: "email",
            placeholder: t("smartform.placeholder.email"),
        },
        {
            id: "phone",
            type: "tel",
            name: "phone",
            autoComplete: "tel",
            placeholder: t("smartform.placeholder.phone"),
            optional: true,
        },
        {
            id: "message",
            type: "textarea",
            name: "message",
            autoComplete: "off",
            placeholder: t("smartform.placeholder.message"),
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
                            <option value="">
                                {t("smartform.options.choose")}
                            </option>
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
                        {["yes", "no"].map((opt) => (
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
                                    {t(`smartform.label.${opt}`)}
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
                            autoComplete={question.autoComplete}
                            placeholder={question.placeholder}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    const isVisible = (q) => {
        if (!q.dependsOn) return true;
        if (Array.isArray(q.dependsOn)) {
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
        if (id === "need") return t("smartform.questions.need");
        if (id === "hasWebsite") {
            if (!need) return t("smartform.questions.hasWebsite.default");
            if (need === "website" || need === "SEO")
                return t("smartform.questions.hasWebsite.website");
            if (need === "webshop")
                return t("smartform.questions.hasWebsite.webshop");
            if (need === "webapp")
                return t("smartform.questions.hasWebsite.webapp");
        }
        if (id === "websiteUrl") {
            if (!need) return t("smartform.questions.websiteUrl.default");
            if (need === "website" || need === "SEO")
                return t("smartform.questions.websiteUrl.website");
            if (need === "webshop")
                return t("smartform.questions.websiteUrl.webshop");
            if (need === "webapp")
                return t("smartform.questions.websiteUrl.webapp");
            return t("smartform.questions.websiteUrl.default");
        }
        if (id === "selfManage") {
            if (!need) return t("smartform.questions.selfManage.default");
            if (need === "website")
                return t("smartform.questions.selfManage.website");
            if (need === "webshop")
                return t("smartform.questions.selfManage.webshop");
            if (need === "webapp")
                return t("smartform.questions.selfManage.webapp");
        }
        if (id === "budget") return t("smartform.questions.budget");
        if (id === "name") return t("smartform.questions.name");
        if (id === "email") return t("smartform.questions.email");
        if (id === "phone") return t("smartform.questions.phone");
        if (id === "message") return t("smartform.questions.message");
        return "";
    };

    const getRadioLabel = (value) => t(`smartform.label.${value}`);

    const getOptionLabel = (question, value) => {
        const found = question.options?.find((opt) => opt.value === value);
        return found ? found.label : value;
    };

    const getAdvice = (answers) => {
        let hourCosts = "";
        if (answers.selfManage === "no") {
            hourCosts = t("smartform.hourCosts");
        }

        // Special case: Webshop + low budget
        if (
            answers.need === "webshop" &&
            (answers.budget === "< €500" || answers.budget === "€500 - €1000")
        ) {
            return {
                title: t("smartform.advice.businessPlan.title"),
                description: t("smartform.advice.webshopLowBudget.description"),
                extra: t("smartform.advice.webshopLowBudget.extra"),
                cta: t("smartform.advice.cta.requestQuote"),
                price: "€1595",
                hourCosts,
            };
        }

        // Always show Business Plan for Webshop
        if (answers.need === "webshop") {
            return {
                title: t("smartform.advice.businessPlan.title"),
                description: t("smartform.advice.webshopAlwaysBusinessPlan"),
                cta: t("smartform.advice.cta.requestQuote"),
                price: "€1595",
                hourCosts,
            };
        }

        // Always show hourly rate for SEO
        if (answers.need === "seo") {
            return {
                title: t("smartform.advice.seo.title"),
                description: t("smartform.advice.seo.description"),
                cta: t("smartform.advice.cta.requestQuote"),
                price: t("smartform.advice.seo.price"),
            };
        }

        if (answers.need === "other") {
            return {
                title: t("smartform.advice.other.title"),
                description: t("smartform.advice.other.description"),
                cta: t("smartform.advice.cta.contactRequest"),
            };
        }

        switch (answers.budget) {
            case "< €500":
                return {
                    title: t("smartform.advice.budgetPlan.title"),
                    description: t("smartform.advice.budgetPlan.description"),
                    cta: t("smartform.advice.cta.requestQuote"),
                    price: "€295",
                    hourCosts,
                };
            case "€500 - €1000":
                return {
                    title: t("smartform.advice.starterPlan.title"),
                    description: t("smartform.advice.starterPlan.description"),
                    cta: t("smartform.advice.cta.requestQuote"),
                    price: "€595",
                    hourCosts,
                };
            case "€1000 - €2500":
                return {
                    title: t("smartform.advice.establishedPlan.title"),
                    description: t(
                        "smartform.advice.establishedPlan.description"
                    ),
                    cta: t("smartform.advice.cta.requestQuote"),
                    price: "€1025",
                    hourCosts,
                };
            case "€2500 >":
                return {
                    title: t("smartform.advice.businessPlan.title"),
                    description: t("smartform.advice.businessPlan.description"),
                    cta: t("smartform.advice.cta.requestQuote"),
                    price: "€1575",
                    hourCosts,
                };
            default:
                return {
                    title: t("smartform.advice.default.title"),
                    description: t("smartform.advice.default.description"),
                    cta: t("smartform.advice.cta.requestQuote"),
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
            setSuccess(true);
        } catch (error) {
            alert("Er ging iets mis bij het versturen. Probeer het opnieuw.");
            console.error(error);
        }
    };

    const handleReset = () => {
        setAnswers({});
        setCurrentStep(0);
        setSuccess(false);
    };

    return (
        <section>
            <div className={smartFormStyles.smartFormContainer}>
                <div className={smartFormStyles.smartFormWrapper}>
                    <div className={smartFormStyles.smartFormContent}>
                        <h3>{t("smartform.title")}</h3>
                        <p>{t("smartform.subtitle")}</p>
                        <ul>
                            {visibleFlow.slice(0, currentStep).map((q, idx) =>
                                answers[q.id] ? (
                                    <li key={q.id}>
                                        <small>
                                            {getDynamicQuestion(
                                                q.id,
                                                answers["need"]
                                            )}
                                            :{" "}
                                            <strong>
                                                {q.type === "radio"
                                                    ? getRadioLabel(
                                                          answers[q.id]
                                                      )
                                                    : getOptionLabel(
                                                          q,
                                                          answers[q.id]
                                                      )}
                                            </strong>
                                            {!success && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setCurrentStep(idx)
                                                    }
                                                >
                                                    <i className="fa-regular fa-pen-to-square fa-sm"></i>
                                                </button>
                                            )}
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
                    <form id="smart-form" onSubmit={handleSubmit}>
                        {success ? (
                            <div className={smartFormStyles.smartFormSuccess}>
                                <h4>{t("smartform.success.title")}</h4>
                                <p>{t("smartform.success.subtitle")}</p>
                                <button type="button" onClick={handleReset}>
                                    {t("smartform.restart")}{" "}
                                    <i className="fa-solid fa-rotate-left fa-xs"></i>
                                </button>
                            </div>
                        ) : isAdviceStep ? (
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
                                                {t("smartform.prices")}{" "}
                                                <i className="fa-solid fa-arrow-right-long fa-sm"></i>
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={handleReset}
                                            >
                                                {t("smartform.restart")}{" "}
                                                <i className="fa-solid fa-rotate-left fa-xs"></i>
                                            </button>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                >
                                                    {t("smartform.back")}
                                                </button>
                                                <button type="submit">
                                                    {getAdvice(answers).cta}
                                                </button>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        ) : (
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
                                <div
                                    className={smartFormStyles.smartFormButtons}
                                >
                                    {currentStep > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                        >
                                            {t("smartform.back")}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                inputValue ||
                                                currentQuestion.optional
                                            ) {
                                                handleNext();
                                            }
                                        }}
                                    >
                                        {t("smartform.next")}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SmartForm;
