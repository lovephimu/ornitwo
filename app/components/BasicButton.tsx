'use client';

import { Route } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  buttonText: string;
  buttonLink: string;
  buttonImage: string;
};

export default function BasicButton(props: Props) {
  const router = useRouter();
  return (
    <button
      className="flex items-center font-mono px-8 py-4 border border-dotted border-black rounded-full bg-gray-800 hover:text-yellow-550 active:text-red-550"
      onClick={() => {
        router.push(props.buttonLink as Route);
      }}
    >
      <Image
        src={`/images/${props.buttonImage}.svg`}
        width={20}
        height={20}
        alt="report icon"
      />
      <span className="text-center text-2xl underline px-4">
        {props.buttonText}
      </span>
    </button>
  );
}
