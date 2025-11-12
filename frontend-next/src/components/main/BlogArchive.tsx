"use client"

import {gql} from "@apollo/client"
import {useQuery} from "@apollo/client/react"
import Link from "next/link"
import {useAppStore} from "@/stores/appStore"
import Loading from "@/components/ui/Loading"

interface MonthData {
  blog: Blog[]
  totalCount: number
}

interface YearData {
  totalCount: number
  months: {
    [month: string]: MonthData
  }
}

interface StructuredBlogs {
  blogs: {
    [year: string]: YearData
  }
  totalCount: number
}

const BLOGS_QUERY = gql`
  query Blogs($limit: Int!, $offset: Int!, $author: ID, $published: Boolean) {
    blogs(
      limit: $limit
      offset: $offset
      author: $author
      published: $published
    ) {
      blog {
        id
        createdAt
        title
        slug
      }
      totalCount
    }
  }
`

const listBlogs = (data: BlogsData): StructuredBlogs => {
  const blogs = data.blogs.blog

  const structuredData: StructuredBlogs = {
    blogs: {},
    totalCount: data.blogs.totalCount
  }

  blogs.forEach(blog => {
    const date = new Date(Number(blog.createdAt))
    const year = date.getFullYear().toString()
    const month = date.toLocaleString("default", {month: "long"}).toLowerCase()

    if (!structuredData.blogs[year]) {
      structuredData.blogs[year] = {totalCount: 0, months: {}}
    }

    if (!structuredData.blogs[year].months[month]) {
      structuredData.blogs[year].months[month] = {blog: [], totalCount: 0}
    }

    structuredData.blogs[year].months[month].blog.push(blog)
    structuredData.blogs[year].months[month].totalCount += 1
    structuredData.blogs[year].totalCount += 1
  })

  return structuredData
}

const BlogArchive = () => {
  const {author, setLeftDrawerOpen} = useAppStore()

  const handleBlogClick = () => {
    if (window.innerWidth < 1024) {
      setLeftDrawerOpen(false)
    }
  }

  const {data, loading, error} = useQuery<BlogsData>(BLOGS_QUERY, {
    variables: {
      limit: 0,
      offset: 0,
      published: true,
      author
    },
    skip: !author // authorId yoksa query'yi atla
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

  if (!data.blogs || data.blogs.blog.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center text-base-content/70 p-4">
          No Posts Yet. Ready to share your story?
        </div>
      </div>
    )
  }

  const structuredData = listBlogs(data)
  const blogs = structuredData.blogs

  return (
    <ul className="ms-0 menu rounded-box bg-base-100 w-full ">
      {Object.entries(blogs)
        .reverse()
        .map(([year, yearData]) => (
          <li key={year}>
            <details>
              <summary className="text-base font-medium">
                {year} ({yearData.totalCount})
              </summary>
              <ul className="ml-2">
                {Object.entries(yearData.months)
                  .reverse()
                  .map(([month, monthData]) => (
                    <li key={month}>
                      <details>
                        <summary className="text-sm">
                          {month.charAt(0).toUpperCase() + month.slice(1)} (
                          {monthData.totalCount})
                        </summary>
                        <ul className="ml-4">
                          {monthData.blog.map((blog, index) => (
                            <li key={`${blog.id}-${index}`}>
                              <Link
                                href={`/blog/${blog.slug}`}
                                onClick={handleBlogClick}
                                className="text-xs truncate hover:bg-base-200 rounded px-2 py-1 block"
                                title={blog.title}
                              >
                                {blog.title.slice(0, 25)}
                                {blog.title.length > 25 ? "..." : ""}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
              </ul>
            </details>
          </li>
        ))}
    </ul>
  )
}

export default BlogArchive
