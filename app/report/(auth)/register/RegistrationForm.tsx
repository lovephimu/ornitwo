'use client';
import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../../util/validation';

type Props = { returnTo?: string | string[] };

const signUpMutation = gql`
  mutation SignUp($username: String!, $passwordToHash: String!) {
    createNewUser(username: $username, passwordToHash: $passwordToHash) {
      username
      id
    }
  }
`;

export default function RegistrationForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [registrationHandler] = useMutation(signUpMutation, {
    variables: { username: username, passwordToHash: password },
    onError: (error) => {
      setOnError(error.message);
      console.log(onError);
    },

    onCompleted: () => {
      router.refresh();
      router.push(getSafeReturnToPath(props.returnTo) || (`/report` as Route));
    },
  });

  return (
    <form className="flex flex-col items-center font-sans font-extralight text-xl w-full md:max-w-2xl">
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
        className="font-mono m-8 px-8 py-4 border border-dotted border-black rounded-full bg-gray-800 hover:text-yellow-550 active:text-red-550"
        formAction={async () => {
          await registrationHandler();
        }}
      >
        Sign up
      </button>
      <p className="text-red-550">{onError ? onError : ''}</p>
      <section className="flex w-full justify-center font-mono p-8 text-xl">
        <Link className="font-normal" href={'/report/register' as Route}>
          or switch to login
        </Link>
      </section>
    </form>
  );
}
