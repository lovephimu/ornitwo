import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { testData } from './testData';

Chart.register(CategoryScale);

export default function MonthSum() {
  const chartData = {
    labels: testData.map((data) => data.month),
    datasets: [
      {
        label: 'Spotted: ',
        data: testData.map((data) => data.sum),
        borderColor: '#FBB159',
        borderWidth: 2,
        pointBackgroundColor: '#FBB159',
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              ticks: { color: '#FBB159' },
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
