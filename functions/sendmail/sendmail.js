const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const { formId } = data;

    let dynamic_template_data = {};

    switch (formId) {
        case "leadForm":
            dynamic_template_data = {
                mfxName: data.name || "n.v.t.",
                mfxCompany: data.company || "n.v.t.",
                mfxEmail: data.email || "n.v.t.",
                mfxTel: data.tel || "n.v.t.",
                mfxSubject: data.subject || "n.v.t.",
                mfxText: data.text || "n.v.t.",
            };
            break;
        case "callForm":
            dynamic_template_data = {
                mfxName: data.name || "n.v.t.",
                mfxTel: data.tel || "n.v.t.",
                mfxTijdstip: data.tijdstip || "n.v.t.",
                mfxText: data.text || "n.v.t.",
                mfxSubject: data.subject || "n.v.t.",
            };
            break;
        case "smartForm":
            dynamic_template_data = {
                mfxName: data.name || "n.v.t.",
                mfxEmail: data.email || "n.v.t.",
                mfxTel: data.phone || "n.v.t.",
                mfxText: data.message || "n.v.t.",
                mfxNeed: data.need || "n.v.t.",
                mfxHasWebsite: data.hasWebsite || "n.v.t.",
                mfxWebsiteUrl: data.websiteUrl || "n.v.t.",
                mfxSelfManage: data.selfManage || "n.v.t.",
                mfxBudget: data.budget || "n.v.t.",
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
