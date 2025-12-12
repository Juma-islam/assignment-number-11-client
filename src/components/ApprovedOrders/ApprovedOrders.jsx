import { useQuery } from '@tanstack/react-query'

import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link } from 'react-router'
import useAxios from '../../hooks/useAxios'
import useRoles from '../../hooks/useRoles'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../Shared/LoadingSpinner'
import ManagerApprovalPending from '../ManagerApprovalPending/ManagerApprovalPending'

const ApprovedOrders = () => {
    const axiosSecure = useAxios()
    const users = useRoles()
    const { user } = useAuth()
    const modalRef = useRef()
    const [selectedOrder, setSelectedOrder] = useState(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            location: "",
            orderStatus: "",
            note: ""
        }
    })

    const { data: myApprovedorders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?sellerEmail=${user?.email}`)
            return res.data
        }
    })

    const approvedOrders = myApprovedorders.filter(orders => orders?.status === "Approved" || orders?.status === "Delivered")

    const getLatestTrackingEntry = (order) => {
        if (!order.trackingHistory || order.trackingHistory.length === 0) {
            return {
                orderStatus: order.status || "",
                location: "",
                note: ""
            }
        }

        const latestEntry = order.trackingHistory[order.trackingHistory.length - 1]

        return {
            orderStatus: latestEntry.orderStatus || order.status || "",
            location: latestEntry.location || "",
            note: latestEntry.note || ""
        }
    }

    const handleOpenModal = (order) => {
        setSelectedOrder(order);

        const latestTracking = getLatestTrackingEntry(order);

        reset({
            location: latestTracking.location,
            orderStatus: latestTracking.orderStatus,
            note: latestTracking.note
        });

        modalRef.current.showModal();
    };

    const onSubmit = async (data) => {

        const requestData = {
            status: data.orderStatus,
            location: data.location,
            note: data.note,
        }

        try {
            const res = await axiosSecure.patch(`/orders/${selectedOrder._id}`, requestData)

            if (res.data.modifiedCount > 0) {
                toast.success('Order status updated.')
                modalRef.current.close()
                refetch()
            }
            else {
                toast.error('Order status update failed!')
            }

        } catch (err) {
            console.log(err)
            toast.error('Sorry, something went wrong!')
        }

    }

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    if (isLoading) return <LoadingSpinner />
    if (users?.role === "manager" & users?.status === "pending") return <ManagerApprovalPending></ManagerApprovalPending>

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Approved Orders</h1>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {approvedOrders.length === 0 ? (
                    <div className="text-center py-10 shadow rounded-lg">
                        <p className="text-gray-500">No orders found</p>
                    </div>
                ) : (
                    approvedOrders.map((order) => {
                        const latestTracking = getLatestTrackingEntry(order);
                        return (
                            <div
                                key={order._id}
                                className="shadow rounded-lg p-4 border border-gray-100"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold">{order.productTitle}</h3>
                                        <p className="text-xs text-gray-300 mt-1">
                                            Order ID: {order._id}
                                        </p>
                                        <p className="text-xs text-gray-300 mt-1">
                                            Customer: {order.firstName} {order.lastName}
                                        </p>
                                        <p className="text-xs text-gray-300 mt-1">
                                            Current Status: {latestTracking.orderStatus}
                                        </p>
                                        <p className="text-xs text-gray-300 mt-1">
                                            Approval Date:{" "}
                                            {new Date(order.trackingHistory[1].entryDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            })}{" "}
                                            {new Date(order.trackingHistory[1].entryDate).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className='mb-2'>
                                    <p className="text-gray-400 text-xs">Quantity</p>
                                    <p className="font-medium">{order.quantity}</p>
                                </div>

                                <div className='flex gap-2'>
                                    <button disabled={order.status === "Delivered"} onClick={() => handleOpenModal(order)} className='btn btn-primary text-white flex-1'>Add Tracking</button>
                                    <Link to={`view-tracking/${order._id}`} className='btn btn-secondary text-white flex-1'>View Tracking</Link>
                                </div>
                            </div>
                        )
                    })
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
                            <th className="p-3 text-left font-semibold">Current Status</th>
                            <th className="p-3 text-left font-semibold">Last Updated</th>
                            <th className="p-3 text-center font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {approvedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-100">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            approvedOrders.map((order) => {
                                const latestTracking = getLatestTrackingEntry(order);
                                return (
                                    <tr key={order._id} className="border-b">
                                        <td className="p-3 font-mono text-gray-600">{order._id}</td>
                                        <td className="p-3">{order.firstName} {order.lastName}</td>
                                        <td className="p-3 font-medium">{order.productTitle}</td>
                                        <td className="p-3">{order.quantity}</td>
                                        <td className="p-3 font-medium">{latestTracking.orderStatus}</td>
                                        <td className="p-3">
                                            {new Date(order.trackingHistory[1].entryDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            })}{" "}
                                            {new Date(order.trackingHistory[1].entryDate).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>

                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button disabled={order.status === "Delivered"} onClick={() => handleOpenModal(order)} className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors cursor-pointer">
                                                    Add Tracking
                                                </button>

                                                <Link to={`view-tracking/${order._id}`}>
                                                    <button className="btn btn-secondary hover:bg-secondary/90 text-white rounded text-sm font-medium transition-colors cursor-pointer">
                                                        View Tracking
                                                    </button>
                                                </Link>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box relative">

                    <button
                        onClick={() => {
                            modalRef.current.close();
                            reset();
                        }}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-lg mb-4">Manage Product Tracking Details</h3>

                    {selectedOrder ? (
                        <>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium">Product</label>
                                    <input
                                        type="text"
                                        value={selectedOrder.productTitle}
                                        className="input input-bordered w-full bg-gray-50"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Order ID</label>
                                    <input
                                        type="text"
                                        value={selectedOrder._id}
                                        className="input input-bordered w-full bg-gray-50"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Customer</label>
                                    <input
                                        type="text"
                                        value={`${selectedOrder.firstName} ${selectedOrder.lastName}`}
                                        className="input input-bordered w-full bg-gray-50"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">

                                <div>
                                    <label className="block text-sm font-medium">Location</label>
                                    <input
                                        {...register("location", { required: "Location is required" })}
                                        className="input input-bordered w-full"
                                        placeholder="Enter current location"
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm">{errors.location.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Order Status</label>
                                    <select
                                        {...register("orderStatus", { required: "Order Status is required" })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="In Production">In Production</option>
                                        <option value="Quality Check Started">Quality Check Started</option>
                                        <option value="Quality Check Passed">Quality Check Passed</option>
                                        <option value="Packed">Packed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    {errors.orderStatus && (
                                        <p className="text-red-500 text-sm">{errors.orderStatus.message}</p>
                                    )}
                                </div>


                                <div>
                                    <label className="block text-sm font-medium">Note</label>
                                    <textarea
                                        {...register("note")}
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Add any notes here..."
                                        rows={3}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end pt-4 space-x-2">
                                    <button type="submit" className="btn btn-primary">
                                        Update Tracking Details
                                    </button>
                                </div>

                            </form>
                        </>
                    ) : (
                        <div className="text-center text-red-500">Product not found.</div>
                    )}

                </div>
            </dialog>
        </div>
    )
}

export default ApprovedOrders