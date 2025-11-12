"use client"

import {useEffect} from "react"
import {gql} from "@apollo/client"
import {useQuery} from "@apollo/client/react"
import {useAppStore} from "@/stores/appStore"

const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    user(username: $username) {
      id
      username
    }
  }
`
interface User {
  id: string
  username: string
}
interface UserResponse {
  user: User
}

export const AuthorProvider = ({children}: {children: React.ReactNode}) => {
  const {hostnamePrefix, setAuthor} = useAppStore()

  const {data, loading, error} = useQuery<UserResponse>(GET_USER_BY_USERNAME, {
    variables: {username: hostnamePrefix},
    skip: !hostnamePrefix
  })

  useEffect(() => {
    if (data?.user) {
      setAuthor(data.user.id)
    }
  }, [data, setAuthor])

  // Hata durumunda loglama yapabiliriz
  useEffect(() => {
    if (error) {
      console.error("Author yüklenirken hata:", error)
    }
  }, [error])

  return <>{children}</>
}
