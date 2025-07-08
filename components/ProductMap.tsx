import React from 'react';
import ProductCard from './ProductCard';

// Example definition (adjust fields as needed):
export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  discount?: number;
  stock?: number;
  slug?: { _type: 'slug'; current: string };
}

interface Props {
  products: Product[];
 
}

export default function ProductMap({ products }: Props) {
  return (
    <div className="mx-auto px-10 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product,idx) => (
          <div key={product._id || idx} className="mb-10">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
