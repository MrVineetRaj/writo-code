import connectToDatabase from "@/server/database/connection";
import BlogContent from "@/server/models/blog-content";
import BlogDetail from "@/server/models/blog-detail";

import { NextResponse } from "next/server";

export async function GET(
  { params }: { params: { blog_id: string } }
) {
  const { blog_id } = params;

  try {
    await connectToDatabase();
    const blog = await BlogContent.findOne({ blog: blog_id }).populate("blog");
    const blogDetails = await BlogDetail.findById(blog_id);
    blogDetails.views += 1;

    await blogDetails.save();
    return NextResponse.json({
      blog,
      status: 200,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    });
  }
}

export async function PUT(
  req: Request,

  { params }: { params: { blog_id: string } }
) {
  const { title, subtitle, tag, content, category, sub_category, thumbnail } =
    await req.json();

  if (
    !title ||
    !subtitle ||
    !tag ||
    !content ||
    !category ||
    !sub_category ||
    !thumbnail
  ) {
    return NextResponse.json({
      error: "All fields are required",
      status: 400,
    });
  }

  const { blog_id } = params;
  try {
    await connectToDatabase();
    const updatedBlogDetail = await BlogDetail.findByIdAndUpdate(
      blog_id,
      { title, subtitle, tag, category, sub_category, thumbnail },
      { new: true }
    );

    const updatedBlogContent = await BlogContent.findOneAndUpdate(
      { blog: blog_id },
      { content },
      { new: true }
    );

    return NextResponse.json({
      blog: {
        detail: updatedBlogDetail,
        content: updatedBlogContent,
      },
      status: 200,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    });
  }
}
