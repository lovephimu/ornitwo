import AccountData from './AccountData';

type Props = {
  params: { userId: string };
};

export default function AccountPage(props: Props) {
  return <AccountData token="test" userId={props.params.userId} />;
}
