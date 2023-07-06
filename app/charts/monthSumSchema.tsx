import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { monthSum, SightingsResponse } from '../functions/monthSum';

Chart.register(CategoryScale);

type Props = {
  data: SightingsResponse;
};

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function MonthSum(props: Props) {
  const summedValues = monthSum(props.data);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Spotted: ',
        data: summedValues,
        borderColor: '#FBB159',
        borderWidth: 2,
        pointBackgroundColor: '#FBB159',
      },
    ],
  };

  return (
    <div className="flex items-center justify-center w-full h-60 md:h-80">
      <Line
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
            },
          },
        }}
      />
    </div>
  );
}
