"use client";

import { transformToCartItem } from "@/lib/transformAddToCart";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import SizeSelector from '@/components/SizeSelector';
import SizeData from '@/components/SizeData';
import { calculateDiscountedPrice } from "@/lib/priceUtils";


interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  category?: {
    _ref: string;
    _type: "reference";
    _key: string;
    title: string;
  }[];
  image?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    
  };
}





type ProductWithClientFields = Product & {
  size?: string[];    
};

const ProductDetails = ({ product }: { product: ProductWithClientFields }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const categoryTitle = (product.category?.[0])?.title?.toLowerCase() || "";
  const isBag = categoryTitle.includes("bag");
  const isHeadphone = categoryTitle.includes("headphone");
  const sizeType = categoryTitle.includes("shoes") ? "shoes" : "clothing";
  

  const discountedPrice = calculateDiscountedPrice(product.price ?? 0, product.discount ?? 0);

  const handleAddToCart = () => {
    if (!isBag && !isHeadphone && !selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    if (product.stock !== undefined && quantity > product.stock) {
      toast.error(`Only ${product.stock} in stock!`);
      return;
    }

    const cartItem = transformToCartItem(product, quantity, selectedSize ?? "",);
    dispatch(addToCart(cartItem));
    toast.success(`${product.name} added to cart!`);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>

      <div className="mt-2">
        {product.discount ? (
          <div>
            <span className="text-red-500 font-bold text-xl">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-gray-500 line-through ml-2">
              ${(product.price ?? 0).toFixed(2)}
            </span>
            <span className="text-green-600 ml-2">({product.discount}% OFF)</span>
          </div>
        ) : (
          <span className="text-xl font-bold">${(product.price ?? 0).toFixed(2)}</span>
        )}
      </div>

      {!isBag && !isHeadphone && (
        <SizeSelector sizes={SizeData[sizeType]} onSizeSelect={setSelectedSize} />
      )}

      <div className="flex items-center gap-4 mt-4">
        <h3 className="font-semibold">Quantity:</h3>
        <div className="flex items-center">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-sm font-bold bg-gray-200 rounded-l-lg"
          >
            -
          </button>
          <span className="px-6 py-2">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2 text-sm font-bold bg-gray-200 rounded-r-lg"
            disabled={product.stock !== undefined && quantity >= product.stock}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
          (!isBag && !isHeadphone && !selectedSize) ||
          (product.stock !== undefined && product.stock < 1)
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
        disabled={
          (!isBag && !isHeadphone && !selectedSize) ||
          (product.stock !== undefined && product.stock < 1)
        }
      >
        {product.stock !== undefined && product.stock < 1
          ? "Out of Stock"
          : !isBag && !isHeadphone && !selectedSize
          ? "Select a Size First"
          : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetails;
