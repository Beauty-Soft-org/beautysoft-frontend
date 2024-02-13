import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GiPositionMarker } from 'react-icons/gi';
import { renderToString } from 'react-dom/server';

const mapStyle = {
  width: '100%',
  height: '550px',
};

const Mapa: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) {
        const newMap = L.map('map').setView([-26.877133350313095, -49.09395381945318], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(newMap);

        const iconUrl = reactIconToImageURL(<GiPositionMarker style={{ color: 'red' }} />);

        const customMarkerIcon = new L.Icon({
          iconUrl: iconUrl,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        const marker = L.marker([-26.877433350313095, -49.09374381945318], { icon: customMarkerIcon }).addTo(newMap);

        marker.bindPopup('Vitória Garavazzo - Estética Avançada').openPopup();

        mapRef.current = newMap;
      }
    };

    if (!document.getElementById('map')) {
      setTimeout(initMap, 0);
    } else {
      initMap();
    }
  }, []);

  // Função auxiliar para converter componente React para imagem URL
  const reactIconToImageURL = (reactIcon: React.ReactNode): string => {
    const svgString = renderToString(
      React.cloneElement(reactIcon as React.ReactElement<any, any>, { size: 32 })
    );
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  return <div id="map" style={mapStyle}></div>;
};

export default Mapa;
