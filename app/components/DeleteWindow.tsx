'use client';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { capitalizeFirstLetter } from '../functions/capitalizeFirstLetter';

type Props = {
  isWillingToDelete: boolean;
  deleteId: string | number;
  deleteContent: string;
};

const deleteSightingMutation = gql`
  mutation DeleteMutation($deleteSightingByIdId: ID!) {
    deleteSightingById(id: $deleteSightingByIdId) {
      id
    }
  }
`;

export default function DeleteWindow(props: Props) {
  console.log(props.deleteId);
  const router = useRouter();
  const [isActive, setIsActive] = useState(props.isWillingToDelete);
  const [deleteHandler] = useMutation(deleteSightingMutation, {
    variables: { deleteSightingByIdId: props.deleteId },
    onCompleted: () => {
      console.log('deleted');
      router.refresh();
    },
  });

  // useEffect(() => {
  //   setIsActive(props.isWillingToDelete);
  // }, [isActive]);

  if (isActive) {
    return (
      <section className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-80">
        <div className="bg-gray-800 rounded-md p-12 w-3/4 md:w-1/4 border border-dotted border-yellow-550 flex flex-col justify-center items-center">
          <div className="text-center text-xl font-mono">
            Do you really want to delete your sighting of{' '}
            {capitalizeFirstLetter(props.deleteContent)}?
          </div>
          <div className="pt-8">
            <button
              className="py-4 px-8 font-mono text-2xl border border-dotted border-yellow-550 rounded-full"
              onClick={async () => {
                await deleteHandler();
              }}
            >
              Yes
            </button>
            <button
              className="py-4 px-8 font-mono text-2xl border border-dotted border-yellow-550 rounded-full ml-4"
              onClick={() => {
                setIsActive(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    );
  }

  return <span />;
}
