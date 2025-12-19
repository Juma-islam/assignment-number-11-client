// import React from "react";
// import { Link, useNavigate, useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../hooks/useAxios";
// import useRoles from "../../hooks/useRoles";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import NoDetails from "../../components/Shared/NoDetails/NoDetails";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxios();
//   const navigate = useNavigate();
//   const user = useRoles();

//   const {
//     data: product,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (error || !product) return <NoDetails />;

//   const getEmbedUrl = (url) => {
//     if (!url) return null;
//     if (url.includes("shorts")) {
//       return url.replace("shorts/", "embed/");
//     }
//     return url.replace("watch?v=", "embed/");
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-2 gap-10">
//       <title>Product Details</title>
//       <div>
//         {product.images?.length === 1 && (
//           <img
//             src={product.images[0]}
//             alt={product.title}
//             className="w-full h-auto rounded-lg shadow-md object-cover"
//           />
//         )}

//         {product.images?.length > 1 && (
//           <div>
//             <img
//               src={product.images[0]}
//               alt={product.title}
//               className="w-full h-[420px] object-cover rounded-lg shadow-md"
//             />

//             <div className="grid grid-cols-4 gap-3 mt-4">
//               {product.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`thumb-${index}`}
//                   className="h-24 w-full object-cover rounded-md border hover:scale-105 transition"
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold">{product.title}</h1>

//         <p className="text-gray-700 leading-relaxed">{product.productDescription}</p>

//         <div className="text-lg font-semibold space-y-1">
//           <p>💲 Price: ৳{product.price}</p>
//           <p>📦 Available: {product.availableQuantity} units</p>
//           <p>📥 Minimum Order: {product.minimumOrderQuantity} units</p>
//           <p>💳 Payment: {product.paymentOptions}</p>
//         </div>

//         {product.demoVideo && (
//           <div className="mt-6">
//             <h2 className="text-xl font-bold mb-2">Product Demo Video</h2>
//             <iframe
//               className="w-full h-64 rounded-lg shadow-md"
//               src={getEmbedUrl(product.demoVideo)}
//               title="Product Demo Video"
//               allowFullScreen
//             ></iframe>
//           </div>
//         )}

//         <p className="text-sm text-gray-600">
//           Category: <span className="font-semibold">{product.category}</span>
//         </p>

//         <div className="flex gap-4 mt-4">
//           <Link to="order-form">
//             <button
//               disabled={!(user?.role === "buyer" && user?.status === "approved")}
//               className="btn btn-primary text-white rounded-lg shadow disabled:opacity-50"
//             >
//               Order Now
//             </button>
//           </Link>

//           <button onClick={() => navigate(-1)} className="btn btn-secondary rounded-lg shadow">
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useRoles from "../../hooks/useRoles";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import NoDetails from "../../components/Shared/NoDetails/NoDetails";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const user = useRoles();
  const [selectedImage, setSelectedImage] = useState(0);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !product) return <NoDetails />;

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("shorts")) {
      return url.replace("shorts/", "embed/");
    }
    return url.replace("watch?v=", "embed/");
  };

  const images = product.images || [];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          <div className="space-y-4">
           
            <div className="relative">
              <img
                src={images[selectedImage] || "https://via.placeholder.com/600"}
                alt={product.title}
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                      selectedImage === index
                        ? "border-primary shadow-lg scale-105"
                        : "border-base-300 hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-base-content">{product.title}</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="badge badge-outline badge-lg">{product.category}</span>
                {product.showOnHomePage && (
                  <span className="badge badge-success badge-lg">Featured</span>
                )}
              </div>
            </div>

            <div className="space-y-6">
           
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-base-100 rounded-2xl p-5 shadow-md">
                  <p className="text-base-content/60 text-sm">Unit Price</p>
                  <p className="text-3xl font-bold text-primary">৳{product.price}</p>
                </div>
                <div className="bg-base-100 rounded-2xl p-5 shadow-md">
                  <p className="text-base-content/60 text-sm">Available Stock</p>
                  <p className="text-3xl font-bold text-success">{product.availableQuantity}</p>
                </div>
                <div className="bg-base-100 rounded-2xl p-5 shadow-md">
                  <p className="text-base-content/60 text-sm">Minimum Order</p>
                  <p className="text-2xl font-bold">{product.minimumOrderQuantity} units</p>
                </div>
                <div className="bg-base-100 rounded-2xl p-5 shadow-md">
                  <p className="text-base-content/60 text-sm">Payment Options</p>
                  <div className="mt-2">
                    <span className="badge badge-primary badge-lg">{product.paymentOptions}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-base-content/80 leading-relaxed text-justify">
                  {product.productDescription}
                </p>
              </div>

              {product.demoVideo && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Demo Video</h3>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-xl">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={getEmbedUrl(product.demoVideo)}
                      title="Product Demo"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="order-form" className="flex-1">
                <button
                  disabled={!(user?.role === "buyer" && user?.status === "approved")}
                  className="btn btn-primary btn-lg w-full gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-bold text-lg">Order Now</span>
                </button>
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline btn-lg w-full sm:w-auto"
              >
                Back to Catalog
              </button>
            </div>

            {user && user.role !== "buyer" && (
              <div className="alert alert-info shadow-lg rounded-2xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Only approved buyers can place orders.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;