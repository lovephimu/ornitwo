import { Route } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  getUserBySessionToken,
  getValidSessionByToken,
} from '../../../../database/database';
import AccountButton from '../../../components/AccountButton';
import ExploreButtonSmall from '../../../components/ExploreButtonSmall';
import ReportButtonSmall from '../../../components/ReportButtonSmall';
import BirdData from './BirdData';

type Props = {
  params: {
    birdId: string;
  };
};

export default async function BirdPage(props: Props) {
  // get cookie
  const sessionTokenCookie = cookies().get('sessionToken');
  // look for session in database
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // get token and user data
  const token = sessionTokenCookie?.value;
  let user;
  if (session && token) {
    user = await getUserBySessionToken(token);
  } else {
    user = undefined;
  }
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
            <ExploreButtonSmall />
          </div>
          <ReportButtonSmall />
        </div>
        <AccountButton userId={user?.id} />
      </section>

      <BirdData birdId={props.params.birdId} />
    </main>
  );
}
