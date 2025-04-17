import React from "react";

import { graphql, useStaticQuery, Link } from "gatsby";

import useTranslation from "../hooks/use-translation";

import minilogo from "../logo/Menefex-icon.svg";

import * as footerStyles from "../styles/modules/footer.module.scss";

const Footer = () => {
    const { t, isHydrated } = useTranslation();

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    bizEmail
                }
            }
        }
    `);

    const {
        site: {
            siteMetadata: { title, bizEmail },
        },
    } = data;

    const today = new Date().getFullYear();

    const footerText = t("footerText")
        .replace("{{today}}", today)
        .replace("{{title}}", title);

    if (!isHydrated) return null;

    return (
        <footer className={footerStyles.footer}>
            <blockquote>
                <cite>
                    &quot;Instead of thinking outside of the box, get rid of the
                    box&quot;
                </cite>{" "}
                - Deepak Chopra
            </blockquote>

            <hr />

            <div className={footerStyles.footerInfo}>
                <div className={footerStyles.personal}>
                    <h4>connect with us</h4>

                    <p>
                        <a
                            href={`mailto:${bizEmail}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <span className={footerStyles.mailfoot}>e:</span>{" "}
                            {bizEmail}
                        </a>{" "}
                        ∙{" "}
                        <a href="tel:0611054318">
                            <span className={footerStyles.telfoot}>t:</span> +31
                            6 11 05 43 18
                        </a>
                    </p>
                </div>

                <div className={footerStyles.media}>
                    <h4>follow us on</h4>

                    <ul>
                        <li className={footerStyles.fb}>
                            <a
                                href="https://www.facebook.com/MenefexWMB"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                fb
                            </a>
                        </li>
                        <li className={footerStyles.ig}>
                            <a
                                href="https://www.instagram.com/menefexwmb/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                ig
                            </a>
                        </li>
                        <li className={footerStyles.tw}>
                            <a
                                href="https://www.twitter.com/MenefexWMB"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                tw
                            </a>
                        </li>
                        <li className={footerStyles.li}>
                            <a
                                href="https://www.linkedin.com/company/menefexwmb/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                li
                            </a>
                        </li>
                        <li className={footerStyles.gh}>
                            <a
                                href="https://github.com/mikeyfe6"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                gh
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={footerStyles.address}>
                    <h4>straight from</h4>
                    <p>
                        <span className={footerStyles.amsterdam}>xxx</span>{" "}
                        amsterdam, netherlands
                    </p>
                </div>
            </div>

            <Link to="/">
                <img
                    className={footerStyles.footerLogo}
                    src={minilogo}
                    alt="Menefex Mini Logo"
                    width={110}
                    height={110}
                />
            </Link>

            <small
                className={footerStyles.credits}
                dangerouslySetInnerHTML={{ __html: footerText }}
            />
        </footer>
    );
};

export default Footer;
