import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../hooks/use-translation";

import SEO from "../components/seo";
import Layout from "../components/layout";

// TODO: klaar voor TS'en..
// TODO: no index for SEO..

const ThankYouPage = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro">
                <h1>
                    {t("success.title")}
                    <span>..</span>
                </h1>
                <h2>{t("success.text")}</h2>
                <br />
                <Link to="/" className="page-link">
                    {t("success.home")}
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
        noindex
    />
);
