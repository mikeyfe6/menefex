import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from "../../hooks/use-translation";

import * as uspStyles from "../../styles/modules/ui/usp.module.scss";

const Usp = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section id="usp">
            <div className={uspStyles.uspContainer}>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={["fas", "1"]} />
                        <p>
                            <FontAwesomeIcon
                                icon={["fas", "quote-left"]}
                                size="xs"
                            />
                            {t("usp.one")}
                            <FontAwesomeIcon
                                icon={["fas", "quote-right"]}
                                size="xs"
                            />
                        </p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={["fas", "2"]} />
                        <p>
                            <FontAwesomeIcon
                                icon={["fas", "quote-left"]}
                                size="xs"
                            />
                            {t("usp.two")}
                            <FontAwesomeIcon
                                icon={["fas", "quote-right"]}
                                size="xs"
                            />
                        </p>
                    </li>

                    <li>
                        <FontAwesomeIcon icon={["fas", "3"]} />
                        <p>
                            <FontAwesomeIcon
                                icon={["fas", "quote-left"]}
                                size="xs"
                            />
                            {t("usp.three")}
                            <FontAwesomeIcon
                                icon={["fas", "quote-right"]}
                                size="xs"
                            />
                        </p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={["fas", "4"]} />
                        <p>
                            <FontAwesomeIcon
                                icon={["fas", "quote-left"]}
                                size="xs"
                            />
                            {t("usp.four")}
                            <FontAwesomeIcon
                                icon={["fas", "quote-right"]}
                                size="xs"
                            />
                        </p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={["fas", "5"]} />
                        <p>
                            <FontAwesomeIcon
                                icon={["fas", "quote-left"]}
                                size="xs"
                            />
                            {t("usp.five")}
                            <FontAwesomeIcon
                                icon={["fas", "quote-right"]}
                                size="xs"
                            />
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Usp;
