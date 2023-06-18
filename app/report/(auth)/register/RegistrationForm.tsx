'use client';
import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
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
    <form className="flex flex-col items-center font-sans font-extralight text-xl">
      <label htmlFor="username" className="p-4">
        Username
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
      <label htmlFor="password" className="p-4">
        Password
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
        formAction={async () => {
          await registrationHandler();
        }}
      >
        Login
      </button>
    </form>
  );
}
