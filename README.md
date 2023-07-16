![Ornitwo Logo](https://github.com/lovephimu/ornitwo/blob/next-update/public/images/title_pic.png)

# Birdwatching Web App

OrniTwo is a full stack birdwatching web app deployed on Vercel. It allows **quick tracking of bird sightings** for ornithologists, whether full-time or hobbyists.

**Technologies Used:**

- Next.js
- PostgreSQL
- GraphQL
- Google Places
- Leaflet
- Chart.js
- Tailwind

The app was built using Next.js, PostgresSQL, and GraphQL. It leverages Google Places, Leaflet, and Chart.js for data visualization.

Users can explore information about birds and other Ornitwo users. They can also report bird sightings after registering or logging in securely (using **session tokens**). The reporting feature includes a **Google Places** location check and ensures up-to-date reports within three days by utilizing the functionality of **time-objects**.

Using **GraphQL** information is both written into and read from the database. Additional functions shape the data so i can be ordered and visualized.

The app analyzes user sightings, presenting bird rankings, active user charts, and random bird displays to encourage bird diversity exploration. Bird profiles include accurate drawings, chronologically ordered lists, average appearances through **Chart.js** visualizations, and maps with bird pin locations based on the coordinates of reported sightings.

User profiles enable owners to manage their sightings, including deletion.

Ornitwo prioritizes **mobile use**, offering a responsive layout for larger screens.

Join us in the world of birdwatching with Ornitwo!
