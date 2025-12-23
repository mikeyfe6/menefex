import * as React from "react";

import { Link } from "gatsby";

import useTranslation from "../hooks/use-translation";

import Layout from "../components/layout";
import SEO from "../components/seo";

// TODO: klaar voor TS'en..

const NotFound = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <Layout>
            <section className="page-intro notfound">
                <h1>
                    {t("notfound.sigh")}
                    <span>..</span> {t("notfound.page")}
                    <span>.</span> {t("notfound.tooBad")}
                    <span>..</span>
                </h1>
                <Link to="/" className="page-link">
                    {t("notfound.home")}
                </Link>
                <hr />
            </section>
        </Layout>
    );
};

export default NotFound;

export const Head = () => (
    <SEO
        title="404"
        description="oepss.. Pagina niet gevonden!"
        pathname="/404/"
        noindex
    />
);
