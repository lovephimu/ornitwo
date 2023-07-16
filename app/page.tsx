// import Image from 'next/image';

import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BasicButton from './components/BasicButton';
import ExploreButton from './components/ExploreButton';
import LoadButton from './components/LoadButton';
import ReportButton from './components/ReportButton';

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex flex-grow flex-col justify-center items-center">
        <Image
          src="/images/image_bird_1.png"
          alt="Title Picture"
          className="hidden md:block pt-8"
          width="200"
          height="200"
        />
        <h1 className="font-serif font-semibold text-6xl md:pt-2">orniTwo</h1>
        <h2 className="pt-8 pb-16 font-mono">a birdwatching web app</h2>
        <div className="hidden md:flex font-mono w-3/4 justify-center gap-x-16">
          <div className="flex flex-col items-center w-1/2 ">
            <div className="flex items-center flex-col w-full text-center max-w-2xl border border-dotted border-yellow-550 rounded-md p-8 min-h-full">
              <div className="w-3/4 flex-grow">
                <h2 className="text-2xl pb-4">Curious?</h2>
                <p className="font-extralight">
                  Interested in checking out the most seen birds and our most
                  active users?
                </p>
                <p className="font-extralight pt-4 pb-8">
                  Then this is the place to go!
                </p>
              </div>
              <LoadButton buttonLink="/explore" buttonText="Explore" />
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2 min-h-150">
            <div className="flex items-center flex-col w-full text-center max-w-2xl border border-dotted border-yellow-550 rounded-md p-8 min-h-full">
              <div className="w-3/4">
                <h2 className="text-2xl pb-4">Seen a bird?</h2>
                <p className="font-extralight">
                  If you would like to test the report function: register & try
                  reporting a 'House Sparrow'
                </p>
                <p className="font-extralight pt-4 pb-8">
                  Or check out our list of{' '}
                  <Link
                    className="text-bold"
                    href={'/explore/birdlist' as Route}
                  >
                    trackable birds.
                  </Link>
                </p>
              </div>
              <BasicButton buttonLink="/report" buttonText="Report" />
            </div>
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
