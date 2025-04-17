import React from "react";

import { Link } from "gatsby";

import * as servicesStyles from "../styles/modules/services.module.scss";

import useTranslation from "../hooks/use-translation";

const Service = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={servicesStyles.serviceContainer} id="services">
            <div className={servicesStyles.serviceWrapper}>
                <div>
                    <div>
                        <div className={servicesStyles.serviceTitle}>
                            <i className="fa-solid fa-globe" />
                            <h4>{t("servicesTitleWebsites")}</h4>
                        </div>
                        <hr className={servicesStyles.thick} />
                        <p>{t("servicesContentWebsites")}</p>
                        <hr className={servicesStyles.thin} />
                        <span>Focus:</span>
                        <ul>
                            <li>{t("servicesFocusWebsitesOne")}</li>
                            <li>{t("servicesFocusWebsitesTwo")}</li>
                            <li>{t("servicesFocusWebsitesThree")}</li>
                            <li>{t("servicesFocusWebsitesFour")}</li>
                        </ul>
                        <hr className={servicesStyles.endline} />
                    </div>
                    <div>
                        <div className={servicesStyles.serviceTitle}>
                            <i className="fa-solid fa-shopping-cart" />
                            <h4>{t("servicesTitleWebshops")}</h4>
                        </div>
                        <hr className={servicesStyles.thick} />
                        <p>{t("servicesContentWebshops")}</p>
                        <hr className={servicesStyles.thin} />
                        <span>Focus:</span>
                        <ul>
                            <li>{t("servicesFocusWebshopsOne")}</li>
                            <li>{t("servicesFocusWebshopsTwo")}</li>
                            <li>{t("servicesFocusWebshopsThree")}</li>
                            <li>{t("servicesFocusWebshopsFour")}</li>
                        </ul>
                        <hr className={servicesStyles.endline} />
                    </div>
                    <div>
                        <div className={servicesStyles.serviceTitle}>
                            <i className="fa-solid fa-mobile" />
                            <h4>{t("servicesTitleWebapps")}</h4>
                        </div>
                        <hr className={servicesStyles.thick} />
                        <p>{t("servicesContentWebapps")}</p>
                        <hr className={servicesStyles.thin} />
                        <span>Focus:</span>
                        <ul>
                            <li>{t("servicesFocusWebappsOne")}</li>
                            <li>{t("servicesFocusWebappsTwo")}</li>
                            <li>{t("servicesFocusWebappsThree")}</li>
                        </ul>
                        <hr className={servicesStyles.endline} />
                    </div>
                    <div>
                        <div className={servicesStyles.serviceTitle}>
                            <i className="fa-brands fa-searchengin" />
                            <h4>{t("servicesTitleSeo")}</h4>
                        </div>
                        <hr className={servicesStyles.thick} />
                        <p>{t("servicesContentSeo")}</p>
                        <hr className={servicesStyles.thin} />
                        <span>Focus:</span>
                        <ul>
                            <li>{t("servicesFocusSeoOne")}</li>
                            <li>{t("servicesFocusSeoTwo")}</li>
                            <li>{t("servicesFocusSeoThree")}</li>
                        </ul>
                        <hr className={servicesStyles.endline} />
                    </div>
                </div>
                <div>
                    <Link to="/prijzen/">{t("servicesPricesButton")}</Link>
                    <Link to="/diensten/">{t("servicesPricesButtonTwo")}</Link>
                </div>
            </div>
        </section>
    );
};

export default Service;
