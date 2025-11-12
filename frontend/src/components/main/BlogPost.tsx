"use client"
import Link from "next/link"

interface BlogPostProps {
  blog: Blog
}

const BlogPost = ({blog}: BlogPostProps) => {
  return (
    <div
      className="p-1.5 sm:p-6 mb-8 shadow-md rounded-lg bg-base-100 border border-base-300"
      key={blog.id}
    >
      <div className="flex flex-col">
        <div className="italic self-end text-sm text-base-content/70">
          {new Date(parseInt(blog.createdAt)).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </div>

        <div className="text-base-content text-xl md:text-2xl font-bold mb-4 mt-2">
          {blog.title}
        </div>

        <div
          className="text-base-content prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none mb-4"
          dangerouslySetInnerHTML={{
            __html:
              blog.content.length > 200
                ? blog.content.substring(0, 200) + "..."
                : blog.content
          }}
        />

        <div className="mt-4 self-end">
          <Link href={`/blog/${blog.slug}`}>
            <button className="bg-neutral text-neutral-content btn btn-outline btn-sm hover:bg-neutral-600 transition-colors">
              Continue reading
            </button>
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <Link
              key={tag.id + blog.id}
              href={`/tag/${encodeURIComponent(tag.name)}`}
            >
              <button className="btn btn-outline btn-xs hover:btn-primary transition-colors">
                {tag.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPost
