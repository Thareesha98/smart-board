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
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueGrowthChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        borderColor: '#FF7A00', // Accent color
        backgroundColor: 'rgba(255, 122, 0, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
        pointBackgroundColor: '#FF7A00',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Growth %',
        data: data.map(item => item.growth),
        borderColor: '#10B981', // Success color
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
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
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#332720',
        bodyColor: '#665345',
        borderColor: '#E8DBC7',
        borderWidth: 1,
        cornerRadius: 12,
        callbacks: {
          label: function(context) {
            if (context.dataset.label === 'Revenue') {
              return `Revenue: Rs. ${context.parsed.y.toLocaleString()}`;
            } else {
              return `Growth: ${context.parsed.y}%`;
            }
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
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        grid: {
          color: 'rgba(232, 219, 199, 0.5)'
        },
        ticks: {
          color: '#665345',
          callback: function(value) {
            return 'Rs. ' + value.toLocaleString();
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: '#665345',
          callback: function(value) {
            return value + '%';
          }
        },
        suggestedMax: Math.max(...data.map(item => item.growth)) * 1.2 || 20
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default RevenueGrowthChart;