import { cookies } from 'next/headers';
import {
  getUserBySessionToken,
  getValidSessionByToken,
} from '../../../../database/database';
import AccountButton from '../../../components/AccountButton';
import ExploreButtonSmall from '../../../components/ExploreButtonSmall';
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
        <ExploreButtonSmall />
        <AccountButton userId={user?.id} />
      </section>
      <section className="flex flex-col w-full bg-gray-775">
        <div className="flex flex-col justify-center items-center w-full pt-12">
          <h2 className="font-mono text-2xl">Bird profile</h2>
        </div>
      </section>
      <BirdData birdId={props.params.birdId} />
    </main>
  );
}
