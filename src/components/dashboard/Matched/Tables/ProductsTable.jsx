import React from 'react';
import { FaBox, FaEye, FaEdit, FaTrash, FaHome } from 'react-icons/fa';

export const ProductsTable = ({ products = [], title = "Products" }) => {
    if (products.length === 0) {
        return (
            <div className="cardshadow-lg">
                <div className="card-body">
                    <h3 className="card-title mb-4">{title}</h3>
                    <div className="text-center py-8">
                        <FaBox className="text-4xl text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No products found</p>
                        <p className="text-sm text-gray-400 mt-1">Products will appear here once added</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="card-title">{title}</h3>
                    <div className="flex items-center gap-2">
                        <div className="badge badge-primary">
                            Total: {products.length}
                        </div>
                        <div className="badge badge-success">
                            <FaHome className="mr-1" />
                            {products.filter(p => p.showOnHomePage).length} on Home
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.slice(0, 5).map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                                    <FaBox className="text-blue-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium">{product.title}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                                    {product.productDescription?.substring(0, 50)}...
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-outline">{product.category}</span>
                                    </td>
                                    <td>
                                        <div className="font-bold">${product.price}</div>
                                        <div className="text-xs text-gray-500">
                                            Min: {product.minimumOrderQuantity}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`font-bold ${product.availableQuantity < product.minimumOrderQuantity ? 'text-red-600' : 'text-green-600'}`}>
                                            {product.availableQuantity}
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${product.availableQuantity < product.minimumOrderQuantity ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{
                                                    width: `${Math.min((product.availableQuantity / (product.minimumOrderQuantity * 10)) * 100, 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td>
                                        {product.showOnHomePage ? (
                                            <span className="badge badge-success">Homepage</span>
                                        ) : (
                                            <span className="badge badge-ghost">Hidden</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="btn btn-ghost btn-xs">
                                                <FaEye />
                                            </button>
                                            <button className="btn btn-ghost btn-xs">
                                                <FaEdit />
                                            </button>
                                            <button className="btn btn-ghost btn-xs text-red-500">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};