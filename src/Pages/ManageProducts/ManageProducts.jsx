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

  const uniqueCategories = [...new Set(products.map(p => p.category))];

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
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            refetchProducts();
          } else {
            toast.error("Failed to delete the product.");
          }
        } catch (err) {
          console.log(err);
          toast.error("An error occurred while deleting.");
        }
      }
    });
  };

  if (users?.role === "manager" && users?.status === "pending")
    return <ManagerApprovalPending />;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content">Manage Products</h1>
          <p className="text-base-content/70 mt-2">View, update, or delete your listed products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="stat bg-base-100 rounded-2xl shadow-md">
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">{products.length}</div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-md">
            <div className="stat-title">Categories</div>
            <div className="stat-value text-secondary">{uniqueCategories.length}</div>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-md md:col-span-1 col-span-2">
            <div className="stat-title">Listed Items</div>
            <div className="stat-value text-success">{filteredProducts.length} showing</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full input-lg"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full max-w-xs select-lg"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="md:hidden space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="card bg-base-100 shadow-xl rounded-2xl">
              <div className="card-body text-center py-16">
                <div className="text-6xl text-base-content/20 mb-4">📦</div>
                <h3 className="text-xl font-semibold text-base-content/60">No products found</h3>
                <p className="text-base-content/50 mt-2">Try adjusting your search or filter</p>
              </div>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow rounded-2xl overflow-hidden"
              >
                <div className="card-body p-5">
                  <div className="flex gap-4">
                    <img
                      src={product?.images?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{product.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="badge badge-outline">{product.category}</span>
                        <span className="badge badge-ghost">{product.paymentOptions}</span>
                      </div>
                      <p className="text-2xl font-bold mt-3">${product.price}</p>
                    </div>
                  </div>

                  <div className="card-actions mt-6 flex gap-3">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="btn btn-primary flex-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="btn btn-error flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block">
          <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Payment Mode</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-16">
                        <div className="text-6xl text-base-content/20 mb-4">📦</div>
                        <p className="text-xl text-base-content/60">No products found</p>
                        <p className="text-base-content/50">Try adjusting your search or filter</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-base-200 transition-colors">
                        <td>
                          <img
                            src={product?.images?.[0] || 'https://via.placeholder.com/100'}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                        </td>
                        <td className="font-semibold">{product.title}</td>
                        <td className="font-bold text-primary">${product.price}</td>
                        <td>
                          <span className="badge badge-outline">{product.category}</span>
                        </td>
                        <td>{product.paymentOptions}</td>
                        <td>
                          <div className="flex gap-3 justify-center">
                            <button
                              onClick={() => handleOpenModal(product)}
                              className="btn btn-primary btn-sm"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="btn btn-error btn-sm"
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
          </div>
        </div>

        <UpdateProductModal
          modalRef={modalRef}
          selectedProduct={selectedProduct}
          refetchProducts={refetchProducts}
        />
      </div>
    </div>
  );
};

export default ManageProducts;
