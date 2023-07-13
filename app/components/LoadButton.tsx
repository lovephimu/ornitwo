'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  buttonText: string;
  buttonLink: string;
};

export default function BasicButton(props: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <button
        className="flex items-center font-mono px-8 py-4 border border-yellow-550 border-dotted rounded-full bg-gray-800 active:text-red-550"
        onClick={() => {
          setLoading(true);
          router.replace(props.buttonLink as Route);
        }}
      >
        <span className="text-center text-2xl underline px-4">
          {props.buttonText}
        </span>
      </button>
      {loading && (
        <progress className="left-0 top-0 w-screen progress progress-warning absolute" />
      )}
    </>
  );
}
