import React from 'react'
import useAxios from '../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'


const MyOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxios()

  const { data: myOrders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`)
      return res.data
    }
  })

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {myOrders.length === 0 ? (
          <div className="text-center py-10 bg-white shadow rounded-lg">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          myOrders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{order.productTitle}</h3>
                  <p className="text-xs text-gray-500 mt-1">Order ID: {order._id}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    order.status === "Shipped"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Quantity</p>
                  <p className="font-medium">{order.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors flex-1">
                  View Details
                </button>
                <button className="btn btn-error text-white rounded text-sm font-medium transition-colors flex-1">
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Order ID</th>
              <th className="p-3 text-left font-semibold">Product</th>
              <th className="p-3 text-left font-semibold">Quantity</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Payment</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              myOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-gray-600">{order._id}</td>
                  <td className="p-3 font-medium">{order.productTitle}</td>
                  <td className="p-3">{order.quantity}</td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="p-3">{order.paymentMethod}</td>

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors">
                        View Details
                      </button>
                      <button className="btn btn-error text-white rounded text-sm font-medium transition-colors">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrders