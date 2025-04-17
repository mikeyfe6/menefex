import React, { useEffect, useState, useCallback } from "react";

import { navigate } from "gatsby";
import axios from "axios";

import useTranslation from "../hooks/use-translation";

import * as leadStyles from "../styles/modules/leadForm.module.scss";

const Form = () => {
    const { t, isHydrated } = useTranslation();

    const [inputs, setInputs] = useState({
        name: "",
        company: "",
        email: "",
        tel: "",
        subject: "Ik wil een offerte aanvragen",
        text: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (sessionStorage.getItem("mnfx") !== null) {
                const mnfxPrice = sessionStorage.getItem("mnfx");
                setInputs({ text: mnfxPrice });

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
        (event) => {
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();

            axios({
                url: "/.netlify/functions/sendmail",
                method: "POST",
                data: inputs,
            })
                .then(() => navigate(form.getAttribute("action")))
                .catch((error) => console.log("POST ERROR", error));
        },

        [inputs]
    );

    if (!isHydrated) return null;

    return (
        <form
            onSubmit={handleSubmit}
            className={leadStyles.leadForm}
            action="/success/"
        >
            <label htmlFor="lead_name">
                <span>*</span> {t("contactFormName")}
            </label>
            <input
                type="text"
                name="name"
                id="lead_name"
                value={inputs.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="lead_company">
                <span>*</span> {t("contactFormCompany")}
            </label>
            <input
                type="text"
                name="company"
                id="lead_company"
                value={inputs.company}
                onChange={handleChange}
            />

            <label htmlFor="lead_email">
                <span>*</span> E-mail
            </label>
            <input
                type="email"
                name="email"
                id="lead_email"
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={inputs.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="lead_tel">
                <span>*</span> {t("contactFormPhone")}
            </label>
            <input
                type="tel"
                name="tel"
                id="lead_tel"
                // pattern="^\+?\d*$"
                value={inputs.tel}
                onChange={handleChange}
                required
            />

            <label htmlFor="lead_subject">
                <span>*</span> {t("contactFormSubject")}
            </label>
            <select
                name="subject"
                id="lead_subject"
                value={inputs.subject}
                onChange={handleChange}
                required
            >
                <option value="Ik wil een offerte aanvragen">
                    {t("contactFormSubjectQuote")}
                </option>
                <option value="Ik wil een samenwerking aangaan">
                    {t("contactFormSubjectCollab")}
                </option>
                <option value="Ik heb een vraag of opmerking">
                    {t("contactFormSubjectQuestion")}
                </option>
                <option value="Ik wil graag feedback geven">
                    {t("contactFormSubjectComplaint")}
                </option>
                <option value="Ik wil graag hulp of ondersteuning">
                    {t("contactFormSubjectHelp")}
                </option>
            </select>

            <label htmlFor="lead_text">
                <span>*</span> {t("contactFormMessage")}
            </label>
            <textarea
                type="text"
                name="text"
                id="lead_text"
                rows="6"
                value={inputs.text}
                onChange={handleChange}
                required
            />

            <button type="submit">{t("contactFormSend")}</button>
        </form>
    );
};

export default Form;
