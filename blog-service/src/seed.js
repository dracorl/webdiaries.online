// seed.js
import {faker} from "@faker-js/faker"
import {hashPassword} from "./helpers/hashing.js"
import {mongoClient} from "./db.js"
import {Blog, User, Tag} from "./database/models/index.js"

// Slug oluşturma fonksiyonu
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
    .substring(0, 60)
}

async function seed() {
  const existing = await User.findOne({username: "test"})
  if (existing) {
    await mongoClient.close()
    console.log("Database already seeded. Skipping...")
    return
  }

  await User.deleteMany({})
  await Tag.deleteMany({})
  await Blog.deleteMany({})

  const user = await User.create({
    username: "test",
    password: await hashPassword("testtest"),
    email: "test@example.com"
  })

  // Generate unique tag names (lowercase)
  const tagNames = new Set()
  while (tagNames.size < 30) {
    tagNames.add(faker.music.genre().toLowerCase())
  }
  const tags = Array.from(tagNames).map(name => ({name}))

  const createdTags = await Tag.insertMany(tags, {ordered: false})
  console.log(`${createdTags.length} tags created`, createdTags)

  const blogs = []
  for (let i = 0; i < 100; i++) {
    const randomTags = faker.helpers.arrayElements(
      createdTags,
      faker.number.int({min: 3, max: 5})
    )
    const title = faker.lorem.sentence()
    const slug = generateSlug(title)

    blogs.push({
      title,
      slug,
      content: `<p>${faker.lorem.paragraphs(5, "<br><br>")}</p>`,
      author: user._id,
      tags: randomTags.map(t => t._id),
      published: faker.datatype.boolean(),
      createdAt: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: new Date()
      }),
      updatedAt: new Date()
    })
  }

  await Blog.insertMany(blogs)
  console.log("100 blogs created with slugs")
  await mongoClient.close()
  console.log("Seeding done!")
}

seed().catch(console.error)
