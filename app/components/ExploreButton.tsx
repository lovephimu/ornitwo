'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ExploreButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex font-mono font-light bg-gray-775 w-full justify-center h-32 items-center md:hidden">
        <button
          onClick={() => {
            setLoading(true);
            router.replace('/explore' as Route);
          }}
        >
          Explore
        </button>
      </div>
      {loading && (
        <progress className="left-0 top-0 w-screen progress progress-warning absolute" />
      )}
    </>
  );
}
