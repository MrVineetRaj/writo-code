import mongoose from "mongoose";

const blogDetailSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  tag:[ {
    type: String,
    required: false,
  }],
  thumbnail: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  sub_category: {
    type: String,
    required: false,
  },
  created_at: {
    type: Number,
    default: new Date().getTime(),
  },
  views: {
    type: Number,
    default: 0,
  },
});

const BlogDetail =
  mongoose.models.BlogDetail || mongoose.model("BlogDetail", blogDetailSchema);

export default BlogDetail;
