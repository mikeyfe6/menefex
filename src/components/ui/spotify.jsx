import * as React from "react";

import useTranslation from "../../hooks/use-translation";

import * as spotifyStyles from "../../styles/modules/ui/spotify.module.scss";

// TODO: klaar voor TS'en..

const Spotify = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={spotifyStyles.spotify} id="spotify">
            <p dangerouslySetInnerHTML={{ __html: t("about.spotify") }} />

            <iframe
                title="Menefex' #STAYVIBIN Playlist"
                src="https://open.spotify.com/embed/playlist/08UGoWTjvpuooABCWyPx0m?utm_source=generator&theme=0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                loading="lazy"
            />
        </section>
    );
};

export default Spotify;
