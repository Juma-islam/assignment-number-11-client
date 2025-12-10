import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const ManageUsers = () => {
    const axiosSecure = useAxios();
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

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
                        <div key={user.id} className="bg-white shadow rounded-lg p-4 border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center">
                                    {/* Profile Picture */}
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
                                <div className='flex flex-col'>
                                    <span
                                        className="px-2 py-1 rounded text-xs font-semibold whitespace-nowrap"
                                    >
                                        {user.role}
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${user.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : user.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="btn btn-primary text-white rounded text-sm font-medium transition-colors flex-1">
                                    Update
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
                            <th className="p-3 text-left font-semibold">Profile</th>
                            <th className="p-3 text-left font-semibold">Name</th>
                            <th className="p-3 text-left font-semibold">Email</th>
                            <th className="p-3 text-left font-semibold">Role</th>
                            <th className="p-3 text-left font-semibold">Status</th>
                            <th className="p-3 text-center font-semibold">Actions</th>
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
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    {/* Profile Picture */}
                                    <td className="p-3">
                                        <img
                                            src={user.photoURL}
                                            alt="User Profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="p-3 font-medium text-gray-800">{user.name}</td>
                                    <td className="p-3 text-gray-600">{user.email}</td>

                                    {/* Role */}
                                    <td className="p-3">
                                        <span
                                            className="px-2 py-1 rounded text-xs font-semibold"
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${user.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : user.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-3">
                                        <div className="flex gap-2 justify-center">
                                            <button className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors">
                                                Update
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
    );
}

export default ManageUsers;
