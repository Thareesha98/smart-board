import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PerformanceChart = ({ title, chartData }) => {
  if (!chartData) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#332720',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        cornerRadius: 10
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(232, 219, 199, 0.5)', drawBorder: false },
        ticks: { color: '#665345', font: { size: 11 } }
      },
      x: { 
        grid: { display: false },
        ticks: { color: '#665345', font: { size: 11 } }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-large shadow-custom border border-transparent hover:border-accent/10 transition-all duration-300">
      <h3 className="text-text-dark font-bold text-lg mb-6">{title}</h3>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerformanceChart;