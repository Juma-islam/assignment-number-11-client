import React from "react";
import {
  LogOut,
  Mail,
  Briefcase,
  Users,
  Shield,
  Package,
  Edit,
  Building,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import useRoles from "../../hooks/useRoles";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const MyProfile = () => {
  const user = useRoles();
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("You have been logged out successfully!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <Shield className="w-4 h-4" />,
          label: "Admin",
        };
      case "manager":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Users className="w-4 h-4" />,
          label: "Manager",
        };
      case "buyer":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <Briefcase className="w-4 h-4" />,
          label: "Buyer",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Users className="w-4 h-4" />,
          label: "User",
        };
    }
  };

  const roleBadge = getRoleBadge(user?.role);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <title>My Profile</title>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold ">Profile</h1>
            <p className="text-gray-400 mt-1">Garments Tracker</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} alt={user?.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-4xl text-gray-400">{user?.name?.charAt(0) || "U"}</span>
                    )}
                  </div>
                  {user?.status === "approved" && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {user?.status === "suspended" && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                      <AlertCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-bold text-center">{user?.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${roleBadge.color} flex items-center gap-1`}
                  >
                    {roleBadge.icon}
                    {roleBadge.label}
                  </span>
                </div>

                <div className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user?.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : user?.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user?.status === "approved" ? "Active" : user?.status === "pending" ? "Pending" : "Suspended"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-300" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-300 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Role Details</h3>
                  <p className="text-gray-400">Information about your permissions and responsibilities</p>
                </div>
                <div className={`px-4 py-2 rounded-lg ${roleBadge.color}`}>{roleBadge.label}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Permissions</h4>
                  <ul className="space-y-2">
                    {user?.role === "admin" && (
                      <>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Full system access
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          User management
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          System configuration
                        </li>
                      </>
                    )}
                    {user?.role === "manager" && (
                      <>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Production oversight
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Inventory management
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Team coordination
                        </li>
                      </>
                    )}
                    {user?.role === "buyer" && (
                      <>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Order placement
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Track shipments
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          View inventory
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">System Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Account Status</span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user?.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : user?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user?.status === "approved"
                          ? "Active"
                          : user?.status === "pending"
                          ? "Pending Approval"
                          : "Suspended"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Last Updated</span>
                      <span>
                        {user?.updatedAt
                          ? new Date(user?.updatedAt).toLocaleDateString()
                          : new Date(user?.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">System Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400">User ID</label>
                      <p className="font-mono text-sm truncate">{user?._id}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">Account Role</label>
                      <div className="flex items-center gap-2">
                        {user?.role === "admin" && <Shield className="w-4 h-4 text-red-500" />}
                        {user?.role === "manager" && <Users className="w-4 h-4 text-blue-500" />}
                        {user?.role === "buyer" && <Briefcase className="w-4 h-4 text-green-500" />}
                        <span className="capitalize">{user?.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Account Status</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400">Status</label>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            user?.status === "approved"
                              ? "bg-green-500"
                              : user?.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="capitalize">{user?.status || "N/A"}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">Joined On</label>
                      <p>{user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>
                </div>
                {user?.status === "suspended" && user?.suspendReason && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <label className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      Suspension Reason
                    </label>
                    <div className="bg-red-300 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm leading-relaxed">{user.suspendReason}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Please contact support for more information or to appeal this suspension.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

