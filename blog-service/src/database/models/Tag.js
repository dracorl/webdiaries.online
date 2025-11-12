// models/Tag.js
import mongoose from "mongoose"

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      set: value => value.toLowerCase() // Gelen değeri otomatik lowercase yap
    }
  },
  {timestamps: true}
)

// Ayrıca pre-save middleware ile de güvenceye alalım
tagSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.name = this.name.toLowerCase()
  }
  next()
})

// Update işlemleri için de
tagSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate()
  if (update.$set && update.$set.name) {
    update.$set.name = update.$set.name.toLowerCase()
  }
  if (update.name) {
    update.name = update.name.toLowerCase()
  }
  next()
})

const Tag = mongoose.model("Tag", tagSchema)

export default Tag
