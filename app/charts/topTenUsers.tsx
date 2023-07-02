import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { ExploreQuery } from '../explore/Statistics';
import { capitalizeFirstLetter } from '../functions/capitalizeFirstLetter';
import { rankUsers } from '../functions/rankUsers';

Chart.register(CategoryScale);

type Props = {
  data: ExploreQuery;
};

export default function TopTenUsers(props: Props) {
  const inputData = rankUsers(props.data);

  const chartData = {
    labels: inputData.map((item) => {
      return capitalizeFirstLetter(item.username);
    }),
    datasets: [
      {
        label: 'Sightings: ',
        data: inputData.map((item) => {
          return item.sightings;
        }),
        backgroundColor: [
          '#FBB159FF',
          '#FBB159CC',
          '#FBB15999',
          '#FBB15966',
          '#FBB15933',
        ],
        borderWidth: 2,
        borderColor: '#FBB159',
      },
    ],
  };

  return (
    <div className="flex justify-center w-full h-72 md:h-32">
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              ticks: { color: '#FBB159', stepSize: 5 },
              grid: {
                color: '#1F2937',
              },
            },
            x: {
              ticks: { color: '#FBB159' },
              grid: {
                color: '#1F2937',
              },
            },
          },
          plugins: {
            title: {
              display: false,
              text: 'Bird sightings',
            },
            legend: {
              display: false,
              labels: {
                color: '#FBB159',
              },
            },
          },
        }}
      />
    </div>
  );
}
