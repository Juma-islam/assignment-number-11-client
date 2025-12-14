import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
// import useRoles from "../../../Hooks/useRoles";
// import ManagerApprovalPending from "../../../components/ManagerApprovalPending/ManagerApprovalPending";
import { FaPlus, FaTrash, FaEye, FaChevronLeft, FaChevronRight, FaUpload } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useRoles from "../../hooks/useRoles";
import ManagerApprovalPending from "../../components/ManagerApprovalPending/ManagerApprovalPending";

const AddProducts = () => {
    const axiosSecure = useAxios()
    const {user} = useAuth()
    const navigate = useNavigate()
    const users = useRoles()
    
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        // setValue
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

    const onSubmit = async (data) => {
        const images = data.images.map((img) => img.url).filter((u) => u);

        // Convert string numbers to actual numbers
        const finalData = {
            ...data,
            price: parseFloat(data.price),
            availableQuantity: parseInt(data.availableQuantity),
            minimumOrderQuantity: parseInt(data.minimumOrderQuantity),
            images: images,
            createdBy: user.displayName
        };
        
        console.log('Submitting product data:', finalData);
        console.log('Price type:', typeof finalData.price);
        console.log('Available Quantity type:', typeof finalData.availableQuantity);

        try{
            const res = await axiosSecure.post('/products', finalData)
            
            if (res.data.insertedId){
                toast.success('Your product added successfully!')
                navigate('/dashboard/manage-products')
            } else {
                toast.error('Sorry, something went wrong!')
            }
            
        } catch (err){
            console.error('Error adding product:', err);
            toast.error('Operation failed!')
        }
    };

    if (users?.role === "manager" & users?.status === "pending") return <ManagerApprovalPending></ManagerApprovalPending>

    return (
        <div className="max-w-4xl mx-auto py-10">
            <title> Add Product - Manager Dashboard</title>
            
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
                <p className="opacity-70">Fill in the details below to add a new product to your inventory</p>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base">Product Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                {...register("productName", { required: "Product name is required" })}
                            />
                            {errors.productName && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.productName.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base">Product Description</span>
                            </label>
                            <textarea
                                placeholder="Describe your product in detail"
                                className="textarea textarea-bordered w-full h-32 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                {...register("productDescription", { required: "Description is required" })}
                            ></textarea>
                            {errors.productDescription && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.productDescription.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Category</span>
                                </label>
                                <select
                                    className="select select-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    {...register("category", { required: "Select a category" })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Shirt">Shirt</option>
                                    <option value="Pant">Pant</option>
                                    <option value="Jacket">Jacket</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Traditional Wear">Traditional Wear</option>
                                </select>
                                {errors.category && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.category.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Price (USD)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="input input-bordered w-full pl-8 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        {...register("price", {
                                            required: "Price is required",
                                            min: { value: 0.01, message: "Must be greater than 0" },
                                            valueAsNumber: true
                                        })}
                                    />
                                </div>
                                {errors.price && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.price.message}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Available Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter quantity"
                                    className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    {...register("availableQuantity", {
                                        required: "Available quantity required",
                                        min: { value: 1, message: "Minimum 1 required" },
                                        valueAsNumber: true
                                    })}
                                />
                                {errors.availableQuantity && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.availableQuantity.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Minimum Order Quantity (MOQ)</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter MOQ"
                                    className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    {...register("minimumOrderQuantity", {
                                        required: "MOQ is required",
                                        min: { value: 1, message: "Minimum 1 required" },
                                        valueAsNumber: true
                                    })}
                                />
                                {errors.minimumOrderQuantity && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.minimumOrderQuantity.message}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base">Image URLs</span>
                            </label>
                            <div className="space-y-3">
                                {fields.map((item, index) => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <div className="flex-1">
                                            <input
                                                type="url"
                                                placeholder="https://example.com/image.jpg"
                                                className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                                {...register(`images.${index}.url`, {
                                                    required: "Image URL required"
                                                })}
                                            />
                                        </div>
                                        {fields.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-error btn-square btn-sm"
                                                onClick={() => remove(index)}
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline btn-primary gap-2"
                                    onClick={() => append({ url: "" })}
                                >
                                    <FaPlus /> Add Image URL
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary gap-2"
                                    onClick={openPreview}
                                    disabled={watchedImages.length === 0}
                                >
                                    <FaEye /> Preview Images
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Demo Video Link</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/video.mp4"
                                    className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    {...register("demoVideoLink")}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Payment Options</span>
                                </label>
                                <select
                                    className="select select-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    {...register("paymentOption", { required: "Select a payment option" })}
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="Stripe">Stripe</option>
                                </select>
                                {errors.paymentOption && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.paymentOption.message}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-control pt-4">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg gap-2"
                                disabled={user?.status === "suspended"}
                            >
                                <FaUpload /> Add Product
                            </button>
                            {user?.status === "suspended" && (
                                <label className="label">
                                    <span className="label-text-alt text-error font-semibold">
                                        *Your account is suspended. You cannot add new products.
                                    </span>
                                </label>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {previewModalOpen && (
                <dialog open className="modal modal-middle">
                    <div className="modal-box max-w-2xl p-0 overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="font-bold text-xl text-center">Image Preview</h3>
                        </div>

                        <div className="p-6">
                            {imageList.length > 0 ? (
                                <div className="flex flex-col items-center">
                                    <div className="relative w-full h-96 bg-base-200 rounded-lg flex items-center justify-center overflow-hidden">
                                        <img
                                            src={imageList[currentImageIndex]}
                                            className="max-w-full max-h-full object-contain"
                                            alt={`Preview ${currentImageIndex + 1}`}
                                        />
                                        
                                        <div className="absolute inset-0 flex items-center justify-between p-4">
                                            <button 
                                                className="btn btn-circle btn-outline btn-lg"
                                                onClick={prevImage}
                                            >
                                                <FaChevronLeft size={20} />
                                            </button>
                                            <button 
                                                className="btn btn-circle btn-outline btn-lg"
                                                onClick={nextImage}
                                            >
                                                <FaChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <p className="text-sm opacity-70">
                                            Image {currentImageIndex + 1} of {imageList.length}
                                        </p>
                                    </div>

                                    {imageList.length > 1 && (
                                        <div className="flex gap-2 mt-6 overflow-x-auto py-2">
                                            {imageList.map((img, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                                                        index === currentImageIndex 
                                                            ? 'border-primary' 
                                                            : 'border-base-300'
                                                    }`}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                >
                                                    <img 
                                                        src={img} 
                                                        className="w-full h-full object-cover"
                                                        alt={`Thumbnail ${index + 1}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="opacity-70">No images to preview</p>
                                </div>
                            )}
                        </div>

                        <div className="modal-action p-6 pt-0">
                            <button
                                className="btn btn-primary w-full"
                                onClick={() => setPreviewModalOpen(false)}
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setPreviewModalOpen(false)}>close</button>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default AddProducts;