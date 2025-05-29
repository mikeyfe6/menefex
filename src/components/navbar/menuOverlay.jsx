import * as React from "react";

import * as backDropStyles from "../../styles/modules/layout/backdrop.module.scss";

const MenuOverlay = ({ click }) => (
    <div
        className={backDropStyles.backdrop}
        onClick={click}
        id="backdrop"
        role="presentation"
    />
);

export default MenuOverlay;
