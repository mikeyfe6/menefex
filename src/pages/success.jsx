import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../hooks/use-translation";

import SEO from "../components/seo";
import Layout from "../components/layout";

import * as successAndNotFoundStyles from "../styles/modules/pages/success-404.module.scss";

const ThankYouPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section>
                <h1 className="page-title">
                    {t("successTitle")}
                    <span className="lazy-color">..</span>
                </h1>
                <h2 className="page-sub">{t("successMessage")}</h2>
                <br />
                <Link to="/" className={successAndNotFoundStyles.goback}>
                    {t("successGoBack")}
                </Link>
            </section>
        </Layout>
    );
};

export default ThankYouPage;

export const Head = () => (
    <SEO
        title="Bedankt!"
        description="Success! Uw bericht is aangekomen."
        pathname="/success/"
    />
);
