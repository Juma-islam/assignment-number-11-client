import React from 'react';
import { FaEye, FaTruck, FaCheckCircle, FaClock, FaUserCircle } from 'react-icons/fa';

export const RecentOrders = ({ orders = [], title = "Recent Orders" }) => {
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <FaCheckCircle className="w-6 h-6 text-green-500" />;
      case 'Shipped': return <FaTruck className="w-6 h-6 text-blue-500" />;
      case 'In Production': return <FaTruck className="w-6 h-6 text-purple-500" />;
      default: return <FaClock className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'badge-success';
      case 'Shipped': return 'badge-info';
      case 'In Production': return 'badge-secondary';
      case 'Approved': return 'badge-primary';
      case 'Pending': return 'badge-warning';
      case 'Rejected': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5);

  if (recentOrders.length === 0) {
    return (
      <div className="card shadow-xl bg-base-100 border border-base-300 rounded-2xl">
        <div className="card-body">
          <h3 className="card-title text-xl mb-6">{title}</h3>
          <div className="flex flex-col items-center justify-center py-12">
            <FaTruck className="w-16 h-16 text-base-content/20 mb-4" />
            <p className="text-lg text-base-content/60">No orders found</p>
            <p className="text-sm text-base-content/40 mt-1">Orders will appear here once placed</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-xl hover:shadow-2xl transition-shadow bg-base-100 border border-base-300 rounded-2xl">
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="card-title text-xl">{title}</h3>
          <div className="badge badge-lg badge-primary font-bold">
            Total: {orders.length}
          </div>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order._id} className="flex items-center justify-between p-4 bg-base-200/50 hover:bg-base-200 rounded-xl transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <FaUserCircle className="w-10 h-10 text-base-content/30" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">#{order._id?.slice(-8)}</p>
                    <div className="tooltip" data-tip={order._id}>
                      <FaEye className="w-4 h-4 text-base-content/50" />
                    </div>
                  </div>
                  <p className="font-medium">{order.firstName} {order.lastName}</p>
                  <p className="text-sm text-base-content/60 truncate">{order.buyerEmail}</p>
                  <p className="text-sm text-base-content/70 mt-1 truncate" title={order.productTitle}>
                    {order.productTitle}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">${order.orderPrice?.toLocaleString()}</p>
                <p className="text-sm text-base-content/60">Qty: {order.quantity}</p>
              </div>

              <div className="ml-6 text-center">
                {getStatusIcon(order.status)}
                <div className={`badge badge-lg mt-2 ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
                <p className="text-xs mt-2">
                  {order.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ Pending'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-base-300">
          <div className="flex justify-center">
            <p className="text-sm text-base-content/70">
              Showing {recentOrders.length} of {orders.length} recent orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};