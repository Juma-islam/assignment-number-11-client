import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const UpdateProductModal = ({ modalRef, selectedProduct, refetchProducts }) => {
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      category: "",
      price: "",
      availableQuantity: "",
      minimumOrderQuantity: "",
      paymentOption: "",
      productDescription: "",
      demoVideoLink: "",
    },
  });

  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedProduct) {
      reset({
        productName: selectedProduct.productName,
        category: selectedProduct.category,
        price: selectedProduct.price,
        availableQuantity: selectedProduct.availableQuantity,
        minimumOrderQuantity: selectedProduct.minimumOrderQuantity,
        paymentOption: selectedProduct.paymentOption,
        productDescription: selectedProduct.productDescription || "",
        demoVideoLink: selectedProduct.demoVideoLink || "",
      });

      setImageUrls(selectedProduct.images || []);
    }
  }, [selectedProduct, reset]);

  const handleAddImage = () => {
    setImageUrls((prev) => [...prev, ""]);
  };

  const handleImageChange = (index, value) => {
    const copy = [...imageUrls];
    copy[index] = value;
    setImageUrls(copy);
  };

  const handleCloseModal = () => {
    setImageUrls((prev) => prev.filter((img) => img.trim() !== ""));
    modalRef.current.close();
  };

  const handlePrevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const onSubmit = async (data) => {
    const finalProduct = {
      ...data,
      images: imageUrls.filter((img) => img.trim() !== ""),
    };

    try {
      const res = await axiosSecure.patch(`/products/${selectedProduct._id}`, finalProduct);
      if (res.data.modifiedCount > 0) {
        modalRef.current.close();
        await refetchProducts();
        toast.success("Product has been updated!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Sorry, something went wrong!");
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box relative">
        <button onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Update This Product</h3>

        {selectedProduct ? (
          <>
            <div className="border-b pb-4 flex items-center gap-4">
              <img src={selectedProduct.images?.[0]} alt="" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-lg">{selectedProduct.productName}</h3>
                <p className="text-sm text-gray-500">{selectedProduct.createdBy}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium">Product Name</label>
                <input
                  {...register("productName", { required: "Product name is required" })}
                  className="input input-bordered w-full"
                />
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="select select-bordered w-full"
                >
                  <option>Shirt</option>
                  <option>Pant</option>
                  <option>Jacket</option>
                  <option>Accessories</option>
                  <option>Shoes</option>
                  <option>Traditional Wear</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { required: "Price is required" })}
                  className="input input-bordered w-full"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Available Quantity</label>
                <input
                  type="number"
                  {...register("availableQuantity", { required: "Quantity is required" })}
                  className="input input-bordered w-full"
                />
                {errors.availableQuantity && <p className="text-red-500 text-sm">{errors.availableQuantity.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Minimum Order Quantity</label>
                <input
                  type="number"
                  {...register("minimumOrderQuantity", { required: "MOQ is required" })}
                  className="input input-bordered w-full"
                />
                {errors.minimumOrderQuantity && (
                  <p className="text-red-500 text-sm">{errors.minimumOrderQuantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Payment Option</label>
                <select
                  {...register("paymentOption", { required: "Payment option is required" })}
                  className="select select-bordered w-full"
                >
                  <option>Cash on Delivery</option>
                  <option>Stripe</option>
                </select>
                {errors.paymentOption && <p className="text-red-500 text-sm">{errors.paymentOption.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Product Description</label>
                <textarea
                  {...register("productDescription", { required: "Description is required" })}
                  className="textarea textarea-bordered w-full"
                ></textarea>
                {errors.productDescription && (
                  <p className="text-red-500 text-sm">{errors.productDescription.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Demo Video Link</label>
                <input
                  {...register("demoVideoLink")}
                  className="input input-bordered w-full"
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium">Product Images</label>

                <div className="flex items-center justify-center gap-4 mt-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    disabled={imageUrls.length <= 1}
                    onClick={handlePrevImage}
                  >
                    &lt;
                  </button>

                  {imageUrls.length > 0 && (
                    <div className="w-32 h-32 border rounded bg-gray-100 overflow-hidden">
                      <img src={imageUrls[currentIndex]} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    disabled={imageUrls.length <= 1}
                    onClick={handleNextImage}
                  >
                    &gt;
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {imageUrls.map((img, index) => (
                    <input
                      key={index}
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="input input-bordered w-full"
                      placeholder={`Image URL ${index + 1}`}
                    />
                  ))}
                </div>

                <button type="button" className="btn btn-secondary btn-sm mt-3" onClick={handleAddImage}>
                  Add More Images
                </button>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center text-red-500">Product not found.</div>
        )}
      </div>
    </dialog>
  );
};

export default UpdateProductModal;
