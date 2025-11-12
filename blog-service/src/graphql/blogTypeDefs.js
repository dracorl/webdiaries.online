// typeDefs/blogTypeDefs.js
import gql from "graphql-tag"

const blogTypeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    slug: String
    content: String!
    author: User
    tags: [Tag!]!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BlogList {
    totalCount: Int!
    blog: [Blog!]!
  }

  type TagsCount {
    id: ID!
    name: String!
    count: Int!
  }

  type Tag {
    id: ID!
    name: String!
    blogs: [Blog!]!
  }

  type Query {
    blog(id: ID!): Blog
    blogBySlug(slug: String!, author: ID!): Blog
    blogs(
      author: ID
      published: Boolean
      tagId: ID
      limit: Int!
      offset: Int!
    ): BlogList!
    searchBlogs(
      author: ID!
      searchTerm: String!
      limit: Int!
      offset: Int!
    ): BlogList!
    tag(id: ID!): Tag
    tagByName(name: String!): Tag
    tags: [Tag!]!
    tagsCount(author: ID!): [TagsCount!]!
  }

  type Mutation {
    createBlog(
      title: String!
      content: String!
      tags: [ID]
      published: Boolean
    ): Blog!
    updateBlog(
      id: ID!
      title: String
      content: String
      tags: [ID]
      published: Boolean
    ): Blog!
    deleteBlog(id: ID!): Boolean!
    createTag(name: String!): Tag!
    deleteTag(id: ID!): Boolean!
  }
`

export default blogTypeDefs
