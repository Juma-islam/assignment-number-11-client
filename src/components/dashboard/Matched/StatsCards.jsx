import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card shadow-lg border border-gray-100">
          <div className="card-body p-4">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div className={`badge ${stat.change.startsWith('+') ? 'badge-success' : 'badge-error'} gap-1`}>
                {stat.change.startsWith('+') ? <FaArrowUp /> : <FaArrowDown />}
                {stat.change}
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
            <p className="font-semibold ">{stat.title}</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm ">{stat.details}</p>
              <p className="text-xs ">{stat.subValue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};