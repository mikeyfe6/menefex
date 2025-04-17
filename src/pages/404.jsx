import React from "react";

import { Link } from "gatsby";

import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

import * as successAndNotFoundStyles from "../styles/modules/success-404.module.scss";

const NotFound = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <div>
                <div className="smallwhitespace" />
                <h3>
                    {t("NotfoundSigh")}
                    <span className="lazy-color">..</span> {t("NotfoundPage")}
                    <span className="lazy-color">.</span> {t("NotfoundTooBad")}
                    <span className="lazy-color">..</span>
                </h3>
                <br />
                <Link to="/" className={successAndNotFoundStyles.goback}>
                    {t("NotFoundGoBack")}
                </Link>
                <hr />
            </div>
        </Layout>
    );
};

export default NotFound;

export const Head = () => (
    <SEO
        title="404"
        description="oepss.. Pagina niet gevonden!"
        pathname="/404/"
    />
);
