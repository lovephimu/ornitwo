import { Route } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../../../../database/database';
import ExploreButtonSmall from '../../../components/ExploreButtonSmall';
import LogoutButton from '../../../components/LogoutButton';
import ReportButtonSmall from '../../../components/ReportButtonSmall';
import AccountData from './AccountData';

type Props = {
  params: { userId: string };
};

export const dynamic = 'force-dynamic';

export default async function AccountPage(props: Props) {
  // check for seesion cookie and pass to logout button
  const sessionTokenCookie = cookies().get('sessionToken');

  const token = sessionTokenCookie?.value;

  const compareUser = token ? await getUserBySessionToken(token) : undefined;

  const isOwner =
    compareUser?.id === parseInt(props.params.userId) ? true : false;

  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <div className="hidden md:block ">
          <span className="font-serif font-semibold text-3xl">
            <Link className="no-underline" href={'/' as Route}>
              orniTwo
            </Link>
          </span>
          <span className="font-mono text-2xl font-normal"> : Explore</span>
        </div>
        <div className="flex md:pr-8 md:ml-auto">
          <div className="hidden md:block mr-8">
            <ReportButtonSmall />
          </div>
          <LogoutButton token={token} />
        </div>
        <ExploreButtonSmall />
      </section>
      <AccountData userId={props.params.userId} isOwner={isOwner} />
    </main>
  );
}
