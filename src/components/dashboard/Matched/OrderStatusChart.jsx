import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  ResponsiveContainer
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
  
  if (chartData.length === 0) {
    return (
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-4">Order Status Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No orders data available</p>
              <p className="text-sm text-gray-400">Orders will appear here once placed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalOrders = orders.length;

  return (
    <div className="card shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">Order Status Distribution</h3>
          <div className="badge badge-lg badge-primary">
            Total: {totalOrders}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => {
                  const percent = (value / totalOrders * 100).toFixed(1);
                  return [`${value} orders (${percent}%)`, props.payload.name];
                }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span className="text-sm text-gray-700">
                    {value} ({((entry.payload.value / totalOrders) * 100).toFixed(1)}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-base-200 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-sm font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};