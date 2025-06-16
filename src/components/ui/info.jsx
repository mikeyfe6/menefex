import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTranslation from "../../hooks/use-translation";

import * as infoStyles from "../../styles/modules/ui/info.module.scss";

// TODO: klaar voor TS'en..

const Info = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={infoStyles.info} id="info">
            <h3>{t("contact.info.title")}</h3>
            <p
                className={infoStyles.infoLocation}
                dangerouslySetInnerHTML={{
                    __html: t("contact.info.location"),
                }}
            />

            <p>
                <b>
                    <u>{t("contact.info.availability")}</u>
                </b>
            </p>

            <ul className={infoStyles.infoTimes}>
                <li>
                    <span>{t("contact.info.monday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contact.info.tuesday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contact.info.wednesday")}</span>{" "}
                    <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contact.info.thursday")}</span>{" "}
                    <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contact.info.friday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contact.info.saturday")}</span>{" "}
                    <b>{t("contact.info.closed")}</b>
                </li>
                <li>
                    <span>{t("contact.info.sunday")}</span>{" "}
                    <b>{t("contact.info.closed")}</b>
                </li>
            </ul>

            <p
                className={infoStyles.infoDetails}
                dangerouslySetInnerHTML={{
                    __html: t("contact.info.details"),
                }}
            />

            <div className={infoStyles.infoCommunication}>
                <a href="tel:0611054318" className={infoStyles.infoTel}>
                    <FontAwesomeIcon icon={["fas", "phone"]} /> ·{" "}
                    <span>+31 6 11 05 43 18</span>
                </a>

                <a
                    href="mailto:info@menefex.nl"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={infoStyles.infoMail}
                >
                    <FontAwesomeIcon icon={["fas", "envelope"]} /> ·{" "}
                    <span>info@menefex.nl</span>
                </a>
            </div>

            <div className={infoStyles.infoSocials}>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t("contact.info.socials"),
                    }}
                />
                <ul>
                    <li>
                        <a
                            href="https://www.facebook.com/MenefexWMB"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.fb}
                        >
                            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.instagram.com/menefexwmb/"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.ig}
                        >
                            <FontAwesomeIcon icon={["fab", "instagram"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.twitter.com/MenefexWMB"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.tw}
                        >
                            <FontAwesomeIcon icon={["fab", "x-twitter"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.linkedin.com/company/menefexwmb/"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.li}
                        >
                            <FontAwesomeIcon icon={["fab", "linkedin"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://github.com/mikeyfe6"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.gh}
                        >
                            <FontAwesomeIcon icon={["fab", "github"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fmenefex.nl%2Frss.xml"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.rss}
                        >
                            <FontAwesomeIcon icon={["fas", "rss"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.patreon.com/menefexWMB"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.patr}
                        >
                            <FontAwesomeIcon icon={["fab", "patreon"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.sp}
                        >
                            <FontAwesomeIcon icon={["fab", "spotify"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://join.skype.com/invite/lpx2blVirPUn"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.sky}
                        >
                            <FontAwesomeIcon icon={["fab", "skype"]} />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://wa.me/31611054318"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.wa}
                        >
                            <FontAwesomeIcon icon={["fab", "whatsapp"]} />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Info;
