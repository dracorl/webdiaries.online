import {HttpLink} from "@apollo/client"
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache
} from "@apollo/client-integration-nextjs"

export const {getClient, query, PreloadQuery} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_BACKEND_API, // GraphQL endpoint'iniz
      fetchOptions: {
        // Next.js fetch seçenekleri
        next: {revalidate: 60} // 60 saniye cache
      }
    })
  })
})
