 

import { Product } from "@/sanity.types";
import { createSlice,PayloadAction}from "@reduxjs/toolkit";


interface CartItem extends Omit<Product, 'slug'> {
  slug: { _type: "slug"; current: string };
 
  quantity: number;
  size: string;
  name: string;
}

 interface cartState{
   items :  CartItem[],
   totalAmount: number,
   subtotal: number,
   discount: number,
   
 }



 const initialState : cartState ={

  items :[],
  totalAmount: 0,
  subtotal:0,
  discount:0,

 
 }

 const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const discount = item.discount ? item.discount / 100 : 0;
    const discountedPrice = (item.price ?? 0) * (1 - discount);
    return sum + discountedPrice * item.quantity;
  }, 0);

  return { subtotal, totalAmount };
};

 


  const cartSlice = createSlice({

    name :'cart',
    initialState,
    reducers :{
      addToCart :(state, action: PayloadAction<CartItem>) =>{
        const existingItem =state.items.find((item) => item._id === action.payload._id && item.size === action.payload.size);
        
        if(existingItem){
          existingItem.quantity+= action.payload.quantity; ;
        } else{
           state.items.push(action.payload);
        }
     const { subtotal,totalAmount} = calculateTotals (state.items);
     state.subtotal =subtotal;
     state.totalAmount = totalAmount;

      },
      // update quantity
    updateQuantity :(state, action : PayloadAction<{id :string , quantity : number} >)=>{
      const item =state.items.find((item) => item._id === action.payload.id);
      if (item ){
        item.quantity = Math.max(1, action.payload.quantity) 

      }
      const { subtotal, totalAmount} = calculateTotals(state.items);
      state.subtotal= subtotal;
      state.totalAmount = totalAmount;

    },
   // remove item from cart

   removeFromCart :( state, action : PayloadAction<string> ) =>{
    state.items = state.items.filter((items) => items._id !== action.payload);
    const {subtotal, totalAmount} = calculateTotals(state.items);
    state.subtotal= subtotal;
    state.totalAmount =totalAmount;

   },
   // clearCart
   clearCart :(state) =>{
    state.items =[];
    state.subtotal =0;
    state.totalAmount =0;
   }

    }
  })
  export const {addToCart, updateQuantity, removeFromCart, clearCart} = cartSlice.actions;
  export default cartSlice.reducer;

