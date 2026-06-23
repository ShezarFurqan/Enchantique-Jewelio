import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, updateQuantity, buyNow, setIsPromoApplied, isPromoApplied } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo] = useState("");

  const PROMO_CODE = import.meta.env.VITE_PROMO_CODE;

  useEffect(() => {
    if (products?.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image?.[0] || "");
      } else {
        console.error("Product not found");
      }
    }
  }, [productId, products]);

  const handleApplyPromo = () => {
    if (!promo.trim()) return;
    if (promo.trim() === PROMO_CODE) {
      setIsPromoApplied(true);
      toast.success("Promo code applied!");
    } else {
      toast.error("Invalid promo code");
    }
  };


  if (!productData) return <div className="text-center py-10">Loading...</div>;

  const displayedPrice = isPromoApplied
    ? (productData.price * 0.85).toFixed(2)
    : productData.price.toFixed(2);


  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mt-8">
          {/* Product Images */}
          <div className="lg:col-span-3">
            <div className="lg:flex">
              <div className="lg:ml-5">
                <img
                  src={image}
                  alt="Main Product"
                  className="w-full rounded-lg object-cover"
                />
              </div>
              <div className="mt-2 w-full lg:w-32 flex flex-col">
                {productData.image?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImage(img)}
                    className={`h-20 mb-3 rounded-lg aspect-square overflow-hidden ${image === img ? "border-2 border-black" : "border border-gray-300"
                      }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold">{productData.name}</h1>
            <div className="flex items-center gap-1 my-4">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star_icon} className="w-4" alt="Star" />
              ))}
              <img src={assets.star_dull_icon} className="w-4" alt="Star dull" />
              <span className="text-lg pl-2">(122)</span>
            </div>

            {/* Size Selection */}
            <div className="my-8">
              <p>Select Size</p>
              <div className="flex gap-2 mt-2">
                {productData.sizes?.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border rounded ${size === s ? "bg-gray-300 border-black" : "bg-gray-100"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className="mt-10 border-t border-b py-4 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">
                  {currency}
                  {displayedPrice}
                </h1>
                {isPromoApplied && (
                  <h2 className="text-lg text-gray-600">
                    <strike>
                      {currency}
                      {productData.price.toFixed(2)}
                    </strike>
                  </h2>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    if (!size && productData.sizes.length) {
                      console.log(productData.sizes.length);
                      toast.error("Select Product Size");
                      return;
                    }
                    buyNow(productId, size, quantity)
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    if (!size && productData.sizes.length) {
                      console.log(productData.sizes.length);
                      toast.error("Select Product Size");
                      return;
                    }
                    addToCart(productId, size);
                    updateQuantity(productId, size, quantity);
                  }}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Add to Cart
                </button>

              </div>
            </div>

            {/* Quantity */}
            {productData.quantity > 0 ? (
              <div className="mt-4 flex items-center border border-black rounded-full w-fit px-3 py-2">
                <i
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="ri-subtract-fill cursor-pointer"
                ></i>
                <p className="mx-2">{quantity}</p>
                <i
                  onClick={() => {
                    if (quantity < productData.quantity) setQuantity(quantity + 1);
                  }}
                  className="ri-add-line cursor-pointer"
                ></i>
              </div>
            ) : (
              <h1 className="text-xl font-semibold text-red-600 mt-4">Out of stock</h1>
            )}

            {/* Promo Code */}
            <div className="mt-10 flex gap-3 items-center">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter Promo Code"
                className="border px-4 py-2 rounded w-full"
              />
              <button
                onClick={handleApplyPromo}
                disabled={isPromoApplied}
                className={`px-6 py-2 text-white rounded ${isPromoApplied ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                  }`}
              >
                Apply
              </button>
            </div>

            {/* Extras */}
            <ul className="mt-8 text-sm text-gray-600 space-y-1">
              <li>Free shipping worldwide</li>
              <li>Cancel anytime</li>
            </ul>
          </div>

          {/* Description & Reviews */}
          <div className="lg:col-span-3">
            <div className="border-b mt-12">
              <nav className="flex gap-4">
                <span className="py-4 border-b-2 border-black">Description</span>
                <span className="py-4 text-gray-600">Reviews (0)</span>
              </nav>
            </div>
            <div className="mt-8">
              <h2 className="text-3xl font-bold">{productData.name}</h2>
              <p className="mt-4">{productData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </section>
  );
};

export default Product;
