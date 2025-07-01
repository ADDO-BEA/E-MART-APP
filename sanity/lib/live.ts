// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
// import { defineLive } from "next-sanity";
// import { client } from './client';


// lib/live.ts
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-05-01', // or whatever your API version is
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const sanityFetch = async ({ query, params = {} }: { query: string, params?: Record<string, any> }) => {
  try {
    const data = await client.fetch(query, params);
    return { data };
  } catch (err) {
    
    return { data: null };
  }
};



// const token = process.env.SANITY_API_TOKEN;
//  if(! token){
//   throw new Error('missing Sanity API token')
//  }

// export const { sanityFetch, SanityLive } = defineLive({ 
//   client,
//   serverToken:token,
//   browserToken:token,
//   fetchOptions:{
//     revalidate:0
//   }
  //client: client.withConfig({ 
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    //apiVersion: 'vX' 
  //}) 
// });
