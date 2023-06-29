import { Sighting } from './database';

export const sightings: Sighting[] = [
  {
    id: 1,
    userId: 1,
    birdId: 2,
    location: 'Museumquartier, Wien',
    timeStamp: '12.2.23',
    lat: 48.2025,
    lng: 16.3594,
  },
  {
    id: 2,
    userId: 2,
    birdId: 2,
    location: 'Rathaus, Wien',
    timeStamp: '13.3.23',
    lat: 48.21,
    lng: 16.3578,
  },
  {
    id: 3,
    userId: 3,
    birdId: 4,
    location: 'Retz, Niederösterreich',
    timeStamp: '15.5.23',
    lat: 48.7589,
    lng: 15.9472,
  },
  {
    id: 4,
    userId: 1,
    birdId: 4,
    location: 'Rust, Burgenland',
    timeStamp: '16.6.23',
    lat: 47.8039,
    lng: 15.9472,
  },
];
