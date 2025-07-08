
type Product = {
  _id: string;
  name?: string;
  description?: string;
  slug?: { _type: "slug"; current: string };
 category?: CategoryRef[];  
  sizes?: string[];
  
};




type CategoryRef = {
  _ref: string;
  _type: "reference";
  _key: string;
  title: string;
};

export interface CartItem extends Omit<Product, "slug" | "category" | "sizes"> {
  name: string;
  description: string;
  slug: { _type: "slug"; current: string };
  category: CategoryRef[];
  size: string;
  quantity: number;
}

export const transformToCartItem = (
  product: Product,
  quantity: number,
  size: string = ""
): CartItem => {
  const categoryRefs: CategoryRef[] = Array.isArray(product.category)
    ? product.category.map((cat:CategoryRef) => {
        return {
          _ref: cat._ref,
          _type: "reference",
          _key: cat._ref,
          title: cat.title ?? "", 
        };
      })
    : [];

  return {
    ...product,
    name: product.name ?? "",
    description: product.description ?? "",
    quantity,
    size,
    category: categoryRefs,
    slug: {
      _type: "slug",
      current: product.slug?.current ?? "",
    },
  };
};
