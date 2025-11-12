interface Tag {
  id: string
  name: string
  count: number
}

interface TagsData {
  tagsCount: Tag[]
}

interface Blog {
  id: string
  title: string
  content: string
  slug: string
  tags: Tag[]
  createdAt: string
}

interface BlogFeedProps {
  tagData?: TagData
  searchTerm?: string
  blogs: Blog[]
  loading: boolean
  error?: any
  hasMore: boolean
  isFetchingMore: boolean
  onLoadMore: () => void
  totalCount?: number
}

interface TagData {
  tagByName: {
    id: string
    name: string
  }
}

interface BlogsData {
  blogs: {
    blog: Blog[]
    totalCount: number
  }
}
interface SearchData {
  searchBlogs: {
    totalCount: number
    blog: Blog[]
  }
}
