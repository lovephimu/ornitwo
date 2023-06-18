// import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex flex-grow justify-center items-center">
        <h1 className="font-serif font-semibold text-6xl">orniTwo</h1>
      </section>
      <section className="flex flex-col self-start w-full h-1/4 text-3xl">
        <div className="flex font-mono font-light bg-gray-775 w-full justify-center h-1/2 items-center">
          Explore
        </div>
        <div className="flex font-mono font-light bg-gray-750 w-full justify-center  h-1/2 items-center">
          Report
        </div>
      </section>
    </main>
  );
}
