'use client';

import { gql, useQuery } from '@apollo/client';
import TopTenUsers from '../charts/topTenUsers';
import LoadingStatement from './LoadingStatement';

const sightingsQuery = gql`
  query Sightings {
    sightings {
      userId
      userData {
        username
      }
    }
  }
`;

export default function TopTenChart() {
  const { loading, error, data } = useQuery(sightingsQuery, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) {
    return <LoadingStatement />;
  }
  if (error) {
    return <p className="font-mono">Unable to load ranking</p>;
  }

  return <TopTenUsers data={data} />;
}
