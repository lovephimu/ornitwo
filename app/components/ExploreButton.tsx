'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

export default function ExploreButton() {
  const router = useRouter();

  return (
    <div className="flex font-mono font-light bg-gray-775 w-full justify-center h-32 items-center md:hidden">
      <button
        onClick={() => {
          router.replace('/explore' as Route);
        }}
      >
        Explore
      </button>
    </div>
  );
}
