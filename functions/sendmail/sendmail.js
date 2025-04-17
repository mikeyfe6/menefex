/* eslint-disable indent */
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const { name, subject, text, email, company, tel, tijdstip } = data;

    const msg = {
        from: {
            email: process.env.SENDGRID_AUTHORIZED_EMAIL,
            name: "Menefex WMB - [website] ✨",
        },
        templateId: "d-8eebc10097fd430787de9cd0f3db702b",
        personalizations: [
            {
                to: "contact@menefex.nl", // Change to your recipient
                dynamic_template_data: {
                    mfxName: name || "n.v.t.",
                    mfxSubject: subject || "Terugbelverzoek",
                    mfxText: text || "n.v.t.",
                    mfxEmail: email || "n.v.t.",
                    mfxCompany: company || "n.v.t.",
                    mfxTel: tel || "n.v.t.",
                    mfxTijdstip: tijdstip || "n.v.t.",
                },
            },
        ],
    };

    try {
        await sgMail.send(msg);

        return {
            statusCode: 202,
            body: "Bericht verstuurd",
        };
    } catch (error) {
        const statusCode = typeof error.code === "number" ? error.code : 500;

        return {
            statusCode,
            body: error.message,
        };
    }
};
