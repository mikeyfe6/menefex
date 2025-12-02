const sgMail = require("@sendgrid/mail");
const axios = require("axios");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { recaptchaToken, formId, ...formData } = JSON.parse(event.body);

    try {
        const verifyResponse = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                },
            }
        );

        const { success, score, action } = verifyResponse.data;

        const expectedActions = {
            leadForm: "leadFormSubmit",
            callForm: "callFormSubmit",
            smartForm: "smartFormSubmit",
        };

        if (!success || score < 0.5 || action !== expectedActions[formId]) {
            console.error("❌ reCAPTCHA failed:", {
                success,
                score,
                action,
                expected: expectedActions[formId],
            });
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "reCAPTCHA verification failed",
                    debug: { success, score, action },
                }),
            };
        }

        let dynamic_template_data = {};

        switch (formId) {
            case "leadForm":
                dynamic_template_data = {
                    mnfxForm: formId || "n.v.t.",
                    mnfxName: formData.name || "n.v.t.",
                    mnfxCompany: formData.company || "n.v.t.",
                    mnfxEmail: formData.email || "n.v.t.",
                    mnfxPhone: formData.tel || "n.v.t.",
                    mnfxSubject: formData.subject || "n.v.t.",
                    mnfxMessage: formData.message || "n.v.t.",
                };
                break;
            case "callForm":
                dynamic_template_data = {
                    mnfxForm: formId || "n.v.t.",
                    mnfxName: formData.name || "n.v.t.",
                    mnfxPhone: formData.tel || "n.v.t.",
                    mnfxTime: formData.time || "n.v.t.",
                    mnfxMessage: formData.message || "n.v.t.",
                };
                break;
            case "smartForm":
                dynamic_template_data = {
                    mnfxForm: formId || "n.v.t.",
                    mnfxName: formData.name || "n.v.t.",
                    mnfxNeed: formData.need || "n.v.t.",
                    mnfxHasWebsite: formData.hasWebsite || "n.v.t.",
                    mnfxWebsiteUrl: formData.websiteUrl || "n.v.t.",
                    mnfxSelfManage: formData.selfManage || "n.v.t.",
                    mnfxBudget: formData.budget || "n.v.t.",
                    mnfxEmail: formData.email || "n.v.t.",
                    mnfxPhone: formData.tel || "n.v.t.",
                    mnfxMessage: formData.message || "n.v.t.",
                };
                break;
            default:
                dynamic_template_data = { ...formData };
        }

        const msg = {
            from: {
                email: process.env.SENDGRID_AUTHORIZED_EMAIL,
                name: "Menefex WMB - [website] ✨",
            },
            templateId: "d-8eebc10097fd430787de9cd0f3db702b",
            personalizations: [
                {
                    to: "info@menefex.nl",
                    dynamic_template_data,
                },
            ],
        };

        await sgMail.send(msg);
        return { statusCode: 202, body: "Bericht verstuurd" };
    } catch (error) {
        console.error("❌ Error:", error.message);
        const statusCode = typeof error.code === "number" ? error.code : 500;
        return { statusCode, body: error.message };
    }
};
