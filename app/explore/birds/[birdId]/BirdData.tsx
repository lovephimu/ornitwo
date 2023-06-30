'use client';

import { gql, useQuery } from '@apollo/client';
import { Route } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import MonthSum from '../../../charts/monthSumSchema';
import ExploreButton from '../../../components/ExploreButton';
import LoadingStatement from '../../../components/LoadingStatement';
import ReportButton from '../../../components/ReportButton';
import { capitalizeFirstLetter } from '../../../functions/capitalizeFirstLetter';
import { capitalizeFirstLetterOnly } from '../../../functions/capitalizeFirstLetterOnly';
import { formatDate } from '../../../functions/formatDate';
import { sortBirdSightingsByDate } from '../../../functions/sortBirdSightingByDate';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SightingMap = dynamic(() => import('../../../components/SightingMap'), {
  ssr: false,
});

type Props = {
  birdId: string;
};

export type SightingsByBirdResponse = {
  sightingsByBird: SightingByBird[];
};

export type SightingByBird = {
  id: number;
  userData: {
    id: number;
    username: string;
  };
  location: string;
  timeStamp: string;
  lat: number;
  lng: number;
  birdData: {
    name: string;
    species: string;
  };
};

const sightingsQuery = gql`
  query SightingsByBird($sightingsByBirdId: ID!, $birdId: ID!) {
    sightingsByBird(id: $sightingsByBirdId) {
      userData {
        id
        username
      }
      location
      id
      timeStamp
      lat
      lng
      birdData {
        name
        species
      }
    }
    bird(id: $birdId) {
      name
      species
      bio
      id
    }
  }
`;

export default function BirdData(props: Props) {
  const { loading, error, data } = useQuery(sightingsQuery, {
    variables: { sightingsByBirdId: props.birdId, birdId: props.birdId },
    fetchPolicy: 'cache-first',
  });
  if (error) {
    console.log(error);
  }
  if (loading) {
    return <LoadingStatement />;
  }
  const sortedBirdsArray = sortBirdSightingsByDate(data);

  return (
    <section className="w-full">
      <section className="flex flex-col w-full bg-gray-775 items-center">
        <h1 className="font-serif font-semibold text-5xl pt-8 text-center">
          {capitalizeFirstLetter(data.bird.name)}
        </h1>
        <h2 className="text-2xl py-4">
          {capitalizeFirstLetterOnly(data.bird.species)}
        </h2>

        <Image
          height={600}
          width={600}
          alt="bird portrait"
          src={`/images/image_bird_${data.bird.id}.png`}
        />
        {data.bird.bio ? (
          <h3 className="font-serif font-semibold text-3xl p-8">
            {capitalizeFirstLetter(data.bird.bio)}
          </h3>
        ) : (
          <span />
        )}
      </section>
      {!data.sightingsByBird[0] ? (
        <div className="flex flex-col w-full justify-center items-center h-96 font-mono">
          <h2 className="font-mono text-2xl ">Sad news!</h2>
          <p className="p-8 text-center">
            Noone has seen {capitalizeFirstLetter(data.bird.name)} in a while!
            Have you? Be the first to{' '}
            <Link href={'/report' as Route}>report it.</Link>
          </p>
        </div>
      ) : (
        <>
          <section className="flex flex-col w-full bg-gray-750 items-center p-8">
            <h2 className="font-mono text-2xl">Average spottings:</h2>

            <div className="flex pt-8 w-full justify-center">
              <MonthSum data={data} />
            </div>
          </section>
          <section className="flex flex-col w-full bg-gray-800 items-center p-8">
            <h2 className="font-mono text-2xl pb-8 ">Last seen by:</h2>

            <div className="pb-8 w-full">
              <div className="flex w-full justify-between font-mono font-light text-xl border-b border-dotted border-yellow-550">
                <span className="flex flex-grow">User...</span>
                <span className="flex justify-end">...on, at</span>
              </div>
              {sortedBirdsArray.map((sighting) => {
                return (
                  <div
                    key={`sighting-${sighting.id}`}
                    className="flex flex-col w-full pt-4 pb-2 font-sans font-extralight border-b border-dotted justify-between border-gray-950"
                  >
                    <div className="flex w-full text-xl">
                      <span className="flex flex-grow font-bold">
                        <Link
                          href={`/report/account/${sighting.userId}` as Route}
                        >
                          {sighting.username}
                        </Link>
                      </span>
                      <span className=" text-right w-1/6 font-bold">
                        {formatDate(sighting.time)}
                      </span>
                    </div>
                    <div className="flex w-full pt-2 justify-end">
                      <span className="flex">{sighting.location} </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="flex justify-center w-full">
            <h2 className="font-mono text-2xl ">Last seen at:</h2>
          </section>
          <section className="pb-8">
            <SightingMap coordinates={sortedBirdsArray} />
          </section>
        </>
      )}
      <section className="flex flex-col self-start w-full h-60 text-3xl">
        <ExploreButton />
        <ReportButton />
      </section>
    </section>
  );
}
