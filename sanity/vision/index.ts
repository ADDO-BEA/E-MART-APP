import { sanityFetch } from "../lib/live";
import { CATEGORIES_QUERY,  PRODUCTS_QUERY, SALE_QUERY, PRODUCT_SEARCH_QUERY, PRODUCT_BY_CATEGORY,ORDER_QUERY } from "./query";
import {PRODUCT_BY_SLUG,} from './query'







export const getOrder =async (userId:string) =>{
    try {
        const order = await sanityFetch({
            query: ORDER_QUERY,
            params: { userId },
        })
        return order?.data?.filter((order:any) => order.clerkUserId === userId) || [];
    } catch (error) {
        console.log('error fetching order', error);
        return [];
        
    }
}

export const getSale = async () => {

    try { 
        const product = await sanityFetch({
            query: SALE_QUERY
        });
        return product?.data || [];

    } catch (error) {
        console.log('error',error);
        return [];
    }
}; 

export const getProducts = async () =>{

    try {
        const product = await sanityFetch({
            query: PRODUCTS_QUERY
            
        })
        return product?.data || [];
        
        
    } catch (error) {
        console.log('error fetching product',error)
        
    }
}


export const getCategories = async () => {
    try {
      const categories = await sanityFetch({ query: CATEGORIES_QUERY });
        
      return categories ?? [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  export const getProductByCategory = async (slug:string)=>{
     try {
        const product = await sanityFetch({
            query: PRODUCT_BY_CATEGORY ,
            params:{slug}
        });
       
        return product?.data || [];
        
     } catch (error) {
        console.log('error fetching product',error)
        
     }
  }

export const getProduct = async (slug:string) =>{


   try {
       const result =await sanityFetch({
           query: PRODUCT_BY_SLUG,
          params:{
            slug
          }

       });
    const product = result?.data?.[0] || null;
       return product;

   } catch(error){
       console.log('error fetching product',error)
   }
}



export const searchProduct = async (searchparams:string) =>{

    try {
       const product = await sanityFetch ({
              query: PRODUCT_SEARCH_QUERY,
              params:{
                searchParams: searchparams,
              }

       })
       return product?.data || [];
    } catch (error) {
        console.log('fetching product error',error)
        return [];
        
    }
}

