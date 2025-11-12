// models/Blog.js
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      sparse: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag"
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  {timestamps: true}
)

// Slug oluşturma middleware'i
blogSchema.pre("save", next => {
  if (this.isModified("title") && !this.slug) {
    this.slug = generateSlug(this.title)
  }
  next()
})

// Slug oluşturma fonksiyonu
const generateSlug = title => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
    .substring(0, 60)
}

blogSchema.index({title: "text", content: "text"})
blogSchema.index({slug: 1})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog
