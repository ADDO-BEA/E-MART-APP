
import { getProductByCategory } from "@/sanity/vision";
import ProductMap from "@/components/ProductMap";
import { sanityFetch } from "@/sanity/lib/live";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const categories = await sanityFetch({
    query: `*[_type == "category"]{ "slug": slug.current }`,
  });

  return categories.data.map((category: { slug: string }) => ({
    slug: category.slug,
  }));
}

const Page = async ({ params }: Props) => {
  const { slug } = params;
  const product = await getProductByCategory(slug);

  return (
    <div className="m-4">
      <div>
        {product.length > 0 ? (
          <ProductMap products={product} />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 bg-white text-center font-semibold text-4xl">
              Sorry, no product found for this category:{" "}
              <span className="text-blue-300">{slug}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
