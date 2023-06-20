'use client';

import { useRouter } from 'next/navigation';

export default function ReportButton() {
  const router = useRouter();

  return (
    <button
      className="flex font-mono font-light bg-gray-750 w-full justify-center  h-1/2 items-center"
      onClick={() => {
        router.refresh();
        router.push('/report');
      }}
    >
      Report
    </button>
  );
}
