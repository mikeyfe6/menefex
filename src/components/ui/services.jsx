import React, { useState } from "react";

import { Link } from "gatsby";

import * as servicesStyles from "../../styles/modules/ui/services.module.scss";

import useTranslation from "../../hooks/use-translation";

// TODO: klaar voor TS'en..

const Services = () => {
    const { t, isHydrated } = useTranslation();
    const [selected, setSelected] = useState("websites");
    const overlayRef = React.useRef(null);

    const services = {
        websites: {
            name: t("services.websites.name"),
            icon: "fa-solid fa-globe",
            excerpt: t("services.websites.excerpt"),
            focus: t("services.websites.focus", { returnObjects: true }),
            url: "/diensten/website-laten-maken/",
            cta: t("services.websites.cta"),
        },
        webapps: {
            name: t("services.webapps.name"),
            icon: "fa-solid fa-mobile",
            excerpt: t("services.webapps.excerpt"),
            focus: t("services.webapps.focus", { returnObjects: true }),
            url: "/diensten/webapplicatie-laten-maken/",
            cta: t("services.webapps.cta"),
        },
        webshops: {
            name: t("services.webshops.name"),
            icon: "fa-solid fa-shopping-cart",
            excerpt: t("services.webshops.excerpt"),
            focus: t("services.webshops.focus", { returnObjects: true }),
            url: "/diensten/webshop-laten-maken/",
            cta: t("services.webshops.cta"),
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
        optimizations: {
            name: t("services.optimizations.name"),
            icon: "fa-solid fa-rocket",
            excerpt: t("services.optimizations.excerpt"),
            focus: t("services.optimizations.focus", { returnObjects: true }),
            url: "/diensten/optimalisaties-laten-uitvoeren/",
            cta: t("services.optimizations.cta"),
        },
    };

    const serviceKeys = [
        "websites",
        "webapps",
        "webshops",
        "seo",
        "maintenance",
        "optimizations",
    ];

    const handleSelect = (key) => {
        setSelected(key);
        overlayRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (!isHydrated) return null;

    return (
        <section className={servicesStyles.service} id="services">
            <div className={servicesStyles.serviceContainer}>
                <div className={servicesStyles.serviceOverlay} ref={overlayRef}>
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
                <h3>{t("services.title")}</h3>
                <p>{t("services.subtitle")}</p>
                {serviceKeys.map((key) => (
                    <button
                        key={key}
                        className={[
                            servicesStyles[
                                `service${
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                }`
                            ],
                            selected === key ? servicesStyles.isActive : "",
                        ].join(" ")}
                        onClick={() => handleSelect(key)}
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
