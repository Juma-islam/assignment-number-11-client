import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import UpdateProductModal from "../../components/Modals/UpdateProductModal";

const AdminAllProducts = () => {
  const axiosSecure = useAxios();
  const modalRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    refetch: refetchProducts,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const {
    data: topProducts = [],
    refetch: refetchTop,
    isLoading: topLoading,
  } = useQuery({
    queryKey: ["topProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/topProducts");
      return res.data;
    },
  });

  const handleToggleHome = async (product) => {
    console.log("toggle clicked:", product.title);
    try {
      const updatedStatus = !product?.showOnHomePage;
      const res = await axiosSecure.patch(`/products/${product._id}/showOnHome`, { showOnHomePage: updatedStatus });
      if (res.data.modifiedCount > 0) {
        await refetchProducts();
        await refetchTop();
        toast.success("Status Updated!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Sorry, something went wrong!");
    }
  };

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
              text: "This file has been deleted.",
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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <title> Products - Admin Dashboard</title>
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="md:hidden space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-10 shadow rounded-lg">
            <p className="text-gray-500">No products available</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="shadow rounded-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-4">
                <img src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-grow">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-300">{product.category}</p>
                  <p className="text-sm text-gray-300">{product.createdBy}</p>
                  <p className="font-medium">${product.price}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={() => handleToggleHome(product)}
                    checked={product.showOnHomePage}
                    disabled={topLoading ? true : topProducts.length >= 8 && !product.showOnHomePage}
                  />
                  <label className="ml-2 text-sm">Show on Home</label>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(product)} className="btn btn-primary text-white text-sm">
                    Update
                  </button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-error text-white text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th className="p-3 text-left font-semibold">Image</th>
              <th className="p-3 text-left font-semibold">Product Name</th>
              <th className="p-3 text-left font-semibold">Price</th>
              <th className="p-3 text-left font-semibold">Category</th>
              <th className="p-3 text-left font-semibold">Created By</th>
              <th className="p-3 text-left font-semibold">Show on Home</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium">{product.title}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.createdBy}</td>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      onChange={() => handleToggleHome(product)}
                      checked={product.showOnHomePage}
                      disabled={topProducts.length >= 8 && !product.showOnHomePage}
                    />
                  </td>
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
      ></UpdateProductModal>
    </div>
  );
};

export default AdminAllProducts;
