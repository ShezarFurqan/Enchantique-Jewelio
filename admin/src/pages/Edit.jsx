import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const Edit = ({ token }) => {
  const { productId } = useParams();

  const [list, setList] = useState([]);
  const [productData, setProductData] = useState({});

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [newCollection, setNewCollection] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      const product = list.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
      } else {
        toast.error("Product not found");
      }
    }
  }, [list, productId]);

  useEffect(() => {
    if (productData && Object.keys(productData).length > 0) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setRealPrice(productData.realPrice || "");
      setQuantity(productData.quantity || "");
      setCategory(productData.category || "Men");
      setSubCategory(productData.subCategory || "Topwear");
      setSizes(productData.sizes || []);
      setBestseller(productData.bestseller || false);
      setNewCollection(productData.newCollection || false);

      setImage1(productData.image[0] || null);
      setImage2(productData.image[1] || null);
      setImage3(productData.image[2] || null);
      setImage4(productData.image[3] || null);
    }
  }, [productData]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("realPrice", realPrice);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("newCollection", newCollection);
      formData.append("sizes", JSON.stringify(sizes));

      // ✅ Only append image if it's a File (new upload)
      if (image1 instanceof File) {
        formData.append("image1", image1);
      } else {
        formData.append("image1Url", image1); // sending existing URL
      }

      if (image2 instanceof File) {
        formData.append("image2", image2);
      } else {
        formData.append("image2Url", image2);
      }

      if (image3 instanceof File) {
        formData.append("image3", image3);
      } else {
        formData.append("image3Url", image3);
      }

      if (image4 instanceof File) {
        formData.append("image4", image4);
      } else {
        formData.append("image4Url", image4);
      }

      const response = await axios.put(`${backendUrl}/api/product/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      if (response.data.success) {
        toast.success("Product updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };


  const getImagePreview = (image) => {
    if (!image) return assets.upload_area;
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  };

  return (
    <div className="p-4">
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Image Uploads */}
        <div>
          <p className="mb-2">Upload Images</p>
          <div className="flex gap-2">
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} className="relative group">
                <label>
                  <img
                    className="w-20 h-20 object-cover rounded border"
                    src={getImagePreview(img)}
                    alt={`Preview ${idx + 1}`}
                  />
                  <input
                    hidden
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      switch (idx) {
                        case 0: setImage1(file); break;
                        case 1: setImage2(file); break;
                        case 2: setImage3(file); break;
                        case 3: setImage4(file); break;
                        default: break;
                      }
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>


        {/* Product Info */}
        <div>
          <p>Product Name</p>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p>Product Description</p>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <p>Category</p>
            <select
              className="px-3 py-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Bridal">Bridal</option>
              <option value="Couple">Couple</option>
            </select>
          </div>

          <div>
            <p>Subcategory</p>
            <select
              className="px-3 py-2 border rounded"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Rings">Rings</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Chains">Chains</option>
              <option value="Earings">Earrings</option>
              <option value="Anklet">Anklet</option>
              <option value="Sets">Sets</option>
            </select>
          </div>

          <div>
            <p>Quantity</p>
            <input
              className="px-3 py-2 border rounded"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div>
            <p>Price</p>
            <input
              className="px-3 py-2 border rounded"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <p>Fake Price</p>
            <input
              className="px-3 py-2 border rounded"
              type="number"
              value={realPrice}
              onChange={(e) => setRealPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
            />
            Bestseller
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newCollection}
              onChange={(e) => setNewCollection(e.target.checked)}
            />
            New Collection
          </label>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2">Select Sizes</p>
          <div className="flex gap-4 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center gap-2 border px-2 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => {
                    if (sizes.includes(size)) {
                      setSizes(sizes.filter((s) => s !== size));
                    } else {
                      setSizes([...sizes, size]);
                    }
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2">Select Sizes</p>
          <div className="flex gap-4 flex-wrap">
            {["6", "7", "8", "9"].map((size) => (
              <label key={size} className="flex items-center gap-2 border px-2 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => {
                    if (sizes.includes(size)) {
                      setSizes(sizes.filter((s) => s !== size));
                    } else {
                      setSizes([...sizes, size]);
                    }
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </div>


        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Edit;
