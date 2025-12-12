import React, { useRef, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const ManageUsers = () => {

    const [showSuspendBox, setShowSuspendBox] = useState(false);
    const [suspendReason, setSuspendReason] = useState("");

    const axiosSecure = useAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const modalRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setSelectedUser(user);
        setShowSuspendBox(false);
        setSuspendReason("");
        modalRef.current.showModal();
    };


    const handleStatusUpdate = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}`, user)

            if (res.data.modifiedCount > 0) {
                refetch();
                modalRef.current.close();
                toast.success('User status updated!')
            }
        }
        catch (err) {
            toast.error(err.response?.data?.error || "Update failed!")
        }
    };

    const handleMakeAdmin = async (user) => {
        modalRef.current.close();
        Swal.fire({
            title: "Are you sure?",
            text: `You want to make ${user.name} admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
            customClass: {
                popup: 'swal-z-index-fix'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${user._id}/role`, user)

                    if (res.data.modifiedCount > 0) {
                        refetch();

                        Swal.fire({
                            title: "Success!",
                            text: `${user.name} is now an admin.`,
                            icon: "success",
                        });
                    }
                }
                catch (err) {
                    toast.error(err.response?.data?.error || "Update failed!")
                }
            }
        })
    }

    const handleSuspend = async (status, suspendReason, user) => {
        const suspensionUpdate = { status, suspendReason }
        modalRef.current.close()

        Swal.fire({
            title: "Are you sure?",
            text: `You want to suspend ${user.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
            customClass: {
                popup: 'swal-z-index-fix'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${user._id}/suspension`, suspensionUpdate)
                    if (res.data.modifiedCount > 0) {
                        refetch();

                        Swal.fire({
                            title: "Success!",
                            text: `${user.name} is suspended.`,
                            icon: "success",
                        })
                    }
                } catch (err) {
console.log(err)
                }
            }
        })


    }


    return (
        <div className="p-4 md:p-8 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {users.length === 0 ? (
                    <div className="text-center py-10 bg-white shadow rounded-lg">
                        <p className="text-gray-500">No users found</p>
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user._id} className="bg-white shadow rounded-lg p-4 border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center">
                                    <img
                                        src={user.photoURL}
                                        alt="User Profile"
                                        className="w-10 h-10 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">Email: {user.email}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-xs px-2 py-1 rounded bg-gray-100">
                                        {user.role}
                                    </span>

                                    <span
                                        className={`text-xs px-2 py-1 mt-1 rounded font-semibold 
                                            ${user.status === "approved"
                                                ? "bg-green-100 text-green-600"
                                                : user.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => openModal(user)}
                                className="btn btn-primary w-full text-white"
                            >
                                Update
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto shadow rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="p-3 text-left">Profile</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="border-b">
                                    <td className="p-3">
                                        <img
                                            src={user.photoURL}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>

                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>

                                    <td className="p-3">
                                        <span
                                            className={`text-xs px-2 py-1 rounded font-semibold 
                                    ${user.status === "approved"
                                                    ? "bg-green-100 text-green-600"
                                                    : user.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="btn btn-primary text-white"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            <dialog ref={modalRef} className="modal">
                <div className="modal-box relative">

                    <button
                        onClick={() => modalRef.current.close()}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-lg mb-4">Update User Status</h3>

                    {selectedUser && (
                        <>
                            <div className="border-b flex justify-between items-center">
                                <div className='flex items-center gap-4 pb-4'>
                                    <img
                                        src={selectedUser.photoURL}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                                        <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <button disabled={selectedUser?.role === "admin" || selectedUser?.status === "suspended"} onClick={() => handleMakeAdmin(selectedUser)} className='btn btn-primary hover:bg-primary/90'>Make Admin</button>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3 text-sm">
                                <p>
                                    <span className="font-semibold">Role:</span>{" "}
                                    <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                                        {selectedUser.role}
                                    </span>
                                </p>

                                <p>
                                    <span className="font-semibold">Status:</span>{" "}
                                    <span
                                        className={`px-2 py-1 rounded text-white ${selectedUser.status === "approved"
                                            ? "bg-green-600"
                                            : selectedUser.status === "pending"
                                                ? "bg-yellow-500"
                                                : "bg-red-600"
                                            }`}
                                    >
                                        {selectedUser.status}
                                    </span>
                                </p>
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    disabled={selectedUser.status === "approved" || selectedUser.status === "suspended"}
                                    onClick={() => handleStatusUpdate(selectedUser)}
                                    className="btn btn-success text-white"
                                >
                                    Approve
                                </button>

                                <button
                                    disabled={selectedUser?.role === "admin" || selectedUser?.status === "suspended"}
                                    onClick={() => setShowSuspendBox(true)}
                                    className="btn btn-error text-white"
                                >
                                    Suspend
                                </button>
                            </div>

                            {/* EXPANDABLE SUSPEND BOX */}
                            {showSuspendBox && (
                                <div className="mt-5 animate-fadeIn">
                                    <label className="font-semibold block mb-2">
                                        Reason for suspension
                                    </label>

                                    <textarea
                                        value={suspendReason}
                                        onChange={(e) => setSuspendReason(e.target.value)}
                                        placeholder="Write the suspension reason..."
                                        className="textarea textarea-bordered w-full"
                                        rows={3}
                                    />

                                    <button
                                        onClick={() => handleSuspend("suspended", suspendReason, selectedUser)}
                                        className="btn btn-error text-white w-full mt-3"
                                    >
                                        Suspend This User
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </dialog>

        </div>
    );
}

export default ManageUsers;
