import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

export const RevenueChart = ({ timeRange, onTimeRangeChange, orders = [] }) => {
  const calculateRevenueData = () => {
    const now = new Date();
    const dataMap = {};
    
    if (timeRange === 'week') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      days.forEach(day => {
        dataMap[day] = { day, revenue: 0, orders: 0 };
      });
      
      orders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const dayDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff < 7) {
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][orderDate.getDay()];
          if (dataMap[dayName]) {
            dataMap[dayName].revenue += order.orderPrice || 0;
            dataMap[dayName].orders += 1;
          }
        }
      });
      
      return Object.values(dataMap);
    }
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthMap = {};
    
    orders.forEach(order => {
      const orderDate = new Date(order.orderDate);
      const monthIndex = orderDate.getMonth();
      const monthName = months[monthIndex];
      const year = orderDate.getFullYear();
      const key = `${monthName} ${year}`;
      
      if (!monthMap[key]) {
        monthMap[key] = { month: key, revenue: 0, orders: 0 };
      }
      
      monthMap[key].revenue += order.orderPrice || 0;
      monthMap[key].orders += 1;
    });
    
    const sortedMonths = Object.values(monthMap)
      .sort((a, b) => {
        const monthA = months.indexOf(a.month.split(' ')[0]);
        const monthB = months.indexOf(b.month.split(' ')[0]);
        return monthA - monthB;
      })
      .slice(-6);
    
    return sortedMonths;
  };

  const chartData = calculateRevenueData();
  
  if (chartData.length === 0 || chartData.every(item => item.revenue === 0)) {
    return (
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title">Revenue Trend</h3>
            <select 
              className="select select-bordered select-sm" 
              value={timeRange} 
              onChange={(e) => onTimeRangeChange(e.target.value)}
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">No revenue data available</p>
              <p className="text-sm text-gray-300">Start receiving orders to see revenue trends</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">Revenue Trend</h3>
          <select 
            className="select select-bordered select-sm" 
            value={timeRange} 
            onChange={(e) => onTimeRangeChange(e.target.value)}
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={timeRange === 'week' ? 'day' : 'month'} 
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                  if (name === 'orders') return [value, 'Orders'];
                  return [value, name];
                }}
                labelFormatter={(label) => `Period: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.3} 
                name="Revenue"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.2} 
                name="Orders"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-300">Revenue (USD)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-300">Orders Count</span>
          </div>
        </div>
      </div>
    </div>
  );
};