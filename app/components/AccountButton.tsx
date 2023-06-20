import { useRouter } from 'next/navigation';

type Props = {
  userId: number;
};

export default function AccountButton(props: Props) {
  const router = useRouter();

  return (
    <button
      className="font-mono text-xl"
      onClick={() => {
        router.refresh();
        router.push(`/report/account/${props.userId}`);
      }}
    >
      Logout
    </button>
  );
}

// Account button that dynamically forwards to account page of logged in user.
