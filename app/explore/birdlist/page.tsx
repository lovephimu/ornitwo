import { gql } from '@apollo/client';
import { Route } from 'next';
import Link from 'next/link';
import { getClient } from '../../../util/apolloClient';
import AccountButtonServerSide from '../../components/AccountButtonServerSide';
import BirdList from '../../components/BirdList';
import ExploreButton from '../../components/ExploreButton';
import LoadingStatement from '../../components/LoadingStatement';
import ReportButton from '../../components/ReportButton';
import ReportButtonSmall from '../../components/ReportButtonSmall';

export const dynamic = 'force-dynamic';

export default async function BirdListPage() {
  const { data, loading, error } = await getClient().query({
    query: gql`
      query Birds {
        birds {
          name
          species
          id
        }
      }
    `,
  });

  if (loading) return <LoadingStatement />;
  if (error) return <p className="font-mono">Error. Please try again.</p>;

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
      <BirdList data={data} />
      <section className="flex flex-col self-start w-full h-60 text-3xl">
        <ExploreButton />
        <ReportButton />
      </section>
    </main>
  );
}
