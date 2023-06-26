'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

type Props = {
  userId: number | undefined;
};

export default function AccountButton(props: Props) {
  const router = useRouter();

  return (
    <button
      className="font-mono text-xl"
      onClick={() => {
        router.refresh();
        router.push(
          props.userId
            ? (`/report/account/${props.userId}` as Route)
            : ('/report/login' as Route),
        );
      }}
    >
      Account
    </button>
  );
}

// Account button that dynamically forwards to account page of logged in user.
