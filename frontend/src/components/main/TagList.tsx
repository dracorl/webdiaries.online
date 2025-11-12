"use client"

import {gql} from "@apollo/client"
import {useQuery} from "@apollo/client/react"
import Link from "next/link"
import {useAppStore} from "@/stores/appStore"
import Loading from "@/components/ui/Loading"

const TAGS_COUNT = gql`
  query TagsCount($author: ID!) {
    tagsCount(author: $author) {
      id
      name
      count
    }
  }
`

const TagList = () => {
  const {author, setLeftDrawerOpen} = useAppStore()

  const {data, loading, error} = useQuery<TagsData>(TAGS_COUNT, {
    variables: {author},
    skip: !author
  })

  const handleTagClick = () => {
    if (window.innerWidth < 1024) {
      setLeftDrawerOpen(false)
    }
  }

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

  if (!data.tagsCount || data.tagsCount.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center text-base-content/70 p-4">
          No Tags Created. Use tags to organize your posts!
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 max-w-full">
        {data.tagsCount.map(tag => (
          <Link
            key={tag.id}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            onClick={handleTagClick}
            className="inline-flex max-w-full"
          >
            <button className="btn btn-outline btn-xs hover:btn-primary transition-colors whitespace-nowrap truncate max-w-full min-w-0">
              <span className="truncate">{tag.name} </span>
              <span className="text-xs opacity-75">({tag.count})</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TagList
