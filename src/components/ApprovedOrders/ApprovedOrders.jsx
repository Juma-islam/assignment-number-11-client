import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router'; 
import LoadingSpinner from '../Shared/LoadingSpinner';
import useAxios from '../../hooks/useAxios';
import useRoles from '../../hooks/useRoles';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import ManagerApprovalPending from '../ManagerApprovalPending/ManagerApprovalPending';

const ApprovedOrders = () => {
  const axiosSecure = useAxios();
  const users = useRoles();
  const { user } = useAuth();
  const modalRef = useRef();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      orderStatus: '',
      note: '',
    },
  });

  const { data: myApprovedOrders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?sellerEmail=${user?.email}`);
      return res.data;
    },
  });

  const approvedOrders = myApprovedOrders.filter(
    (order) => order?.status === 'Approved' || order?.status === 'Delivered'
  );

  const getLatestTracking = (order) => {
    if (!order.trackingHistory || order.trackingHistory.length === 0) {
      return {
        orderStatus: order.status || 'Approved',
        entryDate: order.updatedAt || order.createdAt,
        location: '',
        note: '',
      };
    }
    const latest = order.trackingHistory[order.trackingHistory.length - 1];
    return {
      orderStatus: latest.orderStatus || order.status,
      entryDate: latest.entryDate || order.updatedAt,
      location: latest.location || '',
      note: latest.note || '',
    };
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    const latest = getLatestTracking(order);
    reset({
      location: latest.location,
      orderStatus: latest.orderStatus,
      note: latest.note,
    });
    modalRef.current.showModal();
  };

  const onSubmit = async (data) => {
    const updateData = {
      status: data.orderStatus,
      location: data.location,
      note: data.note,
    };

    try {
      
      const res = await axiosSecure.patch(`/orders/${selectedOrder._id}`, updateData);

      if (res.data.modifiedCount > 0) {
        toast.success('Tracking updated successfully!');
        modalRef.current.close();
        refetch();
        reset();
      } else {
        toast.error('No changes detected!');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Update failed!');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (users?.role === 'manager' && users?.status === 'pending')
    return <ManagerApprovalPending />;

  const getStatusBadge = (status) => {
    const badges = {
      'In Production': 'badge badge-info',
      'Quality Check Started': 'badge badge-warning',
      'Quality Check Passed': 'badge badge-success',
      Packed: 'badge badge-primary',
      Shipped: 'badge badge-accent',
      Delivered: 'badge badge-success',
      Approved: 'badge badge-secondary',
    };
    return <span className={`badge ${badges[status] || 'badge badge-ghost'} badge-lg`}>{status}</span>;
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <title>Approved Orders - Manager Dashboard</title>
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Approved Orders</h1>

      <div className="grid grid-cols-1 md:hidden gap-6">
        {approvedOrders.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <p className="text-xl text-gray-500">No approved orders yet</p>
          </div>
        ) : (
          approvedOrders.map((order) => {
            const latest = getLatestTracking(order);
            return (
              <div key={order._id} className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{order.productTitle}</h3>
                      <p className="text-sm text-gray-500">Order ID: {order._id.slice(-8)}</p>
                    </div>
                    {getStatusBadge(latest.orderStatus)}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Customer</p>
                      <p className="font-medium">{order.firstName} {order.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-medium">{order.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Update</p>
                      <p className="font-medium text-xs">
                        {new Date(latest.entryDate).toLocaleDateString()} <br />
                        {new Date(latest.entryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="card-actions mt-5 flex gap-3">
                    <button
                      onClick={() => handleOpenModal(order)}
                      disabled={latest.orderStatus === 'Delivered'}
                      className="btn btn-primary flex-1"
                    >
                      Add Tracking
                    </button>
                    <Link to={`/dashboard/view-tracking/${order._id}`} className="flex-1">
                      <button className="btn btn-outline btn-secondary w-full">View Timeline</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
          <table className="table table-zebra w-full">
            <thead className="bg-gradient-to-r from-primary to-secondary text-white">
              <tr>
                <th className="py-5 text-left">Order ID</th>
                <th className="py-5 text-left">Customer</th>
                <th className="py-5 text-left">Product</th>
                <th className="py-5 text-center">Qty</th>
                <th className="py-5 text-center">Current Status</th>
                <th className="py-5 text-center">Last Updated</th>
                <th className="py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-gray-500 text-xl">
                    No approved orders found
                  </td>
                </tr>
              ) : (
                approvedOrders.map((order) => {
                  const latest = getLatestTracking(order);
                  return (
                    <tr key={order._id} className="hover:bg-base-200 transition-colors">
                      <td className="py-5 font-mono text-sm">{order._id.slice(-10)}</td>
                      <td className="py-5 font-medium">{order.firstName} {order.lastName}</td>
                      <td className="py-5 font-semibold text-primary">{order.productTitle}</td>
                      <td className="py-5 text-center font-bold">{order.quantity}</td>
                      <td className="py-5 text-center">{getStatusBadge(latest.orderStatus)}</td>
                      <td className="py-5 text-center text-sm">
                        {new Date(latest.entryDate).toLocaleDateString('en-GB')} <br />
                        <span className="text-gray-500">
                          {new Date(latest.entryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="py-5 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenModal(order)}
                            disabled={latest.orderStatus === 'Delivered'}
                            className="btn btn-sm btn-primary"
                          >
                            Add Tracking
                          </button>
                          <Link to={`view-tracking/${order._id}`}>
                            <button className="btn btn-sm btn-outline btn-secondary">
                              View Timeline
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl">
          <button
            onClick={() => {
              modalRef.current.close();
              reset();
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            ✕
          </button>

          <h3 className="font-bold text-2xl mb-6 text-center">Update Tracking</h3>

          {selectedOrder && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-base-200 p-4 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500">Product</p>
                  <p className="font-semibold">{selectedOrder.productTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-sm">{selectedOrder._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="label font-semibold">Current Location</label>
                  <input
                    {...register('location', { required: 'Location is required' })}
                    className="input input-bordered w-full"
                    placeholder="e.g., Factory Floor, Dhaka Warehouse"
                  />
                  {errors.location && <p className="text-error text-sm">{errors.location.message}</p>}
                </div>

                <div>
                  <label className="label font-semibold">Production/Shipping Status</label>
                  <select
                    {...register('orderStatus', { required: 'Status is required' })}
                    className="select select-bordered w-full"
                  >
                    <option value="In Production">In Production</option>
                    <option value="Quality Check Started">Quality Check Started</option>
                    <option value="Quality Check Passed">Quality Check Passed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  {errors.orderStatus && <p className="text-error text-sm">{errors.orderStatus.message}</p>}
                </div>

                <div>
                  <label className="label font-semibold">Notes (Optional)</label>
                  <textarea
                    {...register('note')}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    placeholder="Any additional info..."
                  />
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn btn-primary btn-lg w-full">
                    Update Tracking
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ApprovedOrders;