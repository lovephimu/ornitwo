import { Route } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../../database/database';

export default async function AccountButtonServerSide() {
  const sessionTokenCookie = cookies().get('sessionToken');
  const token = sessionTokenCookie ? sessionTokenCookie.value : undefined;
  const user = token ? await getUserBySessionToken(token) : undefined;

  return (
    <Link
      className="font-mono text-xl no-underline"
      href={
        user
          ? (`/report/account/${user.id}` as Route)
          : ('/report/login' as Route)
      }
    >
      Account
    </Link>
  );
}

// Account button that dynamically forwards to account page of logged in user.
