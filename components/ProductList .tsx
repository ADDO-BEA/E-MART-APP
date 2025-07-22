import React from 'react';
import ProductMap from '@/components/ProductMap'

interface Product {
  _id: string;
  name: string;
  price: number;
  categories: Category[];
  stock?: number | undefined;
  
}
interface Category {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
}

interface Props {
  products: Product[];
  title?: boolean;
  categories: Category[];
  stock?: number | undefined;
}

function Product({ products }: Props) {
  return (
    <div className="w-full max-w-screen-xl mx-auto my-10">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center  p-5 mb-6">Our Products</h2>

      {/* Product Grid */}
      <ProductMap products={products}/>
    </div>
  );
}


export default Product;
