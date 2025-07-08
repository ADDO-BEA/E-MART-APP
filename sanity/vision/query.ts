import { defineQuery } from 'next-sanity';

export const SALE_QUERY = defineQuery(`*[_type=="sale"]|order(name asc)`);
export const PRODUCTS_QUERY = defineQuery(`*[_type=='product']| order(name asc)`);

export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"] | order(name asc)`);



export const PRODUCT_BY_SLUG = defineQuery(`
  *[_type=="product" && slug.current == $slug]{
    _id,
    name,
    description,
    price,
    discount,
    slug,
    category[]-> { title },
    image,
 
    stock,
  }|order(name asc)
`); 

export const PRODUCT_BY_CATEGORY = defineQuery(`
*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)] | order(name asc){
  id,
    name,
    price,
    description,
    discount,
    stock,
    slug,
    image,
  category[]->{
      _ref,
      _type,
      _key,
      title
    }
}`);
export const PRODUCT_SEARCH_QUERY = defineQuery(`*[_type=='product' && name match $searchParams] | order(name asc)`);
 export const ORDER_QUERY = defineQuery(`
  *[_type == "order" && clerkUserId == $userId] 
  | order(orderDate desc) {
    _id,
    _createdAt,
    customerName,
    email,
    totalPrice,
    currency,
    status,
    orderDate,
    products[] {
      product->{
        name,
      },
      price,
      quantity,
      size,
      currency,
    }
  }
`);


