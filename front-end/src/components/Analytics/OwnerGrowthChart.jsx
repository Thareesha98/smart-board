import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const OwnerGrowthChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Owners',
        data: data.map(item => item.owners || item.value),
        borderColor: '#FF7A00', // Accent color
        backgroundColor: 'rgba(255, 122, 0, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FF7A00',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#332720',
        bodyColor: '#665345',
        borderColor: '#E8DBC7',
        borderWidth: 1,
        cornerRadius: 12,
        callbacks: {
          label: function(context) {
            return `Owners: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#665345',
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(232, 219, 199, 0.5)'
        },
        ticks: {
          color: '#665345',
          font: {
            size: 12
          },
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default OwnerGrowthChart;