"use client"

import {gql} from "@apollo/client"
import {useQuery} from "@apollo/client/react"
import {useParams} from "next/navigation"
import Link from "next/link"
import {useAppStore} from "@/stores/appStore"
import BackButton from "@/components/ui/BackButton"
import Loading from "@/components/ui/Loading"

const GET_BLOG_BY_SLUG = gql`
  query BlogBySlug($slug: String!, $author: ID!) {
    blogBySlug(slug: $slug, author: $author) {
      id
      title
      content
      tags {
        name
        id
      }
      createdAt
    }
  }
`

interface BlogData {
  blogBySlug: Blog
}

export default function BlogView() {
  const params = useParams()
  const slug = params.slug as string
  const {author} = useAppStore()

  const {data, loading, error} = useQuery<BlogData>(GET_BLOG_BY_SLUG, {
    variables: {
      slug,
      author
    },
    skip: !author
  })

  if (loading) {
    return (
      <div className="space-y-4">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="alert alert-error">
          <span>Error: {error.message}</span>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <Loading />
      </div>
    )
  }

  if (!data.blogBySlug) {
    return (
      <div className="w-full mx-auto px-4">
        <BackButton />
        <div className="text-center text-base mt-10">Blog not found</div>
      </div>
    )
  }

  const {blogBySlug: blog} = data

  return (
    <div className="w-full mx-auto">
      <BackButton />

      <div className="p-1.5 sm:p-6 mb-9 mt-4 bg-base-100 rounded-lg shadow-md">
        <div className="flex flex-col">
          <div className="italic self-end text-sm text-base-content/70 mb-4">
            {new Date(parseInt(blog.createdAt)).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </div>

          <h1 className="text-base-content text-3xl md:text-4xl font-bold mb-6 text-center">
            {blog.title}
          </h1>

          <div
            className="text-base-content prose dark:prose-invert prose-lg max-w-none mt-8"
            dangerouslySetInnerHTML={{
              __html: blog.content
            }}
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <Link key={tag.id} href={`/tag/${tag.name}`}>
                <button className="btn btn-outline btn-sm hover:btn-primary transition-colors">
                  {tag.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
