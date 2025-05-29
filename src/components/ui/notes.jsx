import * as React from "react";

import useTranslation from "../../hooks/use-translation";

import * as notesStyles from "../../styles/modules/ui/notes.module.scss";

const Notes = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={notesStyles.notes}>
            <h3>{t("priceNotesTitle")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("priceNotesText") }} />
        </section>
    );
};

export default Notes;
