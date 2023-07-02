'use client';

import { gql, useQuery } from '@apollo/client';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MostSeenBirdsDoughnut from '../../../charts/mostSeenBirds';
import ExploreButton from '../../../components/ExploreButton';
import LoadingStatement from '../../../components/LoadingStatement';
import ReportButton from '../../../components/ReportButton';
import { capitalizeFirstLetter } from '../../../functions/capitalizeFirstLetter';
import { capitalizeFirstLetterOnly } from '../../../functions/capitalizeFirstLetterOnly';
import { formatDate } from '../../../functions/formatDate';
import { sortUserSightingsByDate } from '../../../functions/sortUserSightingsByDate';

type Props = {
  userId: string;
};

type SortedUserSighting = {
  id: string | number;
  birdId: string | number;
  name: string;
  species: string;
  location: string;
  time: Date;
};

export type UserSightingResponse = {
  user: {
    username: string;
    sightings: UserSighting[];
  };
};

export type UserSighting = {
  birdData: {
    id: number;
    name: string;
    species: string;
  };
  timeStamp: string;
  location: string;
  id: number;
};

const userQuery = gql`
  query UserQuery($userId: ID!) {
    user(id: $userId) {
      username
      sightings {
        birdData {
          id
          name
          species
        }
        timeStamp
        location
        id
      }
    }
  }
`;

export default function AccountData(props: Props) {
  const { loading, error, data } = useQuery(userQuery, {
    variables: { userId: props.userId },
    fetchPolicy: 'cache-first',
  });
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    return <LoadingStatement />;
  }

  return (
    <main className="w-full items-center h-screen md:bg-gray-775">
      <section className="md:flex md:flex-row">
        <section className="flex flex-col  w-full md:w-1/3 bg-gray-775">
          <div className="flex flex-col justify-center items-center w-full pt-12">
            <h2 className="font-mono text-2xl">Profile</h2>
            <h1 className="font-serif font-semibold text-5xl py-8">
              {data.user.username}
            </h1>
            <div className="flex flex-grow">
              <Image
                width={500}
                height={500}
                src="/images/image_userpic_2.png"
                alt="user profile picture"
              />
            </div>
          </div>
        </section>
        {!data.user.sightings[0] ? (
          <section>
            <div className="flex flex-col w-full justify-center items-center font-mono py-8 h-80">
              <h2 className="font-mono text-2xl">To soon!</h2>
              <p className="p-8 text-center">
                {capitalizeFirstLetter(data.user.username)} has not yet posted
                any reports.
              </p>
            </div>
          </section>
        ) : (
          <section className="md:flex md:flex-row w-full md:w-2/3 md:h-auto md:pt-28 ">
            <section className="flex flex-col w-full bg-gray-800 md:bg-gray-775 items-center p-8">
              <h2 className="font-mono text-2xl ">Most spotted birds:</h2>
              <div className="flex justify-center w-full p-8">
                <MostSeenBirdsDoughnut data={data} />
              </div>
            </section>
            <section className="flex flex-col flex-grow w-full bg-gray-775 p-8 items-center">
              <h2 className="font-mono text-2xl pb-8 ">Last sightings:</h2>
              <div className="flex w-full justify-between font-mono font-light text-xl border-b border-dotted border-yellow-550">
                <span className="flex flex-grow">I saw a...</span>
                <span className="flex justify-end">...on, at:</span>
              </div>
              {sortUserSightingsByDate(data).map(
                (sighting: SortedUserSighting) => {
                  return (
                    <div
                      key={`sightingId ${sighting.id}`}
                      className="w-full pt-4 font-sans font-extralight border-b border-dotted justify-between border-gray-950"
                    >
                      <div className="flex w-full text-xl">
                        <span className="flex flex-grow font-bold w-1/4">
                          <Link
                            href={`/explore/birds/${sighting.birdId}` as Route}
                          >
                            {capitalizeFirstLetter(sighting.name)}
                          </Link>
                        </span>
                        <span className="flex text-right justify-end w-1/6 font-bold">
                          {formatDate(sighting.time)}
                        </span>
                      </div>
                      <div className="flex w-full pt-2 pb-2">
                        <span className="flex flex-grow w-1/4 italic">
                          {capitalizeFirstLetterOnly(sighting.species)}
                        </span>
                        <span className="flex flex-grow" />
                        <span className="w-1/2 text-right">
                          {sighting.location}{' '}
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </section>
          </section>
        )}
        <section className="md:hidden flex flex-col self-start w-full h-60 text-3xl">
          <ExploreButton />
          <ReportButton />
        </section>
      </section>
    </main>
  );
}
