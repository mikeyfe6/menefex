import React from "react";

import * as hamburgerStyles from "../../styles/modules/layout/hamburger.module.scss";

const HamburgerBtn = ({ click }) => (
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

export default HamburgerBtn;
