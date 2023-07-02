'use client';

import { gql, useQuery } from '@apollo/client';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
    <section className="flex flex-col md:flex-row w-full md:h-auto">
      <section className="md:flex md:justify-center p-8 w-full  bg-gray-775">
        <section className="md:w-1/2 md:min-w-120 md:max-w-120">
          <div className="font-mono text-2xl text-center pb-8">
            <h2>Bird ranking</h2>
            <p className="text-base pt-2">most seen species</p>
          </div>
          <div className="h-150 py-4 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-4">
              <div className="flex justify-center items-center border-4 border-dotted border-yellow-550 h-80 w-80">
                <Image
                  src={`/images/image_bird_${birdRanking[0]?.birdId}.png`}
                  alt="most seen bird"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex items-center pt-4">
                <div className="flex items-start">
                  <span className="font-serif text-5xl">1</span>
                  <span className="font-serif text-base pr-4">st</span>
                </div>
                <div>
                  <Link
                    href={`/explore/birds/${birdRanking[0]!.birdId}` as Route}
                  >
                    <p className="text-xl font-mono">
                      {capitalizeFirstLetter(birdRanking[0]!.birdName)}
                    </p>
                  </Link>
                  <p className="text-base">
                    {capitalizeFirstLetterOnly(birdRanking[0]!.species)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end absolute top-1/4 transform -translate-y-1/2 right-0">
              <div className="flex justify-center items-center border-2 border-dotted border-yellow-550 h-40 w-40">
                <Image
                  src={`/images/image_bird_${birdRanking[1]?.birdId}.png`}
                  alt="most seen bird"
                  width={150}
                  height={150}
                />
              </div>
              <div className="flex items-center pt-2">
                <div>
                  <Link
                    href={`/explore/birds/${birdRanking[1]!.birdId}` as Route}
                  >
                    <p className="text-base font-mono text-right">
                      {capitalizeFirstLetter(birdRanking[1]!.birdName)}
                    </p>
                  </Link>
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
              <div className="flex justify-center items-center border border-dotted border-yellow-550 h-32 w-32">
                <Image
                  src={`/images/image_bird_${birdRanking[2]?.birdId}.png`}
                  alt="most seen bird"
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex items-center pt-2">
                <div className="flex items-start">
                  <span className="font-serif text-4xl">3</span>
                  <span className="font-serif text-sm pr-4">rd</span>
                </div>
                <div>
                  <Link
                    href={`/explore/birds/${birdRanking[2]!.birdId}` as Route}
                  >
                    <p className="text-base font-mono">
                      {capitalizeFirstLetter(birdRanking[2]!.birdName)}
                    </p>
                  </Link>
                  <p className="text-sm">
                    {capitalizeFirstLetterOnly(birdRanking[2]!.species)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="md:w-1/3">
        <section className="flex flex-col items-center p-8 w-full md:w-full md:bg-gray-750">
          <h2 className="font-mono text-2xl">Bird of the week</h2>
          <p className="font-mono text-base pt-2 pb-8">
            get to know a new bird
          </p>
          <div className="border border-dotted border-yellow-550 md:h-auto pb-8">
            <div>
              <Image
                src={`/images/image_bird_${3}.png`}
                alt="bird of the week"
                height={400}
                width={400}
                className="p-4"
              />
              <div className="flex flex-col items-center">
                <div className="font-serif text-2xl">Nightingale</div>
                <div>Luscinia megarynchos</div>
                <div className="pt-2">A legendary bird... learn more</div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center p-8 bg-gray-775 md:bg-gray-800 w-full md:h-auto">
          <h2 className="font-mono text-2xl ">Most active users</h2>
          <p className="font-mono text-base pt-2 pb-8">by recent sightings</p>
          <div className="flex justify-center w-full h-80 md:h-auto">
            <TopTenUsers data={data} />
          </div>
        </section>
      </section>
    </section>
  );
}
