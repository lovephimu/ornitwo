'use client';

import { gql, useMutation } from '@apollo/client';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { decreaseDate, increaseDate } from '../functions/changeDate';
import { formatDate } from '../functions/formatDate';
import { makeMaxRange, makeTimeObject } from '../functions/makeTimeObject';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const createSightingMutation = gql`
  mutation CreateSighting(
    $userId: Int!
    $birdName: String!
    $location: String
    $timeStamp: String
    $lat: Float
    $lng: Float
  ) {
    createSighting(
      userId: $userId
      birdName: $birdName
      location: $location
      timeStamp: $timeStamp
      lat: $lat
      lng: $lng
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
  const [locationError, setLocationError] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    console.log('Updated Latitude:', lat);
    console.log('Updated Longitude:', lng);
    console.log('Updated Location:', location);
  }, [lat, lng, location]);

  const router = useRouter();
  const currentTime = new Date(makeTimeObject(time));
  const initialTime = useRef(currentTime);
  const maxTime = makeMaxRange(time);
  const initialMaxTime = useRef(maxTime);

  const [sightingHandler] = useMutation(createSightingMutation, {
    variables: {
      userId: props.matchingUserId,
      birdName: birdName.toLowerCase(),
      location: location,
      timeStamp: time,
      lat: lat,
      lng: lng,
    },
    onError: (error) => {
      setOnError(error.message);
      setLocationError(false);
    },
    onCompleted: () => {
      router.refresh();
      router.push(`/report/summary` as Route);
    },
  });

  console.log(time);
  console.log(currentTime);
  console.log(maxTime);
  console.log(initialMaxTime.current);
  console.log(formatDate(initialMaxTime.current));

  return (
    <form className="flex flex-col flex-grow items-center font-sans font-extralight text-xl w-full bg-gray-775 pt-8">
      <section>
        <div className="hidden md:flex justify-center w-full pt-4 pb-6 font-normal">
          <Image
            src="/images/icon_report.svg"
            height={40}
            width={40}
            alt="Report icon"
            className="pr-4"
          />
          <h2 className="font-mono text-2xl">Report</h2>
        </div>
      </section>
      <label htmlFor="birdName" className="font-mono p-4">
        Bird name:
      </label>
      <input
        id="birdName"
        placeholder="Enter common name"
        value={birdName}
        onChange={(event) => {
          setBirdName(event.currentTarget.value);
          setOnError('');
        }}
        required
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center autofill:bg-gray-700"
      />
      <span>
        {onError ? (
          <p className="pt-4 text-red-400 text-sm h-8">
            {onError}{' '}
            <Link href={'/explore/birdlist' as Route}>See bird list.</Link>
          </p>
        ) : (
          ''
        )}
      </span>
      <span className="text-sm pt-2">
        {!birdName ? (
          <div className="flex items-center text-black">
            <div className="flex items-center h-8 pr-2" />
          </div>
        ) : onError ? (
          <div className="flex items-center text-black">
            <div className="flex items-center pr-2" />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex items-center h-8 pr-2">
              <Image
                alt="unchecked"
                src="/images/icon_check.svg"
                height={15}
                width={15}
              />
            </div>
            <div className="flex items-start text-sm h-8 pt-2">Bird set!</div>
          </div>
        )}
      </span>
      {/* <label htmlFor="location" className=" font-mono pt-8 pb-4">
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
      /> */}
      <span className=" font-mono pt-4 pb-4">Place:</span>
      <Autocomplete
        className="bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center autofill:bg-gray-700"
        apiKey={apiKey}
        options={{
          types: ['geocode'],
          componentRestrictions: { country: 'at' },
          fields: ['address_components', 'geometry'],
        }}
        onPlaceSelected={(place) => {
          const lati = place.geometry.location.lat();
          const long = place.geometry.location.lng();
          setLat(lati);
          setLng(long);
          setLocation(
            place.address_components[0].long_name +
              ', ' +
              place.address_components[2].long_name,
          );
          setLocationError(false);
        }}
      />
      <span>
        {locationError ? (
          <p className="pt-4 text-red-400 text-sm h-8">Location not set!</p>
        ) : (
          ''
        )}
      </span>
      <span className="text-sm pt-2">
        {!location && !locationError ? (
          <div className="flex items-center text-black">
            <div className="flex items-center h-8 pr-2" />
          </div>
        ) : locationError ? (
          <span />
        ) : (
          <div className="flex items-center">
            <div className="flex items-center h-8 pr-2">
              <Image
                alt="unchecked"
                src="/images/icon_check.svg"
                height={15}
                width={15}
              />
            </div>
            <div className="flex items-start text-sm h-8 pt-2">
              Location set!
            </div>
          </div>
        )}
      </span>
      <label htmlFor="time" className="font-mono pt-4 pb-4">
        Date:
      </label>

      <div className="flex bg-transparent border border-dotted border-yellow-550 p-4 w-3/4 text-center autofill:bg-gray-700">
        {makeTimeObject(time) > initialMaxTime.current ? (
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
          setLocationError(true);
          location ? await sightingHandler() : setLocationError(true);
        }}
      >
        Send report
      </button>
    </form>
  );
}
