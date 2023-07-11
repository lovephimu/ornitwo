'use client';

import { gql, useQuery } from '@apollo/client';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AccountButton from '../../components/AccountButton';
import ExploreButton from '../../components/ExploreButton';
import LoadingStatement from '../../components/LoadingStatement';
import LogoutButton from '../../components/LogoutButton';
import ReportButton from '../../components/ReportButton';
import { capitalizeFirstLetter } from '../../functions/capitalizeFirstLetter';
import { capitalizeFirstLetterOnly } from '../../functions/capitalizeFirstLetterOnly';

type Props = {
  sightingId: string;
  token: string;
};

const reportQuery = gql`
  query ReportSummary($sightingId: ID!) {
    sighting(id: $sightingId) {
      id
      userId
      birdId
      location
      timeStamp
      birdData {
        id
        name
        species
      }
      userData {
        username
      }
    }
  }
`;

export default function Summary(props: Props) {
  const { loading, error, data } = useQuery(reportQuery, {
    variables: { sightingId: props.sightingId },
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
        <div className="hidden md:block ">
          <span className="font-serif font-semibold text-3xl">orniTwo</span>
          <span className="font-mono text-2xl font-normal"> : Report</span>
        </div>
        <div className="md:pr-8 md:ml-auto">
          <LogoutButton token={props.token} />
        </div>
        <AccountButton userId={data.sighting.userId} />
      </section>
      <section className="flex flex-col w-full md:max-w-150">
        <section className="flex flex-col w-full">
          <div className="flex flex-col justify-center w-full pt-12 p-6 items-center font-mono ">
            <h2 className="text-center text-2xl px-8">
              Thanks for your report,{' '}
              {capitalizeFirstLetterOnly(data.sighting.userData.username)}!
            </h2>
            <p className="text-center pt-6">Report summary:</p>
          </div>
        </section>
        <section className="flex flex-col w-full items-center pb-8">
          <div className="bg-transparent border border-dotted border-yellow-550 w-3/4 text-center py-4 font-mono">
            <div className="flex border-b border-dotted border-yellow-550 py-4 text-2xl justify-center">
              <Image
                src="/images/icon_bird.svg"
                height={40}
                width={40}
                alt="Bird Icon"
                className="pr-4"
              />
              <Link
                className="max-w-6/10"
                href={`/explore/birds/${data.sighting.birdData.id}` as Route}
              >
                {capitalizeFirstLetter(data.sighting.birdData.name)}
              </Link>
            </div>
            <p className="border-b border-dotted border-yellow-550 py-4 italic font-light">
              {capitalizeFirstLetterOnly(data.sighting.birdData.species)}
            </p>
            <p className="pt-8 pb-4 font-light">Location:</p>
            <div className="flex w-full px-8 justify-center">
              <div className="flex justify-center pb-4 text-xl">
                <Image
                  src="/images/icon_map_marker.svg"
                  height={40}
                  width={40}
                  alt="Map Icon"
                  className="pr-4"
                />
                <span className="max-w-6/10">{data.sighting.location}</span>
              </div>
            </div>
            <p className="py-4 font-light">Time:</p>
            <div className="flex w-full justify-center">
              <div>
                <Image
                  src="/images/icon_calendar.svg"
                  height={40}
                  width={40}
                  alt="Calendar icon"
                  className="pr-4"
                />
              </div>
              <div className="pb-4 text-xl">{data.sighting.timeStamp}</div>
            </div>
          </div>
        </section>
      </section>
      <section>
        <div className="hidden font-mono md:flex text-2xl">
          <span className="px-8 rounded-full">
            <Link
              className="bg-gray-750 rounded-full px-4 py-2"
              href={'/explore' as Route}
            >
              Explore
            </Link>
          </span>
          <span className="px-8 rounded-full">
            <Link
              className="bg-gray-750 rounded-full px-4 py-2"
              href={'/report' as Route}
            >
              Report
            </Link>
          </span>
        </div>
      </section>
      <section className="flex flex-col flex-grow self-start w-full text-3xl md:hidden bg-gray-800">
        <ExploreButton />
        <ReportButton />
      </section>
    </main>
  );
}
