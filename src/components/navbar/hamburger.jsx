import * as React from "react";

import * as hamburgerStyles from "../../styles/modules/layout/hamburger.module.scss";

// TODO: klaar voor TS'en..

const Hamburger = ({ click }) => (
    <button
        type="button"
        className={hamburgerStyles.hamburger}
        onClick={click}
        aria-label="Menu"
    >
        <div />
        <div />
        <div />
    </button>
);

export default Hamburger;
