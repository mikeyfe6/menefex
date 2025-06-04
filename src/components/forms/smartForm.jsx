import React, { useState, useEffect, useCallback } from "react";

import useTranslation from "../../hooks/use-translation";

import * as callStyles from "../../styles/modules/forms/callForm.module.scss";

const SmartForm = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return <form>form ieks</form>;
};

export default SmartForm;
