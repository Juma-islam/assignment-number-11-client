import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

export const OrderStatusChart = ({ orders = [] }) => {
  const getOrderStatusData = () => {
    const statusCounts = {};
    
    orders.forEach(order => {
      const status = order.status || 'Pending';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    const colors = {
      'Pending': '#F59E0B',
      'Approved': '#3B82F6', 
      'In Production': '#8B5CF6',
      'Shipped': '#6366F1',
      'Delivered': '#10B981',
      'Rejected': '#EF4444'
    };
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      color: colors[status] || '#6B7280'
    }));
  };

  const chartData = getOrderStatusData();
  const totalOrders = orders.length;

  if (chartData.length === 0) {
    return (
      <div className="card shadow-xl bg-base-100 border border-base-300 rounded-2xl">
        <div className="card-body">
          <h3 className="card-title text-xl mb-6">Order Status Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-base-content/60 mb-2">No orders data available</p>
              <p className="text-sm text-base-content/40">Orders will appear here once placed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-sm font-bold">
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  return (
    <div className="card shadow-xl hover:shadow-2xl transition-shadow bg-base-100 border border-base-300 rounded-2xl">
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="card-title text-xl">Order Status Distribution</h3>
          <div className="badge badge-lg badge-primary font-bold">
            Total: {totalOrders}
          </div>
        </div>

        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => {
                  const percent = ((value / totalOrders) * 100).toFixed(1);
                  return `${value} orders (${percent}%)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Total Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-4xl font-bold text-base-content">{totalOrders}</p>
              <p className="text-sm text-base-content/60 mt-1">Total Orders</p>
            </div>
          </div>
        </div>

        {/* Status List */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {chartData.map((item) => {
            const percent = ((item.value / totalOrders) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center justify-between p-4 bg-base-200/50 hover:bg-base-200 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="font-semibold text-base">{item.name}</p>
                    <p className="text-sm text-base-content/60">{percent}%</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-base-content">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};