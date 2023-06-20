type Props = {
  params: {
    birdId: string;
  };
};

export default function BirdPage(props: Props) {
  return <h1>individual bird {props.params.birdId}</h1>;
}
