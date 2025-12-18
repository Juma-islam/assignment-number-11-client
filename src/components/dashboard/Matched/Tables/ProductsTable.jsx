import React from 'react';
import { FaEye, FaEdit, FaTrash, FaBoxOpen, FaHome } from 'react-icons/fa';

export const ProductsTable = ({ products = [], title = "Products" }) => {
  const homePageCount = products.filter(p => p.showOnHomePage).length;

  if (products.length === 0) {
    return (
      <div className="card shadow-xl bg-base-100 border border-base-300 rounded-2xl">
        <div className="card-body">
          <h3 className="card-title text-xl mb-6">{title}</h3>
          <div className="flex flex-col items-center justify-center py-12">
            <FaBoxOpen className="w-16 h-16 text-base-content/20 mb-4" />
            <p className="text-lg text-base-content/60">No products found</p>
            <p className="text-sm text-base-content/40 mt-1">Once products are added, they will appear here</p>
          </div>
        </div>
      </div>
    );
  }

  const displayedProducts = products.slice(0, 5);

  return (
    <div className="card shadow-xl hover:shadow-2xl transition-shadow bg-base-100 border border-base-300 rounded-2xl">
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="card-title text-xl">{title}</h3>
          <div className="flex items-center gap-3">
            <div className="badge badge-lg badge-primary font-bold">
              Total: {products.length}
            </div>
            <div className="badge badge-lg badge-success font-bold">
              <FaHome className="w-4 h-4 mr-1" />
              {homePageCount} on Home
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {displayedProducts.map((product) => {
            const isLowStock = product.availableQuantity < product.minimumOrderQuantity;
            const stockPercentage = Math.min(
              (product.availableQuantity / (product.minimumOrderQuantity * 10)) * 100,
              100
            );

            return (
              <div
                key={product._id}
                className="flex items-center justify-between p-5 bg-base-200/50 hover:bg-base-200 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <FaBoxOpen className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg">{product.title}</p>
                    <p className="text-sm text-base-content/70 truncate mt-1">
                      {product.productDescription?.substring(0, 80)}...
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="badge badge-outline badge-sm">{product.category}</span>
                      {product.showOnHomePage ? (
                        <span className="badge badge-success badge-sm">Homepage</span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">Hidden</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center mx-6">
                  <p className="text-2xl font-bold">${product.price}</p>
                  <p className="text-sm text-base-content/60">Min: {product.minimumOrderQuantity}</p>
                </div>

                <div className="text-center mx-6">
                  <p className={`text-2xl font-bold ${isLowStock ? 'text-error' : 'text-success'}`}>
                    {product.availableQuantity}
                  </p>
                  <progress
                    className={`progress w-32 mt-2 ${isLowStock ? 'progress-error' : 'progress-success'}`}
                    value={stockPercentage}
                    max="100"
                  ></progress>
                </div>

                <div className="flex gap-2">
                  <div className="tooltip" data-tip="View">
                    <button className="btn btn-ghost btn-sm">
                      <FaEye className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Edit">
                    <button className="btn btn-ghost btn-sm">
                      <FaEdit className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Delete">
                    <button className="btn btn-ghost btn-sm text-error">
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {products.length > 5 && (
          <div className="mt-6 pt-6 border-t border-base-300 text-center">
            <p className="text-sm text-base-content/70">
              Showing 5 of {products.length} products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};