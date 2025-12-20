import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ListingPerformanceChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Approved',
        data: data.map(item => item.approved),
        backgroundColor: '#10B981', // Success color
        borderColor: '#10B981',
        borderWidth: 1,
        borderRadius: 6
      },
      {
        label: 'Pending',
        data: data.map(item => item.pending),
        backgroundColor: '#F59E0B', // Warning color
        borderColor: '#F59E0B',
        borderWidth: 1,
        borderRadius: 6
      },
      {
        label: 'Rejected',
        data: data.map(item => item.rejected),
        backgroundColor: '#EF4444', // Error color
        borderColor: '#EF4444',
        borderWidth: 1,
        borderRadius: 6
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
            const label = context.dataset.label || '';
            return `${label}: ${context.parsed.y}`;
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
          color: '#665345'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(232, 219, 199, 0.5)'
        },
        ticks: {
          color: '#665345'
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default ListingPerformanceChart;