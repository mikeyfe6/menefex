import React, { useEffect, useState, useCallback } from "react";

import { navigate } from "gatsby";

import axios from "axios";

import useTranslation from "../../hooks/use-translation";

// TODO: klaar voor TS'en..

const RECAPTCHA_SITE_KEY = process.env.GATSBY_RECAPTCHA_SITE_KEY;

const Form = () => {
    const { t, isHydrated } = useTranslation();
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    const [inputs, setInputs] = useState({
        name: "",
        company: "",
        email: "",
        tel: "",
        subject: "Ik wil een offerte aanvragen",
        message: "",
    });

    useEffect(() => {
        if (typeof window === "undefined" || recaptchaLoaded) return;

        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.addEventListener("load", () => {
            setRecaptchaLoaded(true);
        });
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [recaptchaLoaded]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (sessionStorage.getItem("mnfx") !== null) {
                const mnfxPrice = sessionStorage.getItem("mnfx");
                setInputs({ message: mnfxPrice });

                const removeStorage = () => {
                    setTimeout(() => sessionStorage.removeItem("mnfx"), 3000);
                };
                removeStorage();
            }
        }
    }, []);

    const handleChange = useCallback(
        (event) => {
            setInputs({
                ...inputs,
                [event.target.name]: event.target.value,
            });
        },
        [inputs]
    );

    const handleSubmit = useCallback(
        async (event) => {
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();

            if (!recaptchaLoaded || !window.grecaptcha) {
                console.error("reCAPTCHA not loaded");
                return;
            }

            try {
                const token = await window.grecaptcha.execute(
                    RECAPTCHA_SITE_KEY,
                    {
                        action: "leadFormSubmit",
                    }
                );

                await axios({
                    url: "/.netlify/functions/sendmail",
                    method: "POST",
                    data: {
                        ...inputs,
                        formId: "leadForm",
                        recaptchaToken: token,
                    },
                });

                navigate(form.getAttribute("action"));
            } catch (error) {
                console.error("POST ERROR", error);
            }
        },
        [inputs, recaptchaLoaded]
    );

    if (!isHydrated) return null;

    return (
        <form onSubmit={handleSubmit} action="/success/" id="lead-form">
            <label htmlFor="lead_name">
                <span>*</span> {t("contact.form.name")}
            </label>
            <input
                type="text"
                name="name"
                id="lead_name"
                value={inputs.name}
                onChange={handleChange}
                autoComplete="name"
                required
            />

            <label htmlFor="lead_company">
                <span>*</span> {t("contact.form.company")}
            </label>
            <input
                type="text"
                name="company"
                id="lead_company"
                value={inputs.company}
                autoComplete="organization"
                onChange={handleChange}
            />

            <label htmlFor="lead_email">
                <span>*</span> E-mail
            </label>
            <input
                type="email"
                name="email"
                id="lead_email"
                value={inputs.email}
                autoComplete="email"
                onChange={handleChange}
                required
            />

            <label htmlFor="lead_tel">
                <span>*</span> {t("contact.form.phone")}
            </label>
            <input
                type="tel"
                name="tel"
                id="lead_tel"
                value={inputs.tel}
                autoComplete="tel"
                onChange={handleChange}
                required
            />

            <label htmlFor="lead_subject">
                <span>*</span> {t("contact.form.subject.default")}
            </label>
            <select
                name="subject"
                id="lead_subject"
                value={inputs.subject}
                onChange={handleChange}
                required
            >
                <option value="Ik wil een offerte aanvragen">
                    {t("contact.form.subject.quote")}
                </option>
                <option value="Ik wil een samenwerking aangaan">
                    {t("contact.form.subject.collab")}
                </option>
                <option value="Ik heb een vraag of opmerking">
                    {t("contact.form.subject.question")}
                </option>
                <option value="Ik wil graag feedback geven">
                    {t("contact.form.subject.complaint")}
                </option>
                <option value="Ik wil graag hulp of ondersteuning">
                    {t("contact.form.subject.help")}
                </option>
            </select>

            <label htmlFor="lead_text">
                <span>*</span> {t("contact.form.message")}
            </label>
            <textarea
                type="text"
                name="message"
                id="lead_text"
                rows="6"
                value={inputs.message}
                onChange={handleChange}
                required
            />

            <small
                dangerouslySetInnerHTML={{
                    __html: t("recaptcha.info"),
                }}
            />

            <button type="submit" disabled={!recaptchaLoaded}>
                {t("contact.form.send")}
            </button>
        </form>
    );
};

export default Form;
