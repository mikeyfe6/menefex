import * as React from "react";

import useTranslation from "../../hooks/use-translation";

const Usp = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return <section>USP</section>;
};

export default Usp;
