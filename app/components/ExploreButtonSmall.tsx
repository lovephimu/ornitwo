'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

export default function ExploreButtonSmall() {
  const router = useRouter();

  return (
    <button
      className="font-mono text-xl"
      onClick={() => {
        router.refresh();
        router.push('/explore' as Route);
      }}
    >
      Explore
    </button>
  );
}

// Account button that dynamically forwards to account page of logged in user.
