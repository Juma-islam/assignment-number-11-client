import React, { useState } from 'react';
import {
    FaUserShield, FaUserTie, FaUser, FaCheckCircle,
    FaClock, FaSearch, FaSortUp, FaSortDown
} from 'react-icons/fa';

const UsersTable = ({ allUsers: users = [], title = "User Management", onUserAction }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortField, setSortField] = useState('joinDate');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'joinDate') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const roleStats = {
        admin: users.filter(u => u.role === 'admin').length,
        manager: users.filter(u => u.role === 'manager').length,
        buyer: users.filter(u => u.role === 'buyer').length,
        pending: users.filter(u => u.status !== 'approved').length,
        approved: users.filter(u => u.status === 'approved').length
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <FaUserShield className="text-lg text-blue-600" />;
            case 'manager': return <FaUserTie className="text-lg text-green-600" />;
            case 'buyer': return <FaUser className="text-lg text-purple-600" />;
            default: return <FaUser className="text-lg text-gray-500" />;
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin': return 'badge-primary';
            case 'manager': return 'badge-secondary';
            case 'buyer': return 'badge-accent';
            default: return 'badge-ghost';
        }
    };

    const getStatusBadge = (status) => {
        return status === 'approved' ? 'badge-success' : 'badge-warning';
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(sortedUsers.map(u => u._id));
        } else {
            setSelectedUsers([]);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (users.length === 0) {
        return (
            <div className="card shadow-xl">
                <div className="card-body">
                    <h3 className="card-title text-xl font-bold">{title}</h3>
                    <div className="text-center py-12">
                        <FaUser className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-2">No users found</p>
                        <p className="text-gray-400">Users will appear here once they register</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="card-title text-2xl font-bold">{title}</h3>
                        <p className="text-gray-600">Manage all platform users</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="stats stats-horizontal shadow">
                            <div className="stat">
                                <div className="stat-title">Total</div>
                                <div className="stat-value text-primary">{users.length}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Admins</div>
                                <div className="stat-value text-blue-600">{roleStats.admin}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Pending</div>
                                <div className="stat-value text-yellow-600">{roleStats.pending}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                className="input input-bordered w-full pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <select
                        className="select select-bordered"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="buyer">Buyer</option>
                    </select>

                    <select
                        className="select select-bordered"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                <div className="overflow-x-auto border rounded-lg">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        className="flex items-center gap-2 hover:text-primary"
                                        onClick={() => handleSort('name')}
                                    >
                                        User
                                        {sortField === 'name' && (
                                            sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
                                        )}
                                    </button>
                                </th>
                                <th>Email</th>
                                <th>
                                    <button
                                        className="flex items-center gap-2 hover:text-primary"
                                        onClick={() => handleSort('role')}
                                    >
                                        Role
                                        {sortField === 'role' && (
                                            sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
                                        )}
                                    </button>
                                </th>
                                <th>Status</th>
                                <th>
                                    <button
                                        className="flex items-center gap-2 hover:text-primary"
                                        onClick={() => handleSort('joinDate')}
                                    >
                                        Joined
                                        {sortField === 'joinDate' && (
                                            sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
                                        )}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user) => (
                                <tr
                                    key={user._id}
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-white ring-gray-200">
                                                    <img
                                                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
                                                        alt={user.name}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold">{user.name}</div>
                                                <div className="text-xs text-gray-500 font-mono">
                                                    ID: {user._id?.slice(-6)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="max-w-[200px] truncate" title={user.email}>
                                            {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {getRoleIcon(user.role)}
                                            <span className={`badge badge-lg ${getRoleBadge(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {user.status === 'approved' ? (
                                                <FaCheckCircle className="text-green-500" />
                                            ) : (
                                                <FaClock className="text-yellow-500" />
                                            )}
                                            <span className={`badge ${getStatusBadge(user.status)}`}>
                                                {user.status || 'Pending'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium">
                                                {formatDate(user.joinDate)}
                                            </div>
                                            {user.joinDate && (
                                                <div className="text-xs text-gray-500">
                                                    {new Date(user.joinDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t">
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-semibold">{sortedUsers.length}</span> of{' '}
                        <span className="font-semibold">{users.length}</span> users
                        {searchTerm && (
                            <span className="ml-2">
                                • Search: "<span className="font-semibold">{searchTerm}</span>"
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-xs">Admin ({roleStats.admin})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-xs">Manager ({roleStats.manager})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                <span className="text-xs">Buyer ({roleStats.buyer})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;