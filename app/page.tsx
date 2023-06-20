// import Image from 'next/image';

import ExploreButton from './components/ExploreButton';
import ReportButton from './components/ReportButton';

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex flex-grow justify-center items-center">
        <h1 className="font-serif font-semibold text-6xl">orniTwo</h1>
      </section>
      <section className="flex flex-col self-start w-full h-1/4 text-3xl">
        <ExploreButton />
        <ReportButton />
      </section>
    </main>
  );
}
