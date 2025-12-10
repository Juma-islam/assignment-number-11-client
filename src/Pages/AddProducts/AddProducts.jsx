import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const AddProducts = () => {
    const {
        register,
        handleSubmit,
        control,
        // reset,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            images: [{ url: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "images"
    });

    const watchedImages = watch("images");

    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageList, setImageList] = useState([]);

    const openPreview = () => {
        const urls = watchedImages
            .map((item) => item.url)
            .filter((u) => u && u.length > 0);

        setImageList(urls);
        setCurrentImageIndex(0);
        setPreviewModalOpen(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev + 1 < imageList.length ? prev + 1 : 0
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev - 1 >= 0 ? prev - 1 : imageList.length - 1
        );
    };

    const onSubmit = (data) => {
        const images = data.images.map((img) => img.url).filter((u) => u);

        const finalData = {
            ...data,
            images: images,
        };

        console.log("Final Submitted Data:", finalData);
    };

    return (
        <div className="max-w-3xl mx-auto bg-base-100 shadow-xl p-8 rounded-xl my-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div>
                    <label className="label"><span className="label-text font-semibold">Product Name</span></label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("productName", { required: "Product name is required" })}
                    />
                    {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Product Description</span></label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        {...register("productDescription", { required: "Description is required" })}
                    ></textarea>
                    {errors.productDescription && <p className="text-red-500">{errors.productDescription.message}</p>}
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Category</span></label>
                    <select
                        className="select select-bordered w-full"
                        {...register("category", { required: "Select a category" })}
                    >
                        <option value="">Select Category</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Shoes">Shoes</option>
                    </select>
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Price</span></label>
                    <input
                        type="number"
                        step="0.01"
                        className="input input-bordered w-full"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0.01, message: "Must be greater than 0" }
                        })}
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Available Quantity</span></label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("availableQuantity", {
                            required: "Available quantity required",
                            min: { value: 1, message: "Minimum 1 required" }
                        })}
                    />
                    {errors.availableQuantity && <p className="text-red-500">{errors.availableQuantity.message}</p>}
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Minimum Order Quantity (MOQ)</span></label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("minimumOrderQuantity", {
                            required: "MOQ is required",
                            min: { value: 1, message: "Minimum 1 required" }
                        })}
                    />
                    {errors.minimumOrderQuantity && <p className="text-red-500">{errors.minimumOrderQuantity.message}</p>}
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Image URLs</span></label>

                    {fields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mb-2">
                            <input
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="input input-bordered w-full"
                                {...register(`images.${index}.url`, {
                                    required: "Image URL required"
                                })}
                            />

                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => remove(index)}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        className="btn btn-outline btn-primary mt-2"
                        onClick={() => append({ url: "" })}
                    >
                        + Add More Image URL
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary ml-3 mt-2"
                        onClick={openPreview}
                        disabled={watchedImages.length === 0}
                    >
                        Preview Images
                    </button>
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Demo Video Link</span></label>
                    <input
                        type="url"
                        className="input input-bordered w-full"
                        {...register("demoVideoLink")}
                    />
                </div>

                <div>
                    <label className="label"><span className="label-text font-semibold">Payment Options</span></label>
                    <select
                        className="select select-bordered w-full"
                        {...register("paymentOption", { required: "Select a payment option" })}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Stripe">Stripe</option>
                    </select>
                    {errors.paymentOption && <p className="text-red-500">{errors.paymentOption.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary w-full">Add Product</button>
            </form>

            {/* IMAGE PREVIEW MODAL */}
            {previewModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl text-center mb-4">Image Preview</h3>

                        {imageList.length > 0 && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={imageList[currentImageIndex]}
                                    className="rounded-lg border w-full max-h-80 object-contain"
                                />

                                <div className="flex justify-between w-full mt-4">
                                    <button className="btn btn-outline" onClick={prevImage}>Prev</button>
                                    <button className="btn btn-outline" onClick={nextImage}>Next</button>
                                </div>

                                <p className="text-center mt-2">
                                    {currentImageIndex + 1} / {imageList.length}
                                </p>
                            </div>
                        )}

                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                onClick={() => setPreviewModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AddProducts;
