
import { searchProduct } from '@/sanity/vision';
import React from 'react';
import Container from '@/components/Container'
import ProductMap from '@/components/ProductMap';

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPage = async ({ searchParams }: Props) => {
  const {query} = searchParams;
  const product = await searchProduct(query);
  console.log( query);

  if (!product || product.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md text-center'>
          <h1 className='text-2xl font-bold mb-4'>Sorry, no products found for "<span className='text-blue-500'>{query}</span>"</h1>
          <p className='mb-4'>Try searching for something else</p>
          
        </div>
      </div>
    );
  }

  return (
    <Container className="">
      <h1 className='text-2xl'> search result for <span className='text-blue-500 text-2xl'>{query}</span></h1>
      <ProductMap products={product} />

    </Container>
  );
};

export default SearchPage;