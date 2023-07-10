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
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    return <LoadingStatement />;
  }

  return <TopTenUsers data={data} />;
}
