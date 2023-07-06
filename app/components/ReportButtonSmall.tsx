import { Route } from 'next';
import Link from 'next/link';

// server side button

export default function ReportButtonSmall() {
  return (
    <Link className="font-mono text-xl no-underline" href={'/report' as Route}>
      Report
    </Link>
  );
}
