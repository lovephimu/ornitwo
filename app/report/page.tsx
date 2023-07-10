import { Route } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getValidSessionByToken,
} from '../../database/database';
import AccountButton from '../components/AccountButton';
import ExploreButtonSmall from '../components/ExploreButtonSmall';
import ReportForm from './ReportForm';

export default async function ReportPage() {
  // if the user is logged in redirect

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect('/report/login');

  // Get user data by looking for session

  const token = sessionTokenCookie.value;
  const user = await getUserBySessionToken(token);

  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <div className="hidden md:block ">
          <span className="font-serif font-semibold text-3xl">
            <Link className="no-underline" href={'/' as Route}>
              orniTwo
            </Link>
          </span>
          <span className="font-mono text-2xl font-normal"> : Report</span>
        </div>
        <div className="md:pr-8 md:ml-auto">
          <ExploreButtonSmall />
        </div>
        <AccountButton userId={user?.id} />
      </section>
      <section className="flex flex-col items-center w-full md:hidden">
        <h1 className="font-serif font-semibold text-6xl">
          <Link className="no-underline" href={'/' as Route}>
            orniTwo
          </Link>
        </h1>
        <div className="flex justify-center w-full pt-4 pb-6">
          <Image
            src="/images/icon_report.svg"
            height={40}
            width={40}
            alt="Report icon"
            className="pr-4"
          />
          <h2 className="font-mono text-2xl">Report</h2>
        </div>
      </section>
      <section className="flex flex-grow w-full bg-gray-775 justify-center">
        <section className="w-full md:w-200">
          <ReportForm matchingUserId={user!.id} />
        </section>
      </section>
    </main>
  );
}
