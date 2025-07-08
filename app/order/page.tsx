'use client';
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { ORDER_QUERY } from "@/sanity/vision/query";
import { useUser } from "@clerk/nextjs";


type Product = {
  product: {
    _id: string;
    name: string;
  };
  quantity: number;
  size?: string;
};

type Order = {
  _id: string;
  customerName: string;
  orderDate?: string;
  status: string;
  email: string;
  currency: string;
  totalPrice: number;
  products: Product[];
};




function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  // const [deletingId, setDeletingId] = useState<string | null>(null);

  const { user } = useUser();
// api token that has write/delete access to orders
// const handleDelete =async(orderId:string)=>{
//   if(!confirm("Are you sure you want to delete this order?")) return;
//   setDeletingId(orderId);
//   try{
//     await client.delete(orderId);
//     setOrders((prev) => prev.filter(order => order._id !== orderId));
//     alert('order deleted successfully ')
//   } catch (err) {
//     console.error("Failed to delete order:", err);
//   } finally {
//     setDeletingId(null);
//   }
// }

  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await client.fetch(ORDER_QUERY, {
          userId: user.id, 
        });
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center">Loading orders...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow">
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">{order.customerName}</span>
                <span className="text-sm text-gray-500">
                  {order.orderDate ? new Date(order.orderDate).toLocaleString() : ""}
                </span>
              
                {/* <button onClick={() => handleDelete (order._id) } 
                  disabled={deletingId === order._id}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50">
                    {deletingId === order._id ? "Deleting..." : "Delete"}
                </button> */}
              </div>
              <div className="mb-2 text-gray-700">
                Status: <span className="font-semibold">{order.status}</span>
              </div>
              <div className="mb-2 text-gray-700">Email: {order.email}</div>
              <div className="mb-2 text-gray-700">
                Total:{" "}
                <span className="font-bold">
                  {order.currency} {order.totalPrice?.toFixed(2)}
                </span>
              </div>
              <div>
                <div className="font-semibold mb-1">Product</div>
                <ul className="pl-4 list-disc">
                    {order.products?.map((product, index) => (
                     <div key={`${product.product?._id}-${product.size}-${index}`}>
                    {product.product?.name || 'product'} 
                    <div className=" mb-2 text-grey-700"> 
                      quantity:{product.quantity}
                    </div>
                    <div className="mb-2 text-gray-700">
                      size:{product.size || 'N/A'}
                    </div>
                    </div>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;

                