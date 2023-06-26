'use client';

import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import { useRouter } from 'next/navigation';

type Prop = {
  token: string | undefined;
};

const logoutMutation = gql`
  mutation Logout($token: String!) {
    logout(token: $token) {
      token
    }
  }
`;

export default function LogoutButton(props: Prop) {
  const router = useRouter();
  const [logoutHandler] = useMutation(logoutMutation, {
    variables: { token: props.token },
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => {
      router.refresh();
      router.push(`/` as Route);
    },
  });

  if (!props.token) {
    return (
      <button
        className="font-mono text-xl"
        onClick={() => {
          router.refresh();
          router.push('/report/login' as Route);
        }}
      >
        Login
      </button>
    );
  }

  return (
    <button
      className="font-mono text-xl"
      onClick={async () => {
        await logoutHandler();
      }}
    >
      Logout
    </button>
  );
}
