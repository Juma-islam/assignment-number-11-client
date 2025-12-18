import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import NoDetails from "../../components/Shared/NoDetails/NoDetails";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ProductsOrder = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const quantity = watch("quantity", 0);

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

  const orderPrice = quantity ? Number(quantity) * product.price : 0;

  const onSubmit = async (formData) => {
    const finalOrder = {
      ...formData,
      buyerEmail: user?.email,
      productId: id,
      productTitle: product.title,
      orderPrice,
      productPrice: product.price,
      paymentMethod: product.paymentOptions,
    };

    Swal.fire({
      title: "Confirm Order?",
      text: `Total: $${orderPrice} for ${quantity} units`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Place Order!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/orders", finalOrder);
        const orderId = res.data.insertedId;

        if (product.paymentOptions === "Stripe") {
          Swal.fire({
            icon: "success",
            title: "Order Placed Successfully!",
            text: "Redirecting to payment...",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/dashboard/my-orders");
          return;
        }

        sessionStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            ...finalOrder,
            orderId,
          })
        );

        navigate(`/product-details/${id}/order-form/payment?orderId=${orderId}`);
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-base-content mb-10">
          Place Your Order
        </h1>

        <div className="card bg-base-100 shadow-xl rounded-2xl mb-8 overflow-hidden">
          <div className="card-body p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/300"}
                alt={product.title}
                className="w-full md:w-48 h-48 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <p className="text-base-content/70 mt-2">{product.productDescription?.substring(0, 200)}...</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div>
                    <p className="text-sm text-base-content/60">Unit Price</p>
                    <p className="text-2xl font-bold text-primary">${product.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Payment Option</p>
                    <span className="badge badge-lg badge-primary">{product.paymentOptions}</span>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Available Stock</p>
                    <p className="text-xl font-semibold text-success">{product.availableQuantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="card bg-base-100 shadow-xl rounded-2xl">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Email (Read Only)</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-base-200"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Product</span>
                  </label>
                  <input
                    type="text"
                    value={product.title}
                    readOnly
                    className="input input-bordered w-full bg-base-200"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <input
                    {...register("firstName", { required: "First name is required" })}
                    className="input input-bordered w-full"
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-error text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <input
                    {...register("lastName", { required: "Last name is required" })}
                    className="input input-bordered w-full"
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-error text-sm mt-1">{errors.lastName.message}</p>}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Order Quantity
                      <span className="text-base-content/60 text-sm ml-2">
                        (Min: {product.minimumOrderQuantity} | Available: {product.availableQuantity})
                      </span>
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: {
                        value: product.minimumOrderQuantity,
                        message: `Minimum ${product.minimumOrderQuantity} required`,
                      },
                      max: {
                        value: product.availableQuantity,
                        message: `Only ${product.availableQuantity} available`,
                      },
                    })}
                    className="input input-bordered w-full"
                    placeholder="Enter quantity"
                  />
                  {errors.quantity && <p className="text-error text-sm mt-1">{errors.quantity.message}</p>}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Total Order Price</span>
                  </label>
                  <input
                    type="text"
                    value={`$${orderPrice.toFixed(2)}`}
                    readOnly
                    className="input input-bordered w-full bg-primary/10 text-primary font-bold text-xl"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Contact Number</span>
                  </label>
                  <input
                    type="tel"
                    {...register("contact", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className="input input-bordered w-full"
                    placeholder="+880 1XXX XXXXXX"
                  />
                  {errors.contact && <p className="text-error text-sm mt-1">{errors.contact.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Delivery Address</span>
                  </label>
                  <textarea
                    {...register("address", { required: "Delivery address is required" })}
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="House no, Road, Area, City, Country"
                  />
                  {errors.address && <p className="text-error text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Additional Notes (Optional)</span>
                  </label>
                  <textarea
                    {...register("notes")}
                    className="textarea textarea-bordered w-full h-24"
                    placeholder="Any special instructions? Color preference, delivery time etc."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button type="submit" className="btn btn-primary btn-lg flex-1">
                  <span className="font-bold">Confirm Order – ${orderPrice.toFixed(2)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-outline btn-lg flex-1"
                >
                  Back to Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsOrder;