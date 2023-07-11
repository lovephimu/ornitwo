import { gql } from '@apollo/client';
import { getClient } from '../../util/apolloClient';
import TopTenUsers from '../charts/topTenUsers';
import LoadingStatement from './LoadingStatement';

// const sightingsQuery = gql`
//   query Sightings {
//     sightings {
//       userId
//       userData {
//         username
//       }
//     }
//   }
// `;

export default async function TopTenChart() {
  const { data, loading, error } = await getClient().query({
    query: gql`
      query Sightings {
        sightings {
          userId
          userData {
            username
          }
        }
      }
    `,
  });

  if (loading) {
    return <LoadingStatement />;
  }
  if (error) {
    return <p className="font-mono">Unable to load ranking</p>;
  }

  return <TopTenUsers data={data} />;
}
