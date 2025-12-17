import React, { useState, useEffect, useCallback } from "react";

import { navigate } from "gatsby";

import axios from "axios";

import useTranslation from "../../hooks/use-translation";

import * as callStyles from "../../styles/modules/forms/callForm.module.scss";

// TODO: klaar voor TS'en..

const RECAPTCHA_SITE_KEY = process.env.GATSBY_RECAPTCHA_SITE_KEY;

const Call = ({ callRef }) => {
    const { t, isHydrated } = useTranslation();
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    const [options, setOptions] = useState([
        {
            display: `10:00 - 10:30`,
            hour: 10,
        },
        {
            display: "11:00 - 11:30",
            hour: 11,
        },
        {
            display: "12:00 - 12:30",
            hour: 12,
        },
        {
            display: "13:00 - 13:30",
            hour: 13,
        },
        {
            display: "14:00 - 14:30",
            hour: 14,
        },
        {
            display: "15:00 - 15:30",
            hour: 15,
        },
        {
            display: "16:00 - 16:30",
            hour: 16,
        },
        {
            display: "17:00 - 17:30",
            hour: 17,
        },
    ]);

    const [inputs, setInputs] = useState({
        name: "",
        tel: "",
        time: "",
        message: "",
    });

    useEffect(() => {
        if (typeof window === "undefined" || recaptchaLoaded) return;

        if (window.grecaptcha) {
            setRecaptchaLoaded(true);
            return;
        }

        const existingScript = document.querySelector(
            `script[src*="google.com/recaptcha/api.js"]`
        );
        if (existingScript) {
            existingScript.addEventListener("load", () => {
                setRecaptchaLoaded(true);
            });
            return;
        }

        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.addEventListener("load", () => {
            setRecaptchaLoaded(true);
        });
        document.body.appendChild(script);
    }, [recaptchaLoaded]);

    useEffect(() => {
        if (!isHydrated) return;

        const now = new Date();
        const currentHour = now.getHours();

        const updatedOptions = options.map((slot) => {
            const timePart = slot.display.replace(
                /^(Vandaag tussen|Morgen tussen|Today between|Tomorrow between)\s*/,
                ""
            );

            const dayPrefix =
                currentHour >= slot.hour
                    ? t("prices.form.tomorrow")
                    : t("prices.form.today");

            return {
                ...slot,
                display: `${dayPrefix} ${timePart}`,
            };
        });

        setOptions(updatedOptions);
    }, [isHydrated, t]);

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
                        action: "callFormSubmit",
                    }
                );

                await axios({
                    url: "/.netlify/functions/sendmail",
                    method: "POST",
                    data: {
                        ...inputs,
                        formId: "callForm",
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
        <form
            onSubmit={handleSubmit}
            className={callStyles.callForm}
            action="/success/"
            id="call-form"
        >
            <h3>{t("prices.form.title")}</h3>
            <hr />

            <label htmlFor="call_name">
                <span>*</span> {t("prices.form.name")}
            </label>
            <input
                type="text"
                name="name"
                id="call_name"
                value={inputs.name}
                autoComplete="name"
                onChange={handleChange}
                ref={callRef}
                required
            />

            <label htmlFor="call_tel">
                <span>*</span> {t("prices.form.phone")}
            </label>
            <input
                type="tel"
                name="tel"
                id="call_tel"
                value={inputs.tel}
                autoComplete="tel"
                onChange={handleChange}
                required
            />

            <label htmlFor="call_time">
                <span>*</span> {t("prices.form.selectTime")}
            </label>
            <select
                required
                name="time"
                id="call_time"
                value={inputs.time}
                onChange={handleChange}
                multiple={false}
            >
                <option value="" disabled>
                    {t("prices.form.chooseDay")}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.display}>
                        {option.display}
                    </option>
                ))}
            </select>

            <label htmlFor="call_text">
                <span>*</span> {t("prices.form.comments")}
            </label>
            <textarea
                type="text"
                name="message"
                id="call_text"
                rows="6"
                value={inputs.message}
                onChange={handleChange}
            />

            <small
                dangerouslySetInnerHTML={{
                    __html: t("recaptcha.info"),
                }}
            />

            <button type="submit" disabled={!recaptchaLoaded}>
                {t("prices.form.callMeBack")}
            </button>
        </form>
    );
};

export default Call;
