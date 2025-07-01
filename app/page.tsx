import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList ";
import { getCategories, getProducts, getSale } from "@/sanity/vision";
import Container from "@/components/Container";
import CategoryPopover from "@/components/CategoryPopover";



export default async function Home() {
  const products = (await getProducts()) || [];  
  const sales = await getSale();
  const categoriesResult = (await getCategories()) || { data: [] };
  const categories = 'data' in categoriesResult ? categoriesResult.data : [];
  
  
  return (
    <div>
      <div className="mt-6 ml-4">
          <CategoryPopover categories={categories} />
        </div>
      <Container className="space-y-6">
        
        <Banner sales={sales} />

        <ProductList  products={products} title={true} categories={categories} />
      </Container>
    </div>
  );
}
