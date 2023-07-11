'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

export default function ExploreButtonSmall() {
  const router = useRouter();

  return (
    <button
      className="font-mono text-xl"
      onClick={() => {
        router.replace('/explore' as Route);
      }}
    >
      Explore
    </button>
  );
}
