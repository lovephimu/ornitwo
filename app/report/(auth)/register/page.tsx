import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/database';
import RegistrationForm from './RegistrationForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegistrationPage({ searchParams }: Props) {
  // if the user is logged in redirect

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (session) redirect('/report');

  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex self-start w-full h-1/4 justify-center items-end pb-12">
        <h1 className="font-serif font-semibold text-3xl">orniTwo</h1>
      </section>
      <section className="flex flex-col flex-grow w-full bg-gray-775">
        <div className="flex justify-center w-full pt-12 pb-6">
          <h2 className="font-mono text-2xl">Register</h2>
        </div>
        <RegistrationForm returnTo={searchParams.returnTo} />
      </section>
    </main>
  );
}
