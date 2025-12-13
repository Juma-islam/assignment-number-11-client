// ManagerDashboard.jsx - Updated
import React from 'react';
import { 
  FaIndustry, FaClipboardCheck, FaCog, FaCheckCircle 
} from 'react-icons/fa';
import { UserHeader } from './Matched/UserHeader';
import { StatsCards } from './Matched/StatsCards';
import { RecentOrders } from './Matched/Tables/RecentOrders';
import { OrderStatusChart } from './Matched/OrderStatusChart';
import { ProductsTable } from './Matched/Tables/ProductsTable';
// import { UserHeader } from './common/UserHeader';
// import { StatsCards } from './common/StatsCard';
// import { OrderStatusChart } from './common/Charts/OrderStatusChart';
// import { RecentOrders } from './common/Tables/RecentOrders';
// import { ProductsTable } from './common/Tables/ProductsTable';

export const ManagerDashboard = ({ 
  userData, 
  user, 
  products = [], 
  orders = [] 
}) => {
  const pendingProduction = orders.filter(o => o.status === 'Approved').length;
  const needsApproval = orders.filter(o => o.status === 'Pending').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalProductsValue = products.reduce((sum, p) => sum + (p.price * p.availableQuantity), 0);

  const managerStats = [
    {
      title: 'My Products',
      value: products.length,
      change: products.length > 0 ? '+Active' : 'No products',
      icon: <FaIndustry className="text-2xl" />,
      color: 'from-blue-500 to-blue-600',
      details: 'Total listed products',
      subValue: `Value: $${(totalProductsValue/1000).toFixed(1)}K`
    },
    {
      title: 'Pending Approval',
      value: needsApproval,
      change: needsApproval > 0 ? 'Action required' : 'All approved',
      icon: <FaClipboardCheck className="text-2xl" />,
      color: 'from-yellow-500 to-yellow-600',
      details: 'Orders waiting approval',
      subValue: 'Click to review'
    },
    {
      title: 'In Production',
      value: pendingProduction,
      change: pendingProduction > 0 ? 'In progress' : 'No production',
      icon: <FaCog className="text-2xl" />,
      color: 'from-purple-500 to-purple-600',
      details: 'Currently manufacturing',
      subValue: 'Monitor progress'
    },
    {
      title: 'Completed Orders',
      value: completedOrders,
      change: completedOrders > 0 ? 'Delivered' : 'None delivered',
      icon: <FaCheckCircle className="text-2xl" />,
      color: 'from-green-500 to-green-600',
      details: 'Successfully delivered',
      subValue: `${((completedOrders/orders.length)*100 || 0).toFixed(1)}% success rate`
    }
  ];

  return (
    <div className="space-y-6">
      <UserHeader
        userData={userData}
        user={user}
        role="manager"
        gradient="from-green-600 to-teal-600"
        title="Manager Dashboard"
        subtitle={`Welcome, ${userData?.name || 'Manager'}!`}
        additionalInfo={`Managing ${products.length} Products • ${orders.length} Orders`}
      />
      
      <StatsCards stats={managerStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderStatusChart orders={orders} />
        
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">Production Progress</h3>
            <div className="space-y-4">
              {[
                { stage: 'Design', progress: 75, color: 'bg-blue-500' },
                { stage: 'Cutting', progress: 60, color: 'bg-purple-500' },
                { stage: 'Sewing', progress: 85, color: 'bg-pink-500' },
                { stage: 'Quality Check', progress: 45, color: 'bg-yellow-500' },
                { stage: 'Packaging', progress: 30, color: 'bg-green-500' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.stage}</span>
                    <span className="font-bold">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={orders} title="My Recent Orders" />
        <ProductsTable products={products.slice(0, 5)} title="My Products" />
      </div>
    </div>
  );
};