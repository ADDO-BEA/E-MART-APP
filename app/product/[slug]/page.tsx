
import { getProduct } from "@/sanity/vision";
import Container from "@/components/Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ProductDetails from "@/components/ProductDetail";





export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params; 


  const product = await getProduct(slug);
  

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }



  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 items-stretch">
  {/* Product Image Section */}
  <div className="w-full h-full flex justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden">
    {product.image && (
      <Image
        src={urlFor(product.image).url()}
        alt={product.name || "Product Image"}
        width={500}
        height={500}
        className="rounded-lg object-contain w-full h-full max-h-[600px] transition-transform duration-300 hover:scale-105"
      />
    )}
  </div>

  {/* Product Details Section */}
  <div className="w-full h-full flex flex-col justify-between bg-white p-6 ">
  < ProductDetails product={product} />
  </div>
</Container>

  );
}
