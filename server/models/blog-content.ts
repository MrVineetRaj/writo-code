import mongoose, { model, models } from "mongoose";

const blogContentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogDetail",
  },
  content: {
    type: String,
    required: true,
  },
});

const BlogContent = models.BlogContent || model("BlogContent", blogContentSchema);

export default BlogContent;