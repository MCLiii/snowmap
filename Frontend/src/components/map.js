import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import config from '../config';

const center = {
  lat: 39.8282,
  lng: -98.5796
};

function SnowMap(props) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const { markers, width, height, hoveredCard, setSelected, selected} = props;

    console.log(markers);
    const containerStyle = {
        width: width || '800px',
        height: height || '400px',
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: config.googleMapsApiKey
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >
        {markers instanceof Array && markers.map((marker, index) => (
            <Marker
            key={index}
            position={{ lat: Number(marker.lat), lng: Number(marker.lon) }}
            onClick={() => { setSelectedMarker(marker); setSelected(marker);}}
            onMouseOver={() => { setHoveredMarker(marker);}}
            onMouseOut={() => { setHoveredMarker(null); }}
            icon={{
                url: (hoveredMarker === marker || hoveredCard == marker || selected==marker) ? 'https://maps.gstatic.com/mapfiles/ms2/micons/green.png' : 'https://maps.gstatic.com/mapfiles/ms2/micons/red.png',
                scaledSize: new window.google.maps.Size(50, 50),
                labelOrigin: new window.google.maps.Point(25, 15)
            }}
            zIndex={hoveredMarker === marker || hoveredCard == marker || selected==marker ? 1000 : null}
            label={{
                text: String(Math.round(marker.snowfall)),
                color: 'white',
                fontSize: '13px',
                fontWeight: 'bold',
                bottom: '100px',
            }}
            />
        ))}
        {selectedMarker && (
            <InfoWindow
            position={{ lat: Number(selectedMarker.lat), lng: Number(selectedMarker.lon) }}
            onCloseClick={() => { setSelectedMarker(null); setSelected(null); }}
            >
            <div>{selectedMarker.name}
            <p>Snow Fall: {Math.round(selectedMarker?.snowfall*100)/100}</p>
            </div>
            </InfoWindow>
        )}
        </GoogleMap>
    ) : <></>;
}

export default React.memo(SnowMap);
