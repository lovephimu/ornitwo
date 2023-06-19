import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getValidSessionByToken,
} from '../../database/database';
import { getCookie } from '../../util/cookies';
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
        <p className="font-mono text-xl">Explore</p>
        <p className="font-mono text-xl">Account</p>
      </section>
      <section className="flex flex-col flex-grow w-full bg-gray-775">
        <div className="flex justify-center w-full pt-12 pb-6">
          <h2 className="font-mono text-2xl">Report</h2>
        </div>
        <ReportForm matchingUserId={user!.id} />
      </section>
    </main>
  );
}
