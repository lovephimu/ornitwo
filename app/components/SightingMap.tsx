'use client';

import 'leaflet/dist/leaflet.css';
import { Icon, LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type SortedData = {
  id: number;
  userId: number;
  username: string;
  location: string;
  time: Date;
  lat: number;
  lng: number;
};

type Props = {
  coordinates: SortedData[];
};

export default function SightingMap(props: Props) {
  const center: [number, number] = [47.525, 14.183];

  const markers = props.coordinates;

  if (markers.length === 0) {
    return <p>No coordinates provided.</p>;
  }

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
            position={[marker.lat, marker.lng] as LatLngTuple}
          >
            <Popup>{marker.location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
