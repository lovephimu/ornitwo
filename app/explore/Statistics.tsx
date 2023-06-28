'use client';

import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import TopTenUsers from '../charts/topTenUsers';
import LoadingStatement from '../components/LoadingStatement';
import { capitalizeFirstLetter } from '../functions/capitalizeFirstLetter';
import { capitalizeFirstLetterOnly } from '../functions/capitalizeFirstLetterOnly';
import { rankBirds } from '../functions/rankBirds';

export type ExploreQuery = {
  sightings: [ExploreSighting];
};

export type ExploreSighting = {
  userId: string | number;
  birdId: string | number;
  location: string;
  timeStamp: string;
  birdData: {
    name: string;
    species: string;
  };
  userData: {
    username: string;
  };
};

const sightingsQuery = gql`
  query Sightings {
    sightings {
      userId
      birdId
      location
      timeStamp
      birdData {
        name
        species
      }
      userData {
        username
      }
    }
  }
`;

export default function Statistics() {
  const { loading, error, data } = useQuery(sightingsQuery, {
    fetchPolicy: 'cache-first',
  });
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    return <LoadingStatement />;
  }

  const birdRanking = rankBirds(data);

  return (
    <>
      <section className="p-8 w-full bg-gray-775">
        <div className="font-mono text-2xl text-center pb-8">
          <h2>Bird ranking</h2>
          <p className="text-base pt-2">most seen species</p>
        </div>
        <div className="h-150 py-4 relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-4">
            <div className="border-4 border-dotted border-yellow-550 h-80 w-80">
              <Image
                src="/images/image_house_sparrow_1.png"
                alt="most seen bird"
                fill
              />
            </div>
            <div className="flex items-center pt-4">
              <div className="flex items-start">
                <span className="font-serif text-5xl">1</span>
                <span className="font-serif text-base pr-4">st</span>
              </div>
              <div>
                <p className="text-xl font-mono">
                  {capitalizeFirstLetter(birdRanking[0]!.birdName)}
                </p>
                <p className="text-base">
                  {capitalizeFirstLetterOnly(birdRanking[0]!.species)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end absolute top-1/4 transform -translate-y-1/2 right-0">
            <div className="border-2 border-dotted border-yellow-550 h-40 w-40">
              <Image
                src="/images/image_house_sparrow_1.png"
                alt="most seen bird"
                fill
              />
            </div>
            <div className="flex items-center pt-2">
              <div>
                <p className="text-base font-mono text-right">
                  {capitalizeFirstLetter(birdRanking[1]!.birdName)}
                </p>
                <p className="text-sm text-right">
                  {capitalizeFirstLetterOnly(birdRanking[1]!.species)}
                </p>
              </div>
              <div className="flex items-start">
                <span className="font-serif text-4xl pl-4">2</span>
                <span className="font-serif text-sm">nd</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start absolute top-0 left-0">
            <div className="border border-dotted border-yellow-550 h-32 w-32">
              <Image
                src="/images/image_house_sparrow_1.png"
                alt="most seen bird"
                fill
              />
            </div>
            <div className="flex items-center pt-2">
              <div className="flex items-start">
                <span className="font-serif text-4xl">3</span>
                <span className="font-serif text-sm pr-4">rd</span>
              </div>
              <div>
                <p className="text-base font-mono">
                  {capitalizeFirstLetter(birdRanking[2]!.birdName)}
                </p>
                <p className="text-sm">
                  {capitalizeFirstLetterOnly(birdRanking[2]!.species)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center p-8 w-full">
        <h2 className="font-mono text-2xl pb-8 ">Bird of the week</h2>
        <div className="w-full border border-dotted border-yellow-550 h-100">
          Bird pic and bio
        </div>
      </section>
      <section className="flex flex-col items-center p-8 bg-gray-775 w-full">
        <h2 className="font-mono text-2xl ">Most active users</h2>
        <p className="font-mono text-base pt-2 pb-8">by recent sightings</p>
        <div className="w-full h-80">
          <TopTenUsers data={data} />
        </div>
      </section>
    </>
  );
}
