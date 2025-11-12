"use client"

import {gql} from "@apollo/client"
import {useQuery} from "@apollo/client/react"
import {useState, useCallback, useEffect} from "react"
import {useAppStore} from "@/stores/appStore"
import BlogFeed from "@/components/main/BlogFeed"

const GET_BLOGS = gql`
  query Blogs($limit: Int!, $offset: Int!, $author: ID, $published: Boolean) {
    blogs(
      limit: $limit
      offset: $offset
      author: $author
      published: $published
    ) {
      totalCount
      blog {
        id
        title
        content
        slug
        tags {
          name
          id
        }
        createdAt
      }
    }
  }
`

export default function HomePage() {
  const {author} = useAppStore()

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
    fetchMore
  } = useQuery<BlogsData>(GET_BLOGS, {
    variables: {
      offset: 0,
      limit: 10,
      author,
      published: true
    },
    notifyOnNetworkStatusChange: true,
    skip: !author
  })

  useEffect(() => {
    if (blogsData?.blogs?.blog) {
      setBlogs(blogsData.blogs.blog)
      // Eğer gelen veri sayısı limitten azsa, daha fazla veri yok demektir
      if (blogsData.blogs.blog.length < 10) {
        setHasMore(false)
      } else setHasMore(true)
    }
  }, [blogsData])

  const handleLoadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore || !author) return

    setIsFetchingMore(true)

    try {
      const result = await fetchMore({
        variables: {
          offset: blogs.length,
          limit: 10,
          author,
          published: true
        }
      })

      const newBlogs = result?.data?.blogs.blog || []

      setBlogs(prev => [...prev, ...newBlogs])

      // Eğer gelen veri sayısı limitten azsa, daha fazla veri yok
      if (newBlogs.length < 10) {
        setHasMore(false)
      }
    } catch (err) {
      console.error("Error loading more blogs:", err)
    } finally {
      setIsFetchingMore(false)
    }
  }, [fetchMore, blogs.length, author, hasMore, isFetchingMore])

  return (
    <BlogFeed
      blogs={blogs}
      loading={blogsLoading}
      error={blogsError}
      hasMore={hasMore}
      isFetchingMore={isFetchingMore}
      onLoadMore={handleLoadMore}
      totalCount={blogsData?.blogs.totalCount}
    />
  )
}
