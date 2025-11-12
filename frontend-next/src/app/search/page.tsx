"use client"

import {gql} from "@apollo/client"
import {useQuery} from "@apollo/client/react"
import {useSearchParams} from "next/navigation"
import {useState, useCallback, useEffect} from "react"
import {useAppStore} from "@/stores/appStore"
import BlogFeed from "@/components/main/BlogFeed"

const SEARCH_BLOGS = gql`
  query SearchBlogs(
    $author: ID!
    $searchTerm: String!
    $limit: Int!
    $offset: Int!
  ) {
    searchBlogs(
      author: $author
      searchTerm: $searchTerm
      limit: $limit
      offset: $offset
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

export default function SearchView() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams?.get("search") || ""
  const {author} = useAppStore()

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  // Search term değiştiğinde state'leri resetle
  useEffect(() => {
    setBlogs([])
    setHasMore(false)
    setTotalCount(0)
  }, [searchTerm])

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    fetchMore
  } = useQuery<SearchData>(SEARCH_BLOGS, {
    variables: {
      offset: 0,
      limit: 10,
      author: author,
      searchTerm: searchTerm
    },
    notifyOnNetworkStatusChange: true,
    skip: !author || !searchTerm
  })

  useEffect(() => {
    if (searchData?.searchBlogs) {
      setBlogs(searchData.searchBlogs.blog)
      setTotalCount(searchData.searchBlogs.totalCount)

      // Eğer gelen veri sayısı limitten azsa, daha fazla veri yok demektir
      if (searchData.searchBlogs.blog.length < 10) {
        setHasMore(false)
      } else setHasMore(true)
    }
  }, [searchData])

  const handleLoadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore || !author || !searchTerm) return

    setIsFetchingMore(true)

    try {
      const result = await fetchMore({
        variables: {
          offset: blogs.length,
          limit: 10,
          author,
          searchTerm: searchTerm
        }
      })

      const newBlogs = result?.data?.searchBlogs.blog || []

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
  }, [fetchMore, blogs.length, author, searchTerm, hasMore, isFetchingMore])

  return (
    <BlogFeed
      searchTerm={searchTerm}
      blogs={blogs}
      loading={searchLoading}
      error={searchError}
      hasMore={hasMore}
      isFetchingMore={isFetchingMore}
      onLoadMore={handleLoadMore}
      totalCount={totalCount}
    />
  )
}
