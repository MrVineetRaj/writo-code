import BlogDetail from "@/server/models/blog-detail";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams;
  const category = query.get("category") || "";
  const sub_category = query.get("sub_category") || "";
  const search_query = query.get("search_query") || "";


  let blogs;

  if (search_query) {
    blogs = await BlogDetail.find({
      $or: [
        { title: { $regex: search_query, $options: "i" } },
        { subtitle: { $regex: search_query, $options: "i" } },
        { tag: { $regex: search_query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
  }

  if (category && sub_category) {
    blogs = await BlogDetail.find({ category, sub_category }).sort({
      createdAt: -1,
    });
  }

  if (category && !sub_category) {
    blogs = await BlogDetail.find({ category }).sort({
      createdAt: -1,
    });
  }

  if (!category && sub_category) {
    blogs = await BlogDetail.find({ sub_category }).sort({
      createdAt: -1,
    });
  }

  return NextResponse.json({
    blogs: blogs,
    status: 200,
  });
}
