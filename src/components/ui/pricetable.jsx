import * as React from "react";

import { navigate } from "gatsby";

import useTranslation from "../../hooks/use-translation";

import * as pricesStyles from "../../styles/modules/ui/prices.module.scss";

// TODO: klaar voor TS'en..

const PriceTable = () => {
    const { t, isHydrated } = useTranslation();

    const SalePrice = ({ ogPrice }) => {
        const totalPrice = ogPrice - (ogPrice / 100) * 5;
        const endResult = totalPrice;
        const euroFormat = new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        }).format(endResult);

        return <data>{euroFormat}</data>;
    };

    const handlePrice = (handelen, inputId) => {
        sessionStorage.setItem("mnfx", handelen);
        navigate("/contact/");

        setTimeout(() => {
            const inputElement = document.getElementById(inputId);
            if (inputElement) {
                inputElement.focus();
            }
        }, 100);
    };

    if (!isHydrated) return null;

    return (
        <section>
            <div className={pricesStyles.priceContainer}>
                <div className={pricesStyles.priceTable}>
                    <h3>BUDGET PLAN</h3>
                    <div>
                        <p className={pricesStyles.priceMain}>
                            <span>€ 295,-</span> <SalePrice ogPrice={295} />{" "}
                            <sup>{t("prices.table.vat")}</sup>
                        </p>
                        <p className={pricesStyles.priceAction}>
                            {t("prices.table.discount")}
                        </p>
                        <p className={pricesStyles.priceContains}>
                            {t("prices.table.contains")}
                        </p>
                    </div>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            1 - 2 {t("prices.table.pages")}
                        </li>
                        <li>{t("prices.table.customDesign")}</li>
                        <li>{t("prices.table.responsive")}</li>
                        <li>{t("prices.table.cms")}</li>
                        <li>{t("prices.table.media")}</li>
                        <li>{t("prices.table.forms")}</li>
                        <li>{t("prices.table.socialMedia")}</li>
                        <li>{t("prices.table.reviews")}</li>
                        <li>{t("prices.table.statistics")}</li>
                        <li>{t("prices.table.ssl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("prices.table.extra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("prices.table.oneMonth")}
                        </li>
                    </ul>
                    <button
                        type="button"
                        name="offerte"
                        onClick={() =>
                            handlePrice(
                                "Hi Michael, ik wil graag een offerte aanvragen voor de Budget Plan...",
                                "lead_name"
                            )
                        }
                    >
                        {t("prices.table.button")}
                    </button>
                </div>

                <div className={pricesStyles.priceTable}>
                    <h3>STARTER PLAN</h3>
                    <div>
                        <p className={pricesStyles.priceMain}>
                            <span>€ 595,-</span> <SalePrice ogPrice={595} />{" "}
                            <sup>{t("prices.table.vat")}</sup>
                        </p>
                        <p className={pricesStyles.priceAction}>
                            {t("prices.table.discount")}
                        </p>
                        <p className={pricesStyles.priceContains}>
                            {t("prices.table.contains")}
                        </p>
                    </div>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            1 - 5 {t("prices.table.pages")}
                        </li>
                        <li>{t("prices.table.customDesign")}</li>
                        <li>{t("prices.table.responsive")}</li>
                        <li>{t("prices.table.cms")}</li>
                        <li className={pricesStyles.priceBold}>Blog</li>
                        <li>{t("prices.table.media")}</li>
                        <li>{t("prices.table.forms")}</li>
                        <li>{t("prices.table.socialMedia")}</li>
                        <li>{t("prices.table.reviews")}</li>
                        <li>{t("prices.table.statistics")}</li>
                        <li>{t("prices.table.ssl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("prices.table.extra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("prices.table.threeMonths")}
                        </li>
                    </ul>
                    <button
                        type="button"
                        onClick={() =>
                            handlePrice(
                                "Hi Michael, ik wil graag een offerte aanvragen voor de Starter Plan...",
                                "lead_name"
                            )
                        }
                    >
                        {t("prices.table.button")}
                    </button>
                </div>

                <div className={pricesStyles.priceTable}>
                    <h3>ESTABLISHED PLAN</h3>
                    <div>
                        <p className={pricesStyles.priceMain}>
                            <span>€ 1025,-</span> <SalePrice ogPrice={1025} />{" "}
                            <sup>{t("prices.table.vat")}</sup>
                        </p>
                        <p className={pricesStyles.priceAction}>
                            {t("prices.table.discount")}
                        </p>
                        <p className={pricesStyles.priceContains}>
                            {t("prices.table.contains")}
                        </p>
                    </div>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            ± 10 {t("prices.table.pages")}
                        </li>
                        <li>{t("prices.table.customDesign")}</li>
                        <li>{t("prices.table.responsive")}</li>
                        <li>{t("prices.table.cms")}</li>
                        <li className={pricesStyles.priceBold}>Blog</li>
                        <li>{t("prices.table.media")}</li>
                        <li>{t("prices.table.forms")}</li>
                        <li className={pricesStyles.priceBold}>
                            {t("prices.table.search")}
                        </li>
                        <li>{t("prices.table.socialMedia")}</li>
                        <li>{t("prices.table.reviews")}</li>
                        <li>{t("prices.table.statistics")}</li>
                        <li>{t("prices.table.ssl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("prices.table.extra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("prices.table.sixMonths")}
                        </li>
                    </ul>
                    <button
                        type="button"
                        name="offerte"
                        onClick={() =>
                            handlePrice(
                                "Hi Michael, ik wil graag een offerte aanvragen voor de Established Plan...",
                                "lead_name"
                            )
                        }
                    >
                        {t("prices.table.button")}
                    </button>
                </div>

                <div className={pricesStyles.priceTable}>
                    <h3>BUSINESS PLAN</h3>
                    <div>
                        <p className={pricesStyles.priceMain}>
                            <span>€ 1575,-</span> <SalePrice ogPrice={1575} />{" "}
                            <sup>{t("prices.table.vat")}</sup>
                        </p>
                        <p className={pricesStyles.priceAction}>
                            {t("prices.table.discount")}
                        </p>{" "}
                        <p className={pricesStyles.priceContains}>
                            {t("prices.table.contains")}
                        </p>
                    </div>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            ∞ {t("prices.table.pages")}
                        </li>
                        <li>{t("prices.table.customDesign")}</li>
                        <li>{t("prices.table.responsive")}</li>
                        <li>{t("prices.table.cms")}</li>
                        <li className={pricesStyles.priceBold}>Blog</li>
                        <li>{t("prices.table.media")}</li>
                        <li className={pricesStyles.priceBold}>
                            User Login / Register
                        </li>
                        <li>{t("prices.table.forms")}</li>
                        <li className={pricesStyles.priceBold}>
                            {t("prices.table.search")}
                        </li>
                        <li>{t("prices.table.socialMedia")}</li>

                        <li className={pricesStyles.priceBold}>
                            {t("prices.table.ecommerce")}
                        </li>
                        <li>{t("prices.table.reviews")}</li>
                        <li>{t("prices.table.statistics")}</li>
                        <li>{t("prices.table.ssl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("prices.table.extra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("prices.table.twelveMonths")}
                        </li>
                    </ul>
                    <button
                        type="button"
                        name="offerte"
                        onClick={() =>
                            handlePrice(
                                "Hi Michael, ik wil graag een offerte aanvragen voor de Business Plan...",
                                "lead_name"
                            )
                        }
                    >
                        {t("prices.table.button")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PriceTable;
