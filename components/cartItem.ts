// Updating the import path to the correct location of Product type
//  the Product type is not available, define it locally:
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: { _type: "slug"; current: string };
  category: { _ref: string; _type: "reference"; _key: string }[];
  size: string;
}
export interface CartItem extends Omit<Product, 'slug' | 'category'> {
  slug: { _type: "slug"; current: string };
  category: { _ref: string; _type: "reference"; _key: string }[];
  name: string;
  description: string;
  size: string; // consistent with redux
  quantity: number;
}
export interface CartState {
    items : CartItem;
    subtotal: number;
    totalAmount: number;
}

// export default function cartItem() {
//     return (
     
//     );
//   }
  
