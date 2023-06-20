'use client';

import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getUserBySessionToken } from '../../database/database';
import { getCookie } from '../../util/cookies';
import { getSafeReturnToPath } from '../../util/validation';

const createSightingMutation = gql`
  mutation CreateSighting(
    $userId: Int!
    $birdName: String!
    $location: String
    $timeStamp: String
  ) {
    createSighting(
      userId: $userId
      birdName: $birdName
      location: $location
      timeStamp: $timeStamp
    ) {
      birdId
      location
      timeStamp
      userId
    }
  }
`;

type Props = {
  matchingUserId: number;
};

// async function setSummaryCookie(
//   birdName: string,
//   species: string,
//   location: string,
//   timeStamp: string,
// ) {
//   const reportSummary = {test: test}
//   await cookies().set('reportSummary', reportSummary);
// }

export default function ReportForm(props: Props) {
  const [birdName, setBirdName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [onError, setOnError] = useState('');

  const router = useRouter();

  const [sightingHandler] = useMutation(createSightingMutation, {
    variables: {
      userId: props.matchingUserId,
      birdName: birdName,
      location: location,
      timeStamp: time,
    },
    onError: (error) => {
      setOnError(error.message);
      console.log(onError);
    },
    onCompleted: () => {
      router.refresh();
      router.push(`/report/summary` as Route);
    },
  });

  return (
    <form className="flex flex-col items-center font-sans font-extralight text-xl">
      <label htmlFor="birdName" className="font-mono p-4">
        Bird name:
      </label>
      <input
        id="birdName"
        value={birdName}
        onChange={(event) => {
          setBirdName(event.currentTarget.value);
        }}
        required
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center"
      />

      <label htmlFor="location" className=" font-mono pt-8 pb-4">
        Place:
      </label>
      <input
        id="location"
        value={location}
        onChange={(event) => {
          setLocation(event.currentTarget.value);
        }}
        required
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center"
      />

      <label htmlFor="time" className="font-mono pt-8 pb-4">
        Time:
      </label>
      <input
        id="time"
        value={time}
        onChange={(event) => {
          setTime(event.currentTarget.value);
        }}
        required
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center"
      />
      <button
        className="font-mono m-8 px-8 py-4 border border-dotted border-black rounded-full bg-gray-800"
        formAction={async () => {
          await sightingHandler();
        }}
      >
        Send report
      </button>
    </form>
  );
}
