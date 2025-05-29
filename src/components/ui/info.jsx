import * as React from "react";

import useTranslation from "../../hooks/use-translation";

import * as infoStyles from "../../styles/modules/ui/info.module.scss";

const Info = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={infoStyles.info}>
            <h3>{t("contactInfoTitle")}</h3>
            <p
                dangerouslySetInnerHTML={{
                    __html: t("contactInfoLocation"),
                }}
            />

            <br />

            <p>
                <b>
                    <u>{t("contactInfoAvaliable")}</u>
                </b>
            </p>

            <ul className={infoStyles.times}>
                <li>
                    <span>{t("contactInfoMonday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contactInfoTuesday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contactInfoWednesday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contactInfoThursday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contactInfoFriday")}</span> <b>9:00 · 19:00</b>
                </li>
                <li>
                    <span>{t("contactInfoSaturday")}</span>{" "}
                    <b>{t("contactInfoClosed")}</b>
                </li>
                <li>
                    <span>{t("contactInfoSunday")}</span>{" "}
                    <b>{t("contactInfoClosed")}</b>
                </li>
            </ul>

            <br />

            <p
                className={infoStyles.details}
                dangerouslySetInnerHTML={{
                    __html: t("contactInfoDetails"),
                }}
            />

            <br />
            <br />

            <div className={infoStyles.communication}>
                <p className={infoStyles.contacttel}>
                    <i className="fa-solid fa-phone" /> ·{" "}
                    <a href="tel:0611054318">+31 6 11 05 43 18</a>
                </p>

                <p className={infoStyles.contactmail}>
                    <i className="fa-solid fa-envelope" /> ·{" "}
                    <a
                        href="mailto:info@menefex.nl"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        info@menefex.nl
                    </a>
                </p>
            </div>

            <br />
            <br />

            <div className={infoStyles.socials}>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t("contactInfoFollowSocials"),
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
                            <i className="fa-brands fa-facebook-f" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.instagram.com/menefexwmb/"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.ig}
                        >
                            <i className="fa-brands fa-instagram" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.twitter.com/MenefexWMB"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.tw}
                        >
                            <i className="fa-brands  fa-x-twitter" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.linkedin.com/company/menefexwmb/"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.li}
                        >
                            <i className="fa-brands fa-linkedin" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://github.com/mikeyfe6"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.gh}
                        >
                            <i className="fa-brands fa-github" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fmenefex.nl%2Frss.xml"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.rss}
                        >
                            <i className="fa-solid fa-rss" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://www.patreon.com/menefexWMB"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.patr}
                        >
                            <i className="fa-brands fa-patreon" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://open.spotify.com/playlist/08UGoWTjvpuooABCWyPx0m?si=5a3ca09f8cba4300"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.sp}
                        >
                            <i className="fa-brands fa-spotify" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://join.skype.com/invite/lpx2blVirPUn"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.sky}
                        >
                            <i className="fa-brands fa-skype" />
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://wa.me/31611054318"
                            rel="noopener noreferrer"
                            target="_blank"
                            className={infoStyles.wa}
                        >
                            <i className="fa-brands fa-whatsapp" />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Info;
