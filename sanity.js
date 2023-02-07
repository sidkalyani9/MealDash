
// import SanityClientConstructor from "@sanity/client";
const sanityClient = require('@sanity/client')
const ImageUrlBuilder = require("@sanity/image-url");




const client = sanityClient({
    projectId: 'acmhqqms',
    dataset: 'production',
    useCdn: true, // set to `true` to fetch from edge cache
    apiVersion: '2022-01-12', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  })

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
  