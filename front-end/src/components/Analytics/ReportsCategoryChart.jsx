import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ReportsCategoryChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [{
      data: data.map(item => item.value),
      backgroundColor: data.map(item => item.color || 
        item.category === 'Safety' ? '#EF4444' :
        item.category === 'Payment' ? '#F59E0B' :
        item.category === 'Harassment' ? '#8B5CF6' :
        item.category === 'Misconduct' ? '#3B82F6' :
        item.category === 'Fraud' ? '#10B981' :
        '#665345'
      ),
      borderWidth: 1,
      borderColor: '#FFFFFF'
    }]
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
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    cutout: '65%'
  };

  return <Doughnut data={chartData} options={options} />;
};

export default ReportsCategoryChart;