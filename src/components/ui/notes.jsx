import * as React from "react";

import useTranslation from "../../hooks/use-translation";

import * as notesStyles from "../../styles/modules/ui/notes.module.scss";

// TODO: klaar voor TS'en..

const Notes = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={notesStyles.notes} id="notes">
            <h3>{t("prices.notes.title")}</h3>
            <p
                dangerouslySetInnerHTML={{ __html: t("prices.notes.content") }}
            />
        </section>
    );
};

export default Notes;
