'use client';

import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { decreaseDate, increaseDate } from '../functions/changeDate';
import { formatDate } from '../functions/formatDate';
import { makeMaxRange, makeTimeObject } from '../functions/makeTimeObject';

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

export default function ReportForm(props: Props) {
  const [birdName, setBirdName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState(formatDate(new Date()));
  const [onError, setOnError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const currentTime = new Date(makeTimeObject(time));
  const initialTime = useRef(currentTime);
  const maxTime = makeMaxRange(time);
  const initialMaxTime = useRef(maxTime);
  console.log(initialMaxTime);

  const [sightingHandler] = useMutation(createSightingMutation, {
    variables: {
      userId: props.matchingUserId,
      birdName: birdName.toLowerCase(),
      location: location,
      timeStamp: time,
    },
    onError: (error) => {
      setOnError(error.message);
      setLoading(false);
    },
    onCompleted: () => {
      router.refresh();
      router.push(`/report/summary` as Route);
    },
  });

  return (
    <form className="flex flex-col items-center font-sans font-extralight text-xl">
      <label htmlFor="birdName" className="font-mono p-4">
        Bird name (common name):
      </label>
      <input
        id="birdName"
        value={birdName}
        onChange={(event) => {
          setBirdName(event.currentTarget.value);
        }}
        required
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center autofill:bg-gray-700"
      />
      <span>
        {onError ? <p className="pt-4 text-red-400">{onError}</p> : ''}
      </span>

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
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center autofill:bg-gray-700"
      />

      <label htmlFor="time" className="font-mono pt-8 pb-4">
        Date:
      </label>
      <div className="flex bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center autofill:bg-gray-700">
        {time > formatDate(initialMaxTime.current) ? (
          <button
            onClick={(event) => {
              event.preventDefault();
              setTime(formatDate(decreaseDate(time)));
            }}
            className="flex justify-center w-1/4 font-bold items-center"
          >
            <Image
              src="/images/icon_arrow.svg"
              alt="select previous day"
              width={20}
              height={20}
            />
          </button>
        ) : (
          <span className="w-1/4" />
        )}
        <span className="bg-transparent autofill:bg-gray-700 text-center w-2/4">
          {time}
        </span>
        {time === formatDate(initialTime.current) ? (
          <span />
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              setTime(formatDate(increaseDate(time)));
            }}
            className="flex justify-center w-1/4 font-bold items-center"
          >
            <Image
              src="/images/icon_arrow.svg"
              alt="select following day"
              width={20}
              height={20}
              className="rotate-180"
            />
          </button>
        )}
      </div>
      <button
        className="font-mono m-8 px-8 py-4 border border-dotted border-black rounded-full bg-gray-800"
        formAction={async () => {
          setLoading(true);
          await sightingHandler();
        }}
      >
        Send report
      </button>
      <span>{loading ? 'Loading...' : ''}</span>
    </form>
  );
}
