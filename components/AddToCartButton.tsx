"use client";
import { transformToCartItem } from "@/lib/transformAddToCart";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

type Product = {
  _id: string;
  name?: string;
  description?: string;
  slug?: { _type: "slug"; current: string };
  category?: [];
  sizes?: string[];

};

interface Props {
  product: Product;
  disabled?: boolean;
  quantity?: number;
  size: string; 
  
}



export function AddToCartButton({ product, quantity = 1, disabled, size }: Props) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      ...transformToCartItem(product, quantity, size),
      sizes: size ?? "", // Ensure 'sizes' property is present
    };
    dispatch(addToCart(cartItem));
    toast.success(`${product.name} added to cart!`);
  };
 
  return (
    <Button
      className={`w-full ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"
      }`}
      onClick={handleAddToCart}
      disabled={disabled}
    >
      Add to Cart
    </Button>
    
  );
}
