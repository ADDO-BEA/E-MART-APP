import { SALE_QUERYResult } from '@/sanity.types';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Button } from './ui/button';

function Banner({ sales }: { sales: SALE_QUERYResult }) {
  const sale = sales?.[0]; // Get the first sale as the banner content

  if (!sale) {
    return <div className="text-center text-gray-500 py-10">No ongoing sales at the moment.</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto my-10 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      <Card>
        <CardContent className="p-6 md:flex items-center">
          {/* Left Side: Sale Information */}
          <div className="flex-1 p-6 md:px-12 text-center md:text-left">
            <Badge className="mb-4 text-lg font-semibold">{sale?.badge} - {sale?.discountAmount}% Off</Badge>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">{sale?.title}</h3>
            <p className="text-gray-600 mb-4">{sale?.description}</p>
            <p className="text-lg font-semibold">
              Use Code: <span className="text-blue-600">{sale?.couponCode}</span>
            </p>
            <Button className="mt-4">Shop Now</Button>
          </div>

          {/* Right Side: Sale Image */}
          {sale?.image && (
            <div className="w-full md:w-1/2 h-auto flex items-center py-2">
              <Image 
                src={urlFor(sale.image).url()} 
                alt={sale.title || 'Sale image'} 
                width={500} 
                height={500} 
                objectFit="cover"
                className="h-full transition-transform hover:scale-105 duration-500 ease-in-out rounded-lg"
              />
            </div> 
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Banner;
