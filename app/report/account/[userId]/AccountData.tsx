'use client';

import { gql, useQuery } from '@apollo/client';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ExploreButtonSmall from '../../../components/ExploreButtonSmall';
import LoadingStatement from '../../../components/LoadingStatement';
import LogoutButton from '../../../components/LogoutButton';

type Props = {
  token: string;
  userId: string;
};

type Sighting = {
  id: number;
  timeStamp: string;
  location: string;
  birdData: {
    id: number;
    name: string;
    species: string;
  };
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
    console.log(error);
  }
  if (loading) {
    return <LoadingStatement />;
  }

  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <LogoutButton token={props.token} />
        <ExploreButtonSmall />
      </section>
      <section className="flex flex-col w-full bg-gray-775">
        <div className="flex flex-col justify-center items-center w-full pt-12">
          <h2 className="font-mono text-2xl">Profile</h2>
          <h1 className="font-serif font-semibold text-5xl py-8">
            {data.user.username}
          </h1>
          <div className="flex w-full">
            <Image
              width={800}
              height={800}
              src="/images/image_userpic_2.png"
              alt="user profile picture"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col flex-grow w-full bg-gray-750 p-8 items-center">
        <h2 className="font-mono text-2xl pb-8 ">Your sightings:</h2>
        <div className="flex w-full justify-between font-mono font-light text-xl border-b border-dotted border-yellow-550">
          <span className="flex flex-grow">I saw a...</span>
          <span className="flex w-1/4 justify-end">...at,</span>
          <span className="flex w-1/6 justify-end">on:</span>
        </div>
        {data.user.sightings.map((sighting: Sighting) => {
          return (
            <div
              key={`sightingId ${sighting.id}`}
              className="flex w-full pt-4 font-sans font-extralight border-b border-dotted justify-between border-gray-950"
            >
              <Link
                href={`/explore/birds/${sighting.birdData.id}` as Route}
                className="flex font-bold w-1/4"
              >
                {sighting.birdData.name}
              </Link>
              <span className="flex w-1/4 italic">
                {sighting.birdData.species}
              </span>
              <span className="flex flex-grow" />
              <span className="w-1/4 text-right">{sighting.location} </span>
              <span className="flex text-right justify-end w-1/6 font-bold">
                {sighting.timeStamp}
              </span>
            </div>
          );
        })}
      </section>
      <section className="flex flex-col w-full bg-gray-775 items-center">
        <h2 className="font-mono text-2xl py-8 ">Your statistics:</h2>
        <div className="h-1/2">statistic chart</div>
      </section>
    </main>
  );
}
