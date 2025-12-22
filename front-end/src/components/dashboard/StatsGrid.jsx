import React from 'react';
import StatCard from './StatCard';
import { statsData } from '../../data/mockData';

const StatsGrid = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          increase={stat.increase}
          subtext={stat.subtext}
        />
      ))}
    </section>
  );
};

export default StatsGrid;