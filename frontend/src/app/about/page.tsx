"use client"

import Loading from "@/components/ui/Loading"
import {gql} from "@apollo/client"
import {useQuery} from "@apollo/client/react"
import Link from "next/link"
import BackButton from "@/components/ui/BackButton"
import {useAppStore} from "@/stores/appStore"

const BIO_QUERY = gql`
  query User($userId: ID) {
    user(id: $userId) {
      bio
      links {
        url
        name
      }
    }
  }
`
interface User {
  bio: string
  links: [Link]
}

interface Link {
  url: string
  name: string
}
interface UserResponse {
  user: User
}
const About = () => {
  const {author} = useAppStore()
  const {data, loading} = useQuery<UserResponse>(BIO_QUERY, {
    variables: {
      userId: author
    },
    skip: !author
  })

  if (loading) return <Loading />
  if (!data || !data.user) return <Loading />

  return (
    <>
      <BackButton />
      <div className="p-3 mb-9 mt-10">
        <div className="flex flex-col items-center">
          <div className="text-base-content text-center prose-xl md:prose-2xl font-bold mb-4">
            About Me
          </div>
          <div className="text-center mt-10 text-base-content prose dark:prose-invert prose-sm sm:prose-base lg:prose-sm xl:prose-base focus:outline-none">
            {data.user.bio}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {data.user.links.map(
              (link: {url: string; name: string}, index: number) => (
                <div key={index}>
                  <Link
                    className="mr-2 btn btn-outline btn-xs"
                    href={link.url}
                    target="_blank"
                  >
                    {link.name}
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default About
