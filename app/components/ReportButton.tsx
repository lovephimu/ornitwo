'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

export default function ReportButton() {
  const router = useRouter();

  return (
    <div className="flex font-mono font-light bg-gray-750 w-full justify-center  h-32 items-center md:hidden">
      <button
        onClick={() => {
          router.refresh();
          router.push('/report' as Route);
        }}
      >
        Report
      </button>
    </div>
  );
}
