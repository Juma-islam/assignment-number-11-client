import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useRoles from "../../hooks/useRoles";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import NoDetails from "../../components/Shared/NoDetails/NoDetails";


const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios()
  const navigate = useNavigate()
  const user = useRoles()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if (error) return <NoDetails></NoDetails>

  // video link
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("shorts")) {
      return url.replace("shorts/", "embed/");
    }
    return url.replace("watch?v=", "embed/");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-2 gap-10">
      
      <div>

        {product.images?.length === 1 && (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        )}

        {product.images?.length > 1 && (
          <div>
            
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[420px] object-cover rounded-lg shadow-md"
            />

            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className="h-24 w-full object-cover rounded-md border border-gray-400 hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <p className="text-gray-700 leading-relaxed">
          {product.description}
        </p>

        <div className="text-lg font-semibold">
          <p>💲 Price: ${product.price}</p>
          <p>📦 Available: {product.availableQuantity} units</p>
          <p>📥 Minimum Order: {product.minimumOrderQuantity} units</p>
          <p>💳 Payment: {product.paymentOption}</p>
        </div>

        {product.demoVideoLink && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Product Demo Video</h2>
            <iframe
              className="w-full h-64 rounded-lg shadow-md"
              src={getEmbedUrl(product.demoVideoLink)}
              allowFullScreen
              title="Demo Video"
            ></iframe>
          </div>
        )}

        <p className="text-sm text-gray-600">
          Category: <span className="font-semibold">{product.category}</span>
        </p>

        <div className="flex gap-4 mt-4">
          <Link to="order-form"><button disabled={!(user?.role === "buyer" && user?.status === "approved")} className="btn btn-primary text-white rounded-lg shadow hover:bg-primary/90 transition">
            Order Now
          </button></Link>
          <button onClick={()=>navigate(-1)} className="btn btn-secondary hover:bg-secondary/90 rounded-lg shadow transition">Back</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
