import * as React from "react";

import useTranslation from "../../hooks/use-translation";

import * as aboutStyles from "../../styles/modules/pages/about.module.scss";

// TODO: klaar voor TS'en..

const About = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={aboutStyles.aboutContent} id="about">
            <h3>{t("about.whoAreWe.title")}</h3>
            <p
                dangerouslySetInnerHTML={{
                    __html: t("about.whoAreWe.text"),
                }}
            />

            <h3>{t("about.whatWeStandFor.title")}</h3>
            <p
                dangerouslySetInnerHTML={{
                    __html: t("about.whatWeStandFor.text"),
                }}
            />

            <h3>{t("about.unique.title")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about.unique.text") }} />

            <h3>{t("about.goals.title")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about.goals.text") }} />
        </section>
    );
};

export default About;
