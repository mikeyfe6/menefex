import * as React from "react";

import GoogleMapReact from "google-map-react";

import useSiteMetadata from "../../hooks/use-site-metadata";

import mapsLogo from "../../images/logo/mnfx-icon.svg";

import * as mapsStyles from "../../styles/modules/ui/maps.module.scss";

// TODO: klaar voor TS'en..

const useScreenSize = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 480);
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return isMobile;
};

const defaultProps = {
    center: {
        lat: 52.31049600748774,
        lng: 4.973736770446289,
    },
};

const mapOptions = {
    disableDefaultUI: true,
};

const Marker = ({ lat, lng }) => {
    const { title } = useSiteMetadata();

    return (
        <div data-lat={lat} data-lng={lng}>
            <img src={mapsLogo} alt={title} width={25} height={25} />
        </div>
    );
};

const SimpleMap = () => {
    const isMobile = useScreenSize();

    const responsiveZoom = isMobile ? 15.25 : 16;

    return (
        <section id="maps">
            <div className={mapsStyles.mapsContainer}>
                <div className={mapsStyles.mapsContent}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: process.env.GATSBY_GOOGLE_MAPS_KEY,
                            language: "nl",
                            region: "NL",
                        }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={responsiveZoom}
                        options={mapOptions}
                    >
                        <Marker
                            lat={52.31049600748774}
                            lng={4.973736770446289}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        </section>
    );
};

export default SimpleMap;
