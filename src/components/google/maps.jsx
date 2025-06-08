import * as React from "react";

import GoogleMapReact from "google-map-react";

import useSiteMetadata from "../../hooks/use-site-metadata";

import mapsLogo from "../../images/logo/mnfx-icon.svg";

import * as mapsStyles from "../../styles/modules/ui/maps.module.scss";

const defaultProps = {
    center: {
        lat: 52.30994007862562,
        lng: 4.974422834381031,
    },
    zoom: 12,
};

const Marker = ({ lat, lng }) => {
    const { title } = useSiteMetadata();

    return (
        <div data-lat={lat} data-lng={lng} className={mapsStyles.marker}>
            <img src={mapsLogo} alt={title} width={37.5} height={37.5} />
        </div>
    );
};

const SimpleMap = () => (
    <section className={mapsStyles.maps}>
        <div className={mapsStyles.mapsContainer}>
            <div className={mapsStyles.mapsContent}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.GATSBY_GOOGLE_MAPS_KEY,
                        language: "nl",
                        region: "NL",
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <Marker lat={52.31049600748774} lng={4.973736770446289} />
                </GoogleMapReact>
            </div>
        </div>
    </section>
);

export default SimpleMap;
