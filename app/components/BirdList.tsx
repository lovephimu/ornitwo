'use client';
import { capitalizeFirstLetter } from '../functions/capitalizeFirstLetter';
import { capitalizeFirstLetterOnly } from '../functions/capitalizeFirstLetterOnly';
import { copyToClipBoard } from '../functions/copyToClipBoard';

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
    <section className="flex flex-col item-center md:items-start w-full flex-grow p-8 ">
      <div className="pt-4">
        <h2 className="md:pl-8 font-mono text-2xl text-center pb-8">
          List of supported birds
        </h2>
      </div>
      <div className="w-full font-mono text-xl md:max-w-xl md:pl-16">
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
                <button
                  className="text-sm md:text-xl"
                  onClick={async () => {
                    await copyToClipBoard(bird.name);
                  }}
                >
                  copy
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
