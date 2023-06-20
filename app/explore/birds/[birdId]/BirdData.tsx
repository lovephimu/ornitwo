'use client';

import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import LoadingStatement from '../../../components/LoadingStatement';
import { capitalizeFirstLetter } from '../../../functions/capitalizeFirstLetter';

type Props = {
  birdId: string;
};

type SightingByBird = {
  id: number;
  userData: {
    id: number;
    username: string;
  };
  location: string;
  timeStamp: string;
  birdData: {
    name: string;
    species: string;
  };
};

const sightingsQuery = gql`
  query SightingsByBird($sightingsByBirdId: ID!) {
    sightingsByBird(id: $sightingsByBirdId) {
      userData {
        id
        username
      }
      location
      timeStamp
      birdData {
        name
        species
      }
    }
  }
`;

export default function BirdData(props: Props) {
  const { loading, error, data } = useQuery(sightingsQuery, {
    variables: { sightingsByBirdId: props.birdId },
    fetchPolicy: 'cache-first',
  });
  if (error) {
    console.log(error);
  }
  if (loading) {
    return <LoadingStatement />;
  }
  return (
    <section>
      <section className="flex flex-col w-full bg-gray-775 items-center">
        <h1 className="font-serif font-semibold text-5xl pt-8">
          {capitalizeFirstLetter(data.sightingsByBird[0].birdData.name)}
        </h1>
        <h2 className="text-2xl pt-4">
          {data.sightingsByBird[0].birdData.species}
        </h2>
        <Image
          height={600}
          width={600}
          alt="bird portrait"
          src="/images/image_house_sparrow_1.png"
        />
      </section>
      <section className="flex flex-col w-full bg-gray-750 items-center p-8">
        <h2 className="font-mono text-2xl">Average spottings:</h2>
      </section>
      <section className="flex flex-col w-full bg-gray-800 items-center p-8">
        <h2 className="font-mono text-2xl pb-8 ">Last seen by:</h2>
        <div className="flex w-full justify-between font-mono font-light text-xl border-b border-dotted border-yellow-550">
          <span className="flex flex-grow">User</span>
          <span className="flex w-1/4 justify-end">...at,</span>
          <span className="flex w-1/6 justify-end">on:</span>
        </div>
        {data.sightingsByBird.map((sighting: SightingByBird) => {
          return (
            <div
              key={`sighting-${sighting.id}`}
              className="flex w-full pt-4 font-sans font-extralight border-b border-dotted justify-between border-gray-950"
            >
              <span className="flex flex-grow font-bold">
                {sighting.userData.username}
              </span>
              <span className="w-1/4 text-right">{sighting.location} </span>
              <span className="flex text-right justify-end w-1/6 font-bold">
                {sighting.timeStamp}
              </span>
            </div>
          );
        })}
      </section>
    </section>
  );
}
