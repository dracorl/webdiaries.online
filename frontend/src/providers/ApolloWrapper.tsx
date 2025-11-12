"use client"

import {HttpLink} from "@apollo/client"
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache
} from "@apollo/client-integration-nextjs"

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_API,
    fetchOptions: {
      cache: "no-store" // SSR için cache kontrolü
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
  })
}

export function ApolloWrapper({children}: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
