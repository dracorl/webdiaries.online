"use client"
import {useEffect, useRef} from "react"
import Loading from "@/components/ui/Loading"
import BackButton from "@/components/ui/BackButton"
import BlogPost from "@/components/main/BlogPost"

const BlogScroll = ({
  tagData,
  searchTerm,
  blogs,
  loading,
  error,
  hasMore,
  isFetchingMore,
  onLoadMore,
  totalCount
}: BlogFeedProps) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting) {
          onLoadMore()
        }
      },
      {threshold: 0.5}
    )
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [onLoadMore])

  const initialState =
    !loading &&
    blogs.length === 0 &&
    !error &&
    totalCount == undefined &&
    tagData?.tagByName !== null
  const loadingState = !error && (loading || totalCount == undefined)
  const noBlogs = !loading && blogs.length === 0 && !error && totalCount === 0
  const noMoreBlogs = !loading && !error && !hasMore && totalCount != undefined

  return (
    <div className="w-full mx-auto">
      {tagData && (
        <>
          <BackButton />
          <div className="mb-6 px-1.5 sm:px-0">
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
              Tag:{" "}
              <span className="text-primary">
                {tagData?.tagByName?.name
                  ? tagData?.tagByName?.name
                  : "not found"}
              </span>
            </h1>
            <div className="mt-2 text-base-content/70">
              {initialState ? (
                <Loading />
              ) : loading ? (
                "Searching..."
              ) : blogs.length > 0 ? (
                `${totalCount} results found`
              ) : (
                <div className="text-center mt-8 text-base-content/70 p-4 border-t border-base-300">
                  No more blogs to show.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {searchTerm && (
        <>
          <BackButton />
          <div className="mb-6 px-1.5 sm:px-0">
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
              Search: <span className="text-primary">"{searchTerm}"</span>
            </h1>
            <div className="mt-2 text-base-content/70">
              {initialState ? (
                <Loading />
              ) : loading ? (
                "Searching..."
              ) : (
                `${totalCount} results found`
              )}
            </div>
          </div>
        </>
      )}

      {!tagData && !searchTerm && loadingState && <Loading />}

      {blogs.map(blog => (
        <BlogPost key={blog.id + "_BlogPost"} blog={blog} />
      ))}

      {hasMore && <div ref={loaderRef} style={{height: 50}} />}

      {isFetchingMore && (
        <div className="flex justify-center my-8">
          <Loading />
        </div>
      )}
      {!searchTerm && noBlogs && (
        <div className="space-y-4">
          <div className="text-center text-base-content/70 p-4">
            No Posts Yet. Ready to share your story?
          </div>
        </div>
      )}
      {noMoreBlogs && (
        <div className="text-center mt-8 text-base-content/70 p-4 border-t border-base-300">
          No more blogs to show.
        </div>
      )}
    </div>
  )
}

export default BlogScroll
