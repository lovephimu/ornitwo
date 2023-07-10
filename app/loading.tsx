import { Route } from 'next';
import Link from 'next/link';
import ExploreButtonSmall from './components/ExploreButtonSmall';
import LoadingStatement from './components/LoadingStatement';

export default function RootLoading() {
  return (
    <main className="h-screen ">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <div className="">
          <span className="font-serif font-semibold text-3xl">
            <Link className="no-underline" href={'/' as Route}>
              orniTwo
            </Link>
          </span>
        </div>
        <ExploreButtonSmall />
      </section>
      <section className="flex flex-col flex-grow justify-center w-full mt-20 items-center">
        <LoadingStatement />
      </section>
    </main>
  );
}
