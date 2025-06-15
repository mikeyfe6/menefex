const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const { formId } = data;

    let dynamic_template_data = {};

    switch (formId) {
        case "leadForm":
            dynamic_template_data = {
                mnfxForm: data.formId || "n.v.t.",
                mnfxName: data.name || "n.v.t.",
                mnfxSubject: data.subject || "n.v.t.",

                mnfxCompany: data.company || "n.v.t.",
                mnfxEmail: data.email || "n.v.t.",
                mnfxPhone: data.phone || "n.v.t.",
                mnfxMessage: data.message || "n.v.t.",

                mnfxTime: data.time || "[LEADFORM]",
            };
            break;
        case "callForm":
            dynamic_template_data = {
                mnfxForm: data.formId || "n.v.t.",
                mnfxName: data.name || "n.v.t.",
                mnfxSubject: data.subject || "Terugbelverzoek",

                mnfxPhone: data.phone || "n.v.t.",
                mnfxTime: data.time || "n.v.t.",
                mnfxMessage: data.message || "n.v.t.",

                mnfxCompany: data.company || "[CALLFORM]",
                mnfxEmail: data.email || "[CALLFORM]",
            };
            break;
        case "smartForm":
            dynamic_template_data = {
                mnfxForm: data.formId || "n.v.t.",
                mnfxName: data.name || "n.v.t.",
                mnfxSubject: data.subject || "Slimme formulier",

                mnfxNeed: data.need || "n.v.t.",
                mnfxHasWebsite: data.hasWebsite || "n.v.t.",
                mnfxWebsiteUrl: data.websiteUrl || "n.v.t.",
                mnfxSelfManage: data.selfManage || "n.v.t.",
                mnfxBudget: data.budget || "n.v.t.",

                mnfxEmail: data.email || "n.v.t.",
                mnfxPhone: data.phone || "n.v.t.",
                mnfxMessage: data.message || "n.v.t.",

                mnfxCompany: data.company || "[SMARTFORM]",
                mnfxTime: data.time || "[SMARTFORM]",
            };
            break;
        default:
            dynamic_template_data = { ...data };
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

    try {
        await sgMail.send(msg);
        return { statusCode: 202, body: "Bericht verstuurd" };
    } catch (error) {
        const statusCode = typeof error.code === "number" ? error.code : 500;
        return { statusCode, body: error.message };
    }
};
