'use client';

import 'leaflet/dist/leaflet.css';
import { Icon, LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function SightingMap() {
  const center: [number, number] = [47.525, 14.183];

  const markers = [
    { id: 1, position: [48.2082, 16.3738], name: 'Vienna' },
    { id: 2, position: [47.8095, 13.055], name: 'Salzburg' },
    { id: 3, position: [47.2692, 11.4041], name: 'Innsbruck' },
  ];

  return (
    <section className="p-8">
      <MapContainer center={center} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            icon={
              new Icon({
                iconUrl: '/images/icon_bird.svg',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              })
            }
            key={`markerId-${marker.id}`}
            position={marker.position as LatLngTuple}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
