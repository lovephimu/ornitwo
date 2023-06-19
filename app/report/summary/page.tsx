export default function SummaryPage() {
  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <p className="font-mono text-xl">Explore</p>
        <p className="font-mono text-xl">Account</p>
      </section>
      <section className="flex flex-col w-full ">
        <div className="flex flex-col justify-center w-full pt-12 p-6 items-center font-mono">
          <h2 className="text-center text-2xl">
            Thanks for your report, (username)
          </h2>
          <p className="text-center pt-6">Report summary:</p>
        </div>
      </section>
      <section className="flex flex-col flex-grow w-full items-center">
        <div className="bg-transparent border border-dotted border-yellow-550 w-3/4 text-center py-4 font-mono">
          <div className="border-b border-dotted border-yellow-550 py-4 text-xl">
            (birdname)
          </div>
          <p className="border-b border-dotted border-yellow-550 py-4 italic font-light">
            (species)
          </p>
          <p className="pt-8 pb-4 font-light">Location:</p>
          <div className="flex justify-center">
            <span>o</span>
            <span className="pb-4 text-xl">(actual location)</span>
          </div>
          <p className="py-4 font-light">Time:</p>
          <div className="flex justify-center">
            <span>o</span>
            <span className="pb-4 text-xl">(actual time)</span>
          </div>
        </div>
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
