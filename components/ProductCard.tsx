import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from '@/components/AddToCartButton';



interface Props {
  product: Product;

}

function ProductCard({ product }: Props) {

  const isOutOfStock = !product.stock || product.stock <= 0;
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? ((product.price ?? 0) - ((product.price ?? 0) * (product.discount ?? 0)) / 100).toFixed(2)
    : product.price;

    
    
  return (
    <div className="  border border-gray-300 rounded-lg overflow-hidden group text-sm bg-white p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105  flex flex-col">
      
      
      <Link href={`/product/${product.slug?.current ?? ""}`}>

        <div className="w-full h-30 overflow-hidden  aspect-[4/3]">
          <Image
            src={product.image ? urlFor(product.image).url() : "/placeholder-image.png"}
            alt={product.name ?? "Product image"}
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      
      </Link>
      
    

      {/* Product Details */}
      <div className="p-4 flex flex-col text-left flex-grow">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>

        {/* Pricing Section */}
        <div className="flex items-center space-x-2 mt-2">
          {hasDiscount ? (
            <>
              <p className="text-red-500 text-sm font-bold">${discountedPrice}</p>
              <p className="text-gray-500 text-sm line-through">${product.price}</p>
            </>
          ) : (
            <p className="text-gray-600 text-lg">${product.price}</p>
          )}
        </div>

        <div className="mt-4">
          <AddToCartButton product={product} sizes={""} disabled={isOutOfStock} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;