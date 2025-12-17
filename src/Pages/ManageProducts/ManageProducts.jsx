

import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import useRoles from '../../hooks/useRoles';
import useAuth from '../../hooks/useAuth';
import ManagerApprovalPending from '../../components/ManagerApprovalPending/ManagerApprovalPending';
import UpdateProductModal from '../../components/Modals/UpdateProductModal';

const ManageProducts = () => {
  const axiosSecure = useAxios();
  const modalRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const users = useRoles();
  const { user } = useAuth();

  const { data: products = [], refetch: refetchProducts } = useQuery({
    queryKey: ['products', user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      return res.data;
    },
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const filteredProducts = products.filter((product) => {
    const title = product?.title || '';
    const category = product?.category || '';
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    modalRef.current.showModal();
  };

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/products/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "This product has been deleted.",
              icon: "success",
            });
            refetchProducts();
          } else {
            toast.error("Failed to delete the product.");
          }
        } catch (err) {
          console.log(err);
          toast.error("An error occurred while deleting the product.");
        }
      }
    });
  };

  if (users?.role === "manager" && users?.status === "pending")
    return <ManagerApprovalPending />;

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <title>Manage Products - Manager Dashboard</title>
      <h1 className="text-2xl font-bold mb-6">Manage Your Products</h1>

      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="all">All Categories</option>
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Jacket">Jacket</option>
          <option value="Accessories">Accessories</option>
          <option value="Shoes">Shoes</option>
          <option value="Traditional Wear">Traditional Wear</option>
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 shadow rounded-lg">
            <p className="text-gray-300">No products available</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="shadow rounded-lg p-4 border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product?.images?.[0] || ''}
                  alt={product?.title || ''}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{product?.title || 'N/A'}</h3>
                  <p className="text-sm text-gray-300">{product?.category || 'N/A'}</p>
                  <p className="text-sm text-gray-300">{product?.paymentOptions || 'N/A'}</p>
                  <p className="font-medium">${product?.price || 0}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2 items-center">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="btn btn-primary text-white text-sm flex-1"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="btn btn-error text-white text-sm flex-1"
                >
                  Delete
                </button>
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
              <th className="p-3 text-left font-semibold">Image</th>
              <th className="p-3 text-left font-semibold">Product Name</th>
              <th className="p-3 text-left font-semibold">Price</th>
              <th className="p-3 text-left font-semibold">Category</th>
              <th className="p-3 text-left font-semibold">Payment Mode</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={product?.images?.[0] || ''}
                      alt={product?.title || ''}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium">{product?.title || 'N/A'}</td>
                  <td className="p-3">${product?.price || 0}</td>
                  <td className="p-3">{product?.category || 'N/A'}</td>
                  <td className="p-3">{product?.paymentOptions || 'N/A'}</td>
                  <td className="p-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="btn btn-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="btn btn-error text-white rounded text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UpdateProductModal
        modalRef={modalRef}
        selectedProduct={selectedProduct}
        refetchProducts={refetchProducts}
      />
    </div>
  );
};

export default ManageProducts;
