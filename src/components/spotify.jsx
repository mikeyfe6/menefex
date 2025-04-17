import React from "react";

import useTranslation from "../hooks/use-translation";

import * as spotifyStyles from "../styles/modules/spotify.module.scss";

const Spotify = () => {
    const { t, isHydrated } = useTranslation();

    if (!isHydrated) return null;

    return (
        <section className={spotifyStyles.spotify}>
            <p dangerouslySetInnerHTML={{ __html: t("aboutSpotifyIntro") }} />

            <iframe
                title="Menefex' #STAYVIBIN Playlist"
                src="https://open.spotify.com/embed/playlist/08UGoWTjvpuooABCWyPx0m?utm_source=generator&theme=0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
        </section>
    );
};

export default Spotify;
