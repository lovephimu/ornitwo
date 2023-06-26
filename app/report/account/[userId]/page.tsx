import { cookies } from 'next/headers';
import { getValidSessionByToken } from '../../../../database/database';
import ExploreButtonSmall from '../../../components/ExploreButtonSmall';
import LogoutButton from '../../../components/LogoutButton';
import AccountData from './AccountData';

type Props = {
  params: { userId: string };
};

export default async function AccountPage(props: Props) {
  // check for seesion cookie and pass to logout button
  const sessionTokenCookie = cookies().get('sessionToken');

  const token = sessionTokenCookie?.value;

  return (
    <main className="flex flex-col w-full items-center h-screen">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <LogoutButton token={token} />
        <ExploreButtonSmall />
      </section>
      <AccountData userId={props.params.userId} />
    </main>
  );
}
