import * as React from "react";

import { Link } from "gatsby";

import * as servicesStyles from "../../styles/modules/ui/services.module.scss";

import useTranslation from "../../hooks/use-translation";

// TODO: klaar voor TS'en..

const Services = () => {
    const { t, isHydrated } = useTranslation();
    const [selected, setSelected] = React.useState("websites");

    const services = {
        websites: {
            name: t("services.websites.name"),
            icon: "fa-solid fa-globe",
            excerpt: t("services.websites.excerpt"),
            focus: t("services.websites.focus", { returnObjects: true }),
            url: "/diensten/website-laten-maken/",
            cta: t("services.websites.cta"),
        },
        webshops: {
            name: t("services.webshops.name"),
            icon: "fa-solid fa-shopping-cart",
            excerpt: t("services.webshops.excerpt"),
            focus: t("services.webshops.focus", { returnObjects: true }),
            url: "/diensten/webshop-laten-maken/",
            cta: t("services.webshops.cta"),
        },
        webapps: {
            name: t("services.webapps.name"),
            icon: "fa-solid fa-mobile",
            excerpt: t("services.webapps.excerpt"),
            focus: t("services.webapps.focus", { returnObjects: true }),
            url: "/diensten/webapplicatie-laten-maken/",
            cta: t("services.webapps.cta"),
        },
        seo: {
            name: t("services.seo.name"),
            icon: "fa-brands fa-searchengin",
            excerpt: t("services.seo.excerpt"),
            focus: t("services.seo.focus", { returnObjects: true }),
            url: "/diensten/zoekmachine-optimalisatie/",
            cta: t("services.seo.cta"),
        },
        maintenance: {
            name: t("services.maintenance.name"),
            icon: "fa-solid fa-wrench",
            excerpt: t("services.maintenance.excerpt"),
            focus: t("services.maintenance.focus", { returnObjects: true }),
            url: "/diensten/onderhoud-en-support/",
            cta: t("services.maintenance.cta"),
        },
        optimization: {
            name: t("services.optimization.name"),
            icon: "fa-solid fa-rocket",
            excerpt: t("services.optimization.excerpt"),
            focus: t("services.optimization.focus", { returnObjects: true }),
            url: "/diensten/optimalisatie/",
            cta: t("services.optimization.cta"),
        },
    };

    const serviceKeys = [
        "websites",
        "webshops",
        "webapps",
        "seo",
        "maintenance",
        "optimization",
    ];

    if (!isHydrated) return null;

    return (
        <section className={servicesStyles.service} id="services">
            <div className={servicesStyles.serviceContainer}>
                <div className={servicesStyles.serviceOverlay}>
                    <i className={services[selected].icon} />
                    <h4>{services[selected].name}</h4>
                    <p>{services[selected].excerpt}</p>
                    <span>Focus:</span>
                    <ul>
                        {services[selected].focus.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    <Link to={services[selected].url}>
                        {services[selected].cta}
                    </Link>
                </div>
                <h3>{t("services.name")}</h3>
                <p>
                    Bij Menefex bieden we een compleet pakket aan digitale
                    diensten om jouw online aanwezigheid te versterken. Of je nu
                    op zoek bent naar een op maat gemaakte website, krachtige
                    webapplicatie, converterende webshop, betere vindbaarheid in
                    Google, technische ondersteuning of
                    performance-optimalisatie — wij zorgen dat jouw digitale
                    platform werkt, scoort én groeit.
                </p>
                {serviceKeys.map((key) => (
                    <button
                        key={key}
                        className={
                            servicesStyles[
                                `service${
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                }`
                            ]
                        }
                        onClick={() => setSelected(key)}
                    >
                        <i className={services[key].icon} />
                        <span>{services[key].name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Services;
