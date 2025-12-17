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

  const quantity = watch("quantity");

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
  if (error) return <NoDetails />;

  const orderPrice = quantity ? Number(quantity) * product.price : 0;

  const onSubmit = async (formData) => {
    const finalOrder = {
      ...formData,
      buyerEmail: user?.email,
      productId: id,
      productTitle: product?.productName,
      orderPrice,
      productPrice: product?.price,
      paymentMethod: product?.paymentOption,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to purchase this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/orders", finalOrder);
        const orderId = res.data.insertedId;
     
        if (product.paymentOptions === "Stripe") {
          Swal.fire({
            icon: "success",
            title: "Your order has been places!",
            showConfirmButton: false,
            timer: 1200,
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <title>Products Order</title>
      <h1 className="text-3xl font-bold mb-6 text-center">Place Your Order</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="font-semibold">Email</label>
          <input type="email" readOnly defaultValue={user?.email} className="input input-bordered w-full bg-gray-200" />
        </div>

        <div>
          <label className="font-semibold">Product</label>
          <input type="text" value={product.title} readOnly className="input input-bordered w-full bg-gray-200" />
        </div>

        <div>
          <label className="font-semibold">Price & Payment</label>
          <input
            type="text"
            value={`$${product.price} — ${product.paymentOptions}`}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
        </div>

        <div>
          <label className="font-semibold">First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className="input input-bordered w-full"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className="input input-bordered w-full"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="font-semibold">
            Order Quantity
            <span className="text-gray-500 text-sm">
              {" "}
              (Min {product.minimumOrderQuantity} | Max {product.availableQuantity})
            </span>
          </label>

          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: {
                value: product.minimumOrderQuantity,
                message: `Minimum order is ${product.minimumOrderQuantity}`,
              },
              max: {
                value: product.availableQuantity,
                message: `Maximum available is ${product.availableQuantity}`,
              },
            })}
            className="input input-bordered w-full"
          />

          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Order Price (Auto)</label>
          <input type="text" value={`$${orderPrice}`} readOnly className="input input-bordered w-full bg-gray-200" />
        </div>

        <div>
          <label className="font-semibold">Contact Number</label>
          <input
            type="number"
            {...register("contact", {
              required: "Contact number is required",
              minLength: { value: 7, message: "Too short" },
              maxLength: { value: 15, message: "Too long" },
            })}
            className="input input-bordered w-full"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Delivery Address</label>
          <textarea
            {...register("address", { required: "Address is required" })}
            className="textarea textarea-bordered w-full h-24"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea {...register("notes")} className="textarea textarea-bordered w-full h-24"></textarea>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="btn btn-primary flex-1 text-white">Confirm Order</button>

          <button type="button" onClick={() => navigate(-1)} className="btn btn-outline btn-secondary flex-1">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsOrder;
