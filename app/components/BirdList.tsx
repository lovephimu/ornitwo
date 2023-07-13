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
    <section className="flex w-full flex-grow p-8">
      <div className="w-full font-mono text-xl">
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
