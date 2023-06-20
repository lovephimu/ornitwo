'use client';

import { useRouter } from 'next/navigation';

export default function ExploreButton() {
  const router = useRouter();

  return (
    <button
      className="flex font-mono font-light bg-gray-775 w-full justify-center h-1/2 items-center"
      onClick={() => {
        router.refresh();
        router.push('/explore');
      }}
    >
      Explore
    </button>
  );
}
