"use server";
import connectToDatabase from "@/server/database/connection";
import BlogContent from "@/server/models/blog-content";
import BlogDetail from "@/server/models/blog-detail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
  try {
    await connectToDatabase();
    const blogDetail = await BlogDetail.create({
      title,
      subtitle,
      tag,
      category,
      sub_category,
      thumbnail,
    });

    const blogContent = await BlogContent.create({
      blog: blogDetail._id,
      content,
    });

    return NextResponse.json({
      blog: {
        detail: blogDetail,
        content: blogContent,
      },
      status: 201,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    console.log("Connected to database");
    const blogs = await BlogDetail.find().sort({ created_at: -1 });
    return NextResponse.json({
      blogs,
      status: 200,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    });
  }
}
