"use client";
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface CartItem {
  _id: string;
  name: string;
  image: string; // or image: { ... } if it's an object
  price: number;
  quantity: number;
  discount?: number;
  sizes: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  
}

function Cart() {
  
  const cartItems = useSelector((state: RootState) => state.cart.items.length);

  return (
    <div className="relative">
      <Link href="/cart">
        <FaShoppingCart size={24} />
        {cartItems > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {cartItems}
          </span>
        )}
      </Link>
    </div>
  );
}

export default Cart;