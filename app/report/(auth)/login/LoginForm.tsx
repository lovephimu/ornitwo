'use client';
import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../../util/validation';

type Props = { returnTo?: string | string[] };

const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      id
    }
  }
`;

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [loginHandler] = useMutation(loginMutation, {
    variables: { username: username, password: password },
    onError: (error) => {
      setOnError(error.message);
    },

    onCompleted: () => {
      router.refresh();
      router.push(getSafeReturnToPath(props.returnTo) || (`/report` as Route));
    },
  });

  return (
    <form className="flex flex-col items-center font-sans font-extralight text-xl">
      <label htmlFor="username" className="font-mono pt-8 pb-4">
        Username:
      </label>
      <input
        id="username"
        value={username}
        onChange={(event) => {
          setUsername(event.currentTarget.value);
        }}
        required
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center"
      />
      <label htmlFor="password" className="font-mono pt-8 pb-4">
        Password:
      </label>
      <input
        id="password"
        value={password}
        onChange={(event) => {
          setPassword(event.currentTarget.value);
        }}
        required
        type="password"
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center"
      />
      <button
        className="font-mono m-8 px-8 py-4 border border-dotted border-black rounded-full bg-gray-800"
        formAction={async () => {
          await loginHandler();
        }}
      >
        Login
      </button>
    </form>
  );
}
