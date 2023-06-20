'use client';

import { gql, useQuery } from '@apollo/client';
import AccountButton from '../../components/AccountButton';
import ExploreButton from '../../components/ExploreButton';
import LoadingStatement from '../../components/LoadingStatement';
import LogoutButton from '../../components/LogoutButton';
import ReportButton from '../../components/ReportButton';

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
        <LogoutButton token={props.token} />
        <AccountButton userId={data.sighting.userId} />
      </section>
      <section className="flex flex-col w-full ">
        <div className="flex flex-col justify-center w-full pt-12 p-6 items-center font-mono">
          <h2 className="text-center text-2xl px-8">
            Thanks for your report, {data.sighting.userData.username}!
          </h2>
          <p className="text-center pt-6">Report summary:</p>
        </div>
      </section>
      <section className="flex flex-col flex-grow w-full items-center">
        <div className="bg-transparent border border-dotted border-yellow-550 w-3/4 text-center py-4 font-mono">
          <div className="border-b border-dotted border-yellow-550 py-4 text-xl">
            {data.sighting.birdData.name}
          </div>
          <p className="border-b border-dotted border-yellow-550 py-4 italic font-light">
            {data.sighting.birdData.species}
          </p>
          <p className="pt-8 pb-4 font-light">Location:</p>
          <div className="flex justify-center">
            <span className="pr-4">o</span>
            <span className="pb-4 text-xl">{data.sighting.location}</span>
          </div>
          <p className="py-4 font-light">Time:</p>
          <div className="flex justify-center">
            <span className="pr-4">o</span>
            <span className="pb-4 text-xl">{data.sighting.timeStamp}</span>
          </div>
        </div>
      </section>
      <section className="flex flex-col self-start w-full h-1/4 text-3xl">
        <ExploreButton />
        <ReportButton />
      </section>
    </main>
  );
}