import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import useAxios from '../../hooks/useAxios'
import useRoles from '../../hooks/useRoles'
import useAuth from '../../hooks/useAuth'
import ManagerApprovalPending from '../ManagerApprovalPending/ManagerApprovalPending'

const PendingOrders = () => {
    const axiosSecure = useAxios()
    const users = useRoles()
    const { user } = useAuth()
    
    const isSuspended = users?.status === "suspended"

    const { data: myPendingorders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?sellerEmail=${user?.email}`)
            return res.data
        }
    })

    const pendingOrders = myPendingorders.filter(orders => orders?.status === "Pending")

    const handleApproveOrder = async (order) => {
        if (isSuspended) return;
        
        try {
            const res = await axiosSecure.patch(`/orders/${order._id}`, {
                status: 'Approved'
            });

            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success('Order approved and product quantity updated!');
            }
        } catch (error) {
            console.error('Error approving order:', error);
            toast.error(error.response?.data?.message || 'Sorry, something went wrong!');
        }
    };

    const handleRejectOrder = async (id) => {
        if (isSuspended) return;
        
        try {
            const res = await axiosSecure.patch(`/orders/${id}`, {
                status: 'Rejected'
            });

            if (res.data.modifiedCount > 0) {
                refetch()
                toast.success('Order Rejected!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Sorry, something went wrong!')
        }
    }

    if (isLoading) return <Spinner />
    if (users?.role === "manager" & users?.status === "pending") return <ManagerApprovalPending></ManagerApprovalPending>

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Pending Orders</h1>
            
            {/* Suspension Notice */}
            {isSuspended && (
                <div className="bg-warning/20 text-warning-content p-4 rounded-lg mb-6 border border-warning">
                    <p className="font-semibold">Your account is currently suspended. You cannot approve or reject orders.</p>
                </div>
            )}

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {pendingOrders.length === 0 ? (
                    <div className="text-center py-10 shadow rounded-lg">
                        <p className="text-gray-500">No orders found</p>
                    </div>
                ) : (
                    pendingOrders.map((order) => (
                        <div
                            key={order._id}
                            className="shadow rounded-lg p-4 border border-gray-100"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold">{order.productTitle}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Order ID: {order._id}
                                    </p>
                                    <p className="text-xs text-gray-300 mt-1">
                                        Customer: {order.firstName} {order.lastName}
                                    </p>
                                    <p className="text-xs text-gray-300 mt-1"> Order Date:{" "}
                                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}{" "}
                                        {new Date(order.orderDate).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className='mb-2'>
                                <p className="text-gray-500 text-xs">Quantity</p>
                                <p className="font-medium">{order.quantity}</p>
                            </div>

                            <div className='flex gap-2'>
                                <button 
                                    onClick={() => handleApproveOrder(order)} 
                                    disabled={isSuspended}
                                    className={`btn flex-1 ${isSuspended ? 'btn-disabled opacity-50 cursor-not-allowed' : 'btn-success text-white'}`}
                                >
                                    Approve
                                </button>
                                <button 
                                    onClick={() => handleRejectOrder(order._id)} 
                                    disabled={isSuspended}
                                    className={`btn flex-1 ${isSuspended ? 'btn-disabled opacity-50 cursor-not-allowed' : 'btn-error text-white'}`}
                                >
                                    Reject
                                </button>
                                <Link to={`order-details/${order._id}`}>
                                    <button className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors flex-1">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto shadow rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="p-3 text-left font-semibold">Order ID</th>
                            <th className="p-3 text-left font-semibold">Customer</th>
                            <th className="p-3 text-left font-semibold">Product</th>
                            <th className="p-3 text-left font-semibold">Quantity</th>
                            <th className="p-3 text-left font-semibold">Order Date</th>
                            <th className="p-3 text-center font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendingOrders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            pendingOrders.map((order) => (
                                <tr key={order._id} className="border-b">
                                    <td className="p-3 font-mono text-gray-600">{order._id}</td>
                                    <td className="p-3">{order.firstName} {order.lastName}</td>
                                    <td className="p-3 font-medium">{order.productTitle}</td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">
                                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}{" "}
                                        {new Date(order.orderDate).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </td>

                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleApproveOrder(order)} 
                                                disabled={isSuspended}
                                                className={`py-2 px-3 rounded text-sm font-medium transition-colors ${isSuspended ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-success hover:bg-success/90 text-white'}`}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleRejectOrder(order._id)} 
                                                disabled={isSuspended}
                                                className={`py-2 px-3 rounded text-sm font-medium transition-colors ${isSuspended ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-error hover:bg-error/90 text-white'}`}
                                            >
                                                Reject
                                            </button>
                                            <Link to={`order-details/${order._id}`}>
                                                <button className="py-2 px-3 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors">
                                                    View
                                                </button>
                                            </Link>
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

export default PendingOrders