import React from "react";

import useTranslation from "../hooks/use-translation";

import * as aboutStyles from "../styles/modules/about.module.scss";

const About = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={aboutStyles.about}>
            <h3>{t("aboutWhoAreWeTitle")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("aboutWhoAreWeText") }} />

            <h3>{t("aboutWhatWeStandForTitle")}</h3>
            <p
                dangerouslySetInnerHTML={{
                    __html: t("aboutWhatWeStandForText"),
                }}
            />

            <h3>{t("aboutUniqueTitle")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("aboutUniqueText") }} />

            <h3>{t("aboutGoalsTitle")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("aboutGoalsText") }} />
        </section>
    );
};

export default About;
