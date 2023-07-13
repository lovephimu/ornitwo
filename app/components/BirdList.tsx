import { capitalizeFirstLetter } from '../functions/capitalizeFirstLetter';
import { capitalizeFirstLetterOnly } from '../functions/capitalizeFirstLetterOnly';

type Props = {
  data: {
    birds: [
      {
        name: string;
        species: string;
        id: string;
      },
    ];
  };
};

export default function BirdList(props: Props) {
  return (
    <section className="flex flex-col w-full flex-grow p-8 items-center">
      <div className="pt-4">
        <h2 className="font-mono text-2xl text-center pb-8">
          List of supported birds
        </h2>
      </div>
      <div className="w-full font-mono text-xl md:max-w-xl">
        {props.data.birds.map((bird) => {
          return (
            <div
              key={`sighting-${bird.id}`}
              className="flex w-full justify-between mb-8 pb-2 border-b border-dotted border-yellow-550"
            >
              <div className="flex flex-col">
                <span>{capitalizeFirstLetter(bird.name)}</span>
                <span className="text-base font-extralight">
                  {capitalizeFirstLetterOnly(bird.species)}
                </span>
              </div>
              <div>
                <span>copy</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
