import React from 'react';
import ProductCard from './ProductCard';

interface Props {
  products: any;
}

export default function ProductMap({ products }: Props) {
  return (
    <div className=" mx-auto px-10 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product: any) => (
          <div key ={product._id} className=' mb-10'>
            <ProductCard key={product._id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}