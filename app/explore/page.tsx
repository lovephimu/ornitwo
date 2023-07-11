import { gql } from '@apollo/client';
import { Route } from 'next';
import Link from 'next/link';
import { getClient } from '../../util/apolloClient';
import AccountButtonServerSide from '../components/AccountButtonServerSide';
import ReportButton from '../components/ReportButton';
import ReportButtonSmall from '../components/ReportButtonSmall';
import TopTenChart from '../components/TopTenChart';
import Statistics from './Statistics';

export const dynamic = 'force-dynamic';

export default async function ExplorePage() {
  const { data, loading } = await getClient().query({
    query: gql`
      query Sightings {
        sightings {
          userId
          birdId
          birdData {
            name
            species
          }
        }
      }
    `,
  });

  if (loading) return <p>loading</p>;

  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <div className="hidden md:block ">
          <span className="font-serif font-semibold text-3xl">
            <Link className="no-underline" href={'/' as Route}>
              orniTwo
            </Link>
          </span>
          <span className="font-mono text-2xl font-normal"> : Explore</span>
        </div>
        <div className="md:pr-8 md:ml-auto">
          <ReportButtonSmall />
        </div>
        <AccountButtonServerSide />
      </section>
      <section className="flex flex-col w-full items-center pb-8 md:hidden">
        <h1 className="font-serif font-semibold text-6xl">
          <Link className="no-underline" href={'/' as Route}>
            orniTwo
          </Link>
        </h1>
        <div className="pt-4">
          <h2 className="font-mono text-2xl">Explore</h2>
        </div>
      </section>
      <Statistics data={data} />
      <section className="flex flex-col items-center p-8 bg-gray-775 md:bg-gray-800 w-full md:h-auto">
        <h2 className="font-mono text-2xl ">Most active users</h2>
        <p className="font-mono text-base pt-2 pb-8">by recent sightings</p>
        <div className="flex justify-center items-center w-full sm:h-80 h-60 md:h-auto">
          <TopTenChart />
        </div>
      </section>
      <section className="flex flex-col self-start w-full h-60 text-3xl">
        <ReportButton />
      </section>
    </main>
  );
}
