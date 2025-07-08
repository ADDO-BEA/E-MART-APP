'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '@/redux/slices/cartSlice';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { BsTrash } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import { calculateDiscountedPrice } from '@/lib/priceUtils';
import { loadStripe} from '@stripe/stripe-js';

interface cartState {
  items: CartItem[];
  subtotal: number;
  totalAmount: number;
}

interface CartItem {
  _id: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  discount?: number;
  slug: { _type: "slug"; current: string };

}



const CartItem = ({
  item,
  onQuantityChange,
  onDelete,
  isSelected,
  onSelect
}: {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}) => {
 
  const discountedPrice = calculateDiscountedPrice(item.price, item.discount);

  return (
    <div className="cart-item flex items-center space-x-4 p-4 border-b border-gray-300 rounded-lg">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onSelect(e.target.checked)}
        className="mr-5 w-6 h-6 border-gray-300 rounded bg-white accent-black"
      />

<Link href={`/product/${item.slug.current}`}>

        <div className="w-full h-30 overflow-hidden aspect-[4/3]">
          <Image
            // In CartItem component
            src={item.image ? urlFor(item.image).url() :"/placeholder-image.png"}
            alt={item.name ?? "Product image"}
            width={100}
            height={50}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      <div className="flex-grow">
        <p className="font-semibold">{item.name}</p>
        <p className="text-gray-500">Size:{item.size}</p>
        <div className="flex items-center space-x-2">
          <span className="text-red-400 font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
          <span className="text-gray-500 line-through">{`$${item.price.toFixed(2)}`}</span>
          {item.discount && (
            <span className="text-green-600 text-sm">{`(${item.discount}% OFF)`}</span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onQuantityChange(item.quantity - 1)}
          className="px-2 py-1 border border-gray-300 rounded"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <p>{item.quantity}</p>
        <button
          onClick={() => onQuantityChange(item.quantity + 1)}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          +
        </button>
      </div>

      <button onClick={onDelete} className="text-red-500 ml-4">
        <BsTrash size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: { cart: cartState }) => state.cart);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { isSignedIn, user } = useUser();

  const handleItemSelect = (id: string, checked: boolean) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      checked ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleDeleteItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    
  };
  

  // State to manage loading state for checkout
  // stripe- checkout ha

  const [isLoading, setIsLoading] = useState(false);
  // function to handle checkout

  const handleCheckout = async () => {
  const selectedProduct = items.filter((item) => selectedItems.has(item._id));

  if (selectedProduct.length === 0) {
    alert('Please select items to checkout');
    return;
  }
  setIsLoading(true)

  try {
  
    const checkoutItems = selectedProduct.map(item => ({
      ...item,
    
      image: item.image ? urlFor(item.image).url() : '/placeholder-image.png'
    }));
    

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        items: checkoutItems,
        customer: {
          email: user?.primaryEmailAddress?.emailAddress || "",
          clerkUserId: user?.id || "",
        }
      })
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create checkout session');
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    // clear selected item after checkout 
    dispatch((clearCart()));
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    
  } catch (error) {
    // console.error('Checkout error:', error);
    alert(`Checkout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally{
    setIsLoading(false);
  }
};

const selectedCartItems = items.filter((item) => selectedItems.has(item._id));

const selectedSubtotal = selectedCartItems.reduce(
  (sum, item) => sum + (item.price - (item.discount ? (item.price * item.discount) / 100 : 0)) * item.quantity,
  0
);

const selectedTotal = selectedSubtotal; 
  return (
    <div className="p-6 mt-6 max-w-screen-lg mx-auto mb-6 border border-gray-300 rounded-lg shadow-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <Link href="/" className="text-blue-grey hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {items.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          items.map((item) => (
            <div key={`${item._id}-${item.size}`} className="cart-item-container">
              <CartItem
                item={item}
                onQuantityChange={(quantity) => handleQuantityChange(item._id, quantity)}
                onDelete={() => handleDeleteItem(item._id)}
                isSelected={selectedItems.has(item._id)}
                onSelect={(checked) => handleItemSelect(item._id, checked)}
              />
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col space-y-4 my-6 p-4 border-t border-b border-gray-300 rounded-lg">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal:</span>
          <span>{`$${selectedSubtotal.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span>{`$${selectedTotal.toFixed(2)}`}</span>
        </div>
        <button
          onClick={handleClearCart}
          className="text-red-500 mt-2"
        >
          Clear Cart
        </button>
      </div>

     
 {isSignedIn ? (
  <button
    onClick={handleCheckout}
    disabled={isLoading}
    className={`w-full bg-black text-white py-2 rounded ${
      isLoading ? 'opacity-60 cursor-not-allowed' : ''
    }`}
  >
    {isLoading ? (
  <span className="flex items-center justify-center gap-2">
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z" />
    </svg>
    Processing...
  </span>
) : 'Proceed to Checkout'}

  </button>
) : (
  <SignInButton>
    <button className="w-full bg-black text-white py-2 rounded">
      Sign In to Checkout
    </button>
  </SignInButton>
)}


    </div>
  );
}

export default CartPage;
