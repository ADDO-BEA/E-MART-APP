
import {  getProductByCategory,   } from "@/sanity/vision";
import React from "react";
import ProductMap from "@/components/ProductMap";


interface PageProps {
  params: { slug: string };
}
const Page = async ({ params }: PageProps) => {
  const { slug } = params; 
const product = await getProductByCategory(slug); 
  return (

      <div className=' m-4'>
      <div>
       { product.length > 0 ? (
            <ProductMap products={product}/>
       ) : (
            <div className='flex justify-center items-center  h-screen'>
             <p className='text-gray-500  bg-white text-center font-semibold text-4xl' >
              sorry,no product found  for this category for <span className='text-blue-300'>{slug}</span>
             </p> 
            </div>
       )}
      </div>
    </div>

  );
};

export default Page;
