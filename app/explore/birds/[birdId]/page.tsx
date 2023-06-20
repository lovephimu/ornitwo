import AccountButton from '../../../components/AccountButton';
import ExploreButtonSmall from '../../../components/ExploreButtonSmall';
import BirdData from './BirdData';

type Props = {
  params: {
    birdId: string;
  };
};

export default function BirdPage(props: Props) {
  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <ExploreButtonSmall />
        <AccountButton userId={1} />
      </section>
      <section className="flex flex-col w-full bg-gray-775">
        <div className="flex flex-col justify-center items-center w-full pt-12">
          <h2 className="font-mono text-2xl">Bird profile</h2>
        </div>
      </section>
      <BirdData birdId={props.params.birdId} />
    </main>
  );
}
