import React from "react";

import { navigate } from "gatsby";

import useTranslation from "../hooks/use-translation";

import * as pricesStyles from "../styles/modules/prices.module.scss";

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
            <ul className={pricesStyles.prices}>
                <li>
                    <h3>BUDGET PLAN</h3>
                    <p className={pricesStyles.price}>
                        <span>€ 295,-</span> <SalePrice ogPrice={295} />{" "}
                        <sup>{t("priceTableVat")}</sup>
                    </p>
                    <p className={pricesStyles.priceAction}>
                        {t("priceTableDiscount")}
                    </p>
                    <p className={pricesStyles.priceContains}>
                        {t("priceTableContains")}
                    </p>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            1 - 2 {t("priceTablePages")}
                        </li>
                        <li>{t("priceTableCustomDesign")}</li>
                        <li>{t("priceTableResponsive")}</li>
                        <li>{t("priceTableCms")}</li>
                        <li>{t("priceTableMedia")}</li>
                        <li>{t("priceTableForms")}</li>
                        <li>{t("priceTableSocialMedia")}</li>
                        <li>{t("priceTableReviews")}</li>
                        <li>{t("priceTableStatistics")}</li>
                        <li>{t("priceTableSsl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("priceTableExtra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("priceTableOneMonth")}
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
                        {t("priceQuote")}
                    </button>
                </li>

                <li>
                    <h3>STARTER PLAN</h3>
                    <p className={pricesStyles.price}>
                        <span>€ 595,-</span> <SalePrice ogPrice={595} />{" "}
                        <sup>{t("priceTableVat")}</sup>
                    </p>
                    <p className={pricesStyles.priceAction}>
                        {t("priceTableDiscount")}
                    </p>
                    <p className={pricesStyles.priceContains}>
                        {t("priceTableContains")}
                    </p>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            1 - 5 {t("priceTablePages")}
                        </li>
                        <li>{t("priceTableCustomDesign")}</li>
                        <li>{t("priceTableResponsive")}</li>
                        <li>{t("priceTableCms")}</li>
                        <li className={pricesStyles.priceBold}>Blog</li>
                        <li>{t("priceTableSocialMedia")}</li>
                        <li>{t("priceTableForms")}</li>
                        <li>{t("priceTableSocialMedia")}</li>
                        <li>{t("priceTableReviews")}</li>
                        <li>{t("priceTableStatistics")}</li>
                        <li>{t("priceTableSsl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("priceTableExtra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("priceTableThreeMonths")}
                        </li>
                    </ul>
                    <button
                        type="button"
                        name="offerte"
                        onClick={() =>
                            handlePrice(
                                "Hi Michael, ik wil graag een offerte aanvragen voor de Starter Plan...",
                                "lead_name"
                            )
                        }
                    >
                        {t("priceQuote")}
                    </button>
                </li>

                <li>
                    <h3>ESTABLISHED PLAN</h3>
                    <p className={pricesStyles.price}>
                        <span>€ 1025,-</span> <SalePrice ogPrice={1025} />{" "}
                        <sup>{t("priceTableVat")}</sup>
                    </p>
                    <p className={pricesStyles.priceAction}>
                        {t("priceTableDiscount")}
                    </p>
                    <p className={pricesStyles.priceContains}>
                        {t("priceTableContains")}
                    </p>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            ± 10 {t("priceTablePages")}
                        </li>
                        <li>{t("priceTableCustomDesign")}</li>
                        <li>{t("priceTableResponsive")}</li>
                        <li>{t("priceTableCms")}</li>
                        <li className={pricesStyles.priceBold}>Blog</li>
                        <li>{t("priceTableSocialMedia")}</li>
                        <li>{t("priceTableForms")}</li>
                        <li className={pricesStyles.priceBold}>
                            {t("priceTableSearch")}
                        </li>
                        <li>{t("priceTableSocialMedia")}</li>
                        <li>{t("priceTableReviews")}</li>
                        <li>{t("priceTableStatistics")}</li>
                        <li>{t("priceTableSsl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("priceTableExtra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("priceTableSixMonths")}
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
                        {t("priceQuote")}
                    </button>
                </li>

                <li>
                    <h3>BUSINESS PLAN</h3>
                    <p className={pricesStyles.price}>
                        <span>€ 1575,-</span> <SalePrice ogPrice={1575} />{" "}
                        <sup>{t("priceTableVat")}</sup>
                    </p>
                    <p className={pricesStyles.priceAction}>
                        {t("priceTableDiscount")}
                    </p>{" "}
                    <p className={pricesStyles.priceContains}>
                        {t("priceTableContains")}
                    </p>
                    <ul>
                        <li className={pricesStyles.priceBold}>
                            ∞ {t("priceTablePages")}
                        </li>
                        <li>{t("priceTableCustomDesign")}</li>
                        <li>{t("priceTableResponsive")}</li>
                        <li>{t("priceTableCms")}</li>
                        <li className={pricesStyles.priceBold}>Blog</li>
                        <li>{t("priceTableSocialMedia")}</li>
                        <li className={pricesStyles.priceBold}>
                            User Login / Register
                        </li>
                        <li>{t("priceTableForms")}</li>
                        <li className={pricesStyles.priceBold}>
                            {t("priceTableSearch")}
                        </li>
                        <li>{t("priceTableSocialMedia")}</li>
                        <li className={pricesStyles.priceBold}>
                            {t("priceTableBank")}
                        </li>
                        <li>{t("priceTableReviews")}</li>
                        <li>{t("priceTableStatistics")}</li>
                        <li>{t("priceTableSsl")}</li>
                        <li className={pricesStyles.priceFeat}>
                            {t("priceTableExtra")}
                        </li>
                        <li className={pricesStyles.priceBold}>
                            {t("priceTableTwelveMonths")}
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
                        {t("priceQuote")}
                    </button>
                </li>
            </ul>
        </section>
    );
};

export default PriceTable;
