import React, { useState, useEffect, useCallback } from "react";

import { navigate } from "gatsby";
import axios from "axios";

import useTranslation from "../../hooks/use-translation";

import * as callStyles from "../../styles/modules/forms/callForm.module.scss";

// TODO: klaar voor TS'en..

const Call = ({ callRef }) => {
    const { t, isHydrated } = useTranslation();

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
        tijdstip: "",
        text: "",
    });

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
        (event) => {
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();

            axios({
                url: "/.netlify/functions/sendmail",
                method: "POST",
                data: {
                    ...inputs,
                    formId: "callForm",
                },
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
                onChange={handleChange}
                required
            />

            <label htmlFor="call_time">
                <span>*</span> {t("prices.form.selectTime")}
            </label>
            <select
                required
                name="tijdstip"
                id="call_time"
                value={inputs.tijdstip}
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
                name="text"
                id="call_text"
                rows="6"
                value={inputs.text}
                onChange={handleChange}
            />

            <button type="submit">{t("prices.form.callMeBack")}</button>
        </form>
    );
};

export default Call;
