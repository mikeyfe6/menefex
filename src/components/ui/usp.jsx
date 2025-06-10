import * as React from "react";

import useTranslation from "../../hooks/use-translation";

import * as uspStyles from "../../styles/modules/ui/usp.module.scss";

const Usp = () => {
    const { t, isHydrated } = useTranslation();

    // const containerRef = React.useRef(null);

    // React.useEffect(() => {
    //     const el = containerRef.current;
    //     if (!el) return;
    //     const onWheel = (e) => {
    //         if (e.deltaY === 0) return;
    //         e.preventDefault();
    //         el.scrollLeft += e.deltaY;
    //     };
    //     el.addEventListener("wheel", onWheel, { passive: false });
    //     return () => el.removeEventListener("wheel", onWheel);
    // }, []);

    if (!isHydrated) return null;

    return (
        <section id="usp">
            <div className={uspStyles.uspContainer}>
                <ul>
                    <li>
                        <i className="fa-solid fa-1"></i>
                        <p>{t("usp.one")}</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-2"></i>
                        <p>{t("usp.two")}</p>
                    </li>

                    <li>
                        <i className="fa-solid fa-3"></i>
                        <p>{t("usp.three")}</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-4"></i>
                        <p>{t("usp.four")}</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-5"></i>
                        <p>{t("usp.five")}</p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Usp;
