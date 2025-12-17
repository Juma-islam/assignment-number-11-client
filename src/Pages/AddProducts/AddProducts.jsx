import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaPlus, FaTrash, FaEye, FaChevronLeft, FaChevronRight, FaUpload } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useRoles from "../../hooks/useRoles";
import ManagerApprovalPending from "../../components/ManagerApprovalPending/ManagerApprovalPending";

const AddProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const users = useRoles();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [{ url: "" }],
      showOnHome: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const watchedImages = watch("images");

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);

  const openPreview = () => {
    const urls = watchedImages.map((item) => item.url).filter((u) => u && u.trim() !== "");
    if (urls.length === 0) return toast.info("No images to preview");
    setImageList(urls);
    setCurrentImageIndex(0);
    setPreviewModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1 < imageList.length ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 >= 0 ? prev - 1 : imageList.length - 1));
  };

  const closeModal = () => {
    setPreviewModalOpen(false);
    setImageList([]);
  };

  const onSubmit = async (data) => {
    const images = data.images.map((img) => img.url).filter((u) => u.trim() !== "");

    if (images.length === 0) {
      return toast.error("At least one image URL is required");
    }

    const finalData = {
      title: data.productName,
      productDescription: data.productDescription,
      category: data.category,
      price: parseFloat(data.price),
      availableQuantity: parseInt(data.availableQuantity),
      minimumOrderQuantity: parseInt(data.minimumOrderQuantity),
      images,
      demoVideo: data.demoVideo || "",
      paymentOption: data.paymentOption,
      showOnHome: data.showOnHome || false,
      createdBy: user?.email || user?.displayName,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/products", finalData);
      if (res.data.insertedId) {
        toast.success("Product added successfully!");
        navigate("/dashboard/manage-products");
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed! Check console.");
    }
  };

  if (users?.role === "manager" && users?.status === "pending") {
    return <ManagerApprovalPending />;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <title>Add Product - Manager Dashboard</title>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
        <p className="opacity-70">Fill in the details below to add a new product</p>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="input input-bordered w-full"
                {...register("productName", { required: "Product name is required" })}
              />
              {errors.productName && <span className="text-error text-sm">{errors.productName.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Product Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="Detailed description"
                {...register("productDescription", { required: "Description is required" })}
              />
              {errors.productDescription && (
                <span className="text-error text-sm">{errors.productDescription.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("category", { required: "Select a category" })}
                >
                  <option value="">Select Category</option>
                  <option>Shirt</option>
                  <option>Pant</option>
                  <option>Jacket</option>
                  <option>Accessories</option>
                  <option>Shoes</option>
                  <option>Traditional Wear</option>
                </select>
                {errors.category && <span className="text-error text-sm">{errors.category.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price (USD)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0.01, message: "Price must be greater than 0" },
                    valueAsNumber: true,
                  })}
                />
                {errors.price && <span className="text-error text-sm">{errors.price.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Available Quantity</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  {...register("availableQuantity", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                    valueAsNumber: true,
                  })}
                />
                {errors.availableQuantity && (
                  <span className="text-error text-sm">{errors.availableQuantity.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Minimum Order Quantity</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  {...register("minimumOrderQuantity", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                    valueAsNumber: true,
                  })}
                />
                {errors.minimumOrderQuantity && (
                  <span className="text-error text-sm">{errors.minimumOrderQuantity.message}</span>
                )}
              </div>
            </div>

            {/* Images */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Image URLs (at least one)</span>
              </label>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="input input-bordered flex-1"
                      {...register(`images.${index}.url`, { required: index === 0 ? "First image required" : false })}
                    />
                    {fields.length > 1 && (
                      <button type="button" onClick={() => remove(index)} className="btn btn-error btn-square">
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => append({ url: "" })} className="btn btn-outline btn-primary">
                  <FaPlus /> Add Image
                </button>
                <button type="button" onClick={openPreview} className="btn btn-secondary">
                  <FaEye /> Preview
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Demo Video Link (Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/..."
                  className="input input-bordered w-full"
                  {...register("demoVideo")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Payment Options</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("paymentOption", { required: "Select payment method" })}
                >
                  <option value="">Select</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Stripe">Stripe (Pay First)</option>
                </select>
                {errors.paymentOption && <span className="text-error text-sm">{errors.paymentOption.message}</span>}
              </div>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-semibold">Show on Home Page</span>
                <input type="checkbox" className="checkbox checkbox-primary" {...register("showOnHome")} />
              </label>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={users?.status === "suspended"}>
                <FaUpload /> Add Product
              </button>
              {users?.status === "suspended" && (
                <p className="text-error text-center mt-3 font-semibold">
                  Your account is suspended. Cannot add products.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {previewModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box p-0 max-w-3xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Image Preview</h3>
              <button onClick={closeModal} className="btn btn-ghost btn-circle">
                ✕
              </button>
            </div>

            <div className="p-6">
              {imageList.length > 0 && (
                <>
                  <div className="relative bg-base-200 rounded-lg h-96 flex items-center justify-center overflow-hidden">
                    <img
                      src={imageList[currentImageIndex]}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                    <button onClick={prevImage} className="absolute left-4 btn btn-circle btn-outline">
                      <FaChevronLeft />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 btn btn-circle btn-outline">
                      <FaChevronRight />
                    </button>
                  </div>
                  <p className="text-center mt-4 opacity-70">
                    {currentImageIndex + 1} / {imageList.length}
                  </p>
                </>
              )}
            </div>

            <div className="modal-action p-4">
              <button onClick={closeModal} className="btn btn-primary w-full">
                Close
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default AddProducts;
