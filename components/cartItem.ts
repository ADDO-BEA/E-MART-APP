
import { Product } from "@/sanity.types";

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
  
