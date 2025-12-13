import React from 'react';
import { FaEye, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

export const RecentOrders = ({ orders = [], title = "Recent Orders" }) => {
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <FaCheckCircle className="text-green-500" />;
      case 'Shipped': return <FaTruck className="text-blue-500" />;
      case 'In Production': return <FaTruck className="text-purple-500" />;
      default: return <FaClock className="text-yellow-500" />;
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
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-4">{title}</h3>
          <div className="text-center py-8">
            <FaTruck className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No orders found</p>
            <p className="text-sm text-gray-400 mt-1">Orders will appear here once placed</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">{title}</h3>
          <div className="badge badge-primary">
            Total: {orders.length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="font-mono text-xs">
                    <div className="tooltip" data-tip={order._id}>
                      #{order._id?.slice(-8)}
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium">{order.firstName} {order.lastName}</p>
                      <p className="text-xs text-gray-500">{order.buyerEmail}</p>
                    </div>
                  </td>
                  <td>
                    <div className="max-w-[150px] truncate" title={order.productTitle}>
                      {order.productTitle}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">${order.orderPrice?.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {order.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ Pending'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {recentOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};