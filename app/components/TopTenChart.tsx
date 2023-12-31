'use client';

import { gql, useQuery } from '@apollo/client';
import TopTenUsers from '../charts/topTenUsers';
import LoadingStatement from './LoadingStatement';

const sightingsQuery = gql`
  query SightingsJointUsers {
    sightingsJointUsers {
      userId
      username
    }
  }
`;

export default function TopTenChart() {
  // const { data, loading, error } = await getClient().query({
  //   query: gql`
  //     query Sightings {
  //       sightings {
  //         userId
  //         userData {
  //           username
  //         }
  //       }
  //     }
  //   `,
  // });
  const { loading, error, data } = useQuery(sightingsQuery);
  if (loading) {
    return <LoadingStatement />;
  }
  if (error) {
    return <p className="font-mono">Unable to load ranking</p>;
  }

  return <TopTenUsers data={data} />;
}
