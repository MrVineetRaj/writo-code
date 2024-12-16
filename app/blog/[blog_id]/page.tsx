"use client";

import { getTagColor } from "@/lib/services/getTagColor";
import { IBlogPostDetail } from "@/lib/types";
import { getBlogPost } from "@/server/api/blog";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const BlogPage = () => {
  const params = useParams();
  const [blog_id, setBlog_id] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const [blogDetail, setBlogDetail] = useState<IBlogPostDetail | null>(null);

  useEffect(() => {
    const blog_id: string = params?.blog_id as string;

    setBlog_id(blog_id);
    // Load blog content
    if (blog_id) {
      getBlogPost(blog_id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          // setBlogDetail(res.blog.blog);
          const {
            title,
            subtitle,
            tag,
            views,
            created_at,
            thumbnail,
            category,
            sub_category,
          }: {
            title: string;
            subtitle: string;
            tag: string[];
            views: number;
            created_at: number;
            thumbnail: string;
            category: string;
            sub_category: string;
          } = res.blog.blog;
          const blog_detail: IBlogPostDetail = {
            _id: blog_id,
            title,
            subtitle: subtitle,
            tag,
            thumbnail,
            category,
            sub_category,
            views,
            created_at: new Date(created_at).toDateString(),
          };
          setBlogDetail(blog_detail);
          setBlogContent(res.blog.content);
        }
      });
    }
    
  }, [params]);

  return (
    <div className="w-screen p-4 sm:px-16 sm:pt-8 md:px-32 lg:px-44">
      <span className="flex justify-center items-center gap-4 bg-white text-black p-2 rounded-md">
        {blogDetail?.tag && (
          <img src={blogDetail?.thumbnail} alt="" className="size-12 rounded" />
        )}
        <span>
          <h2>{blogDetail?.title}</h2>
          <p>{blogDetail?.subtitle}</p>
          {blogDetail?.tag && (
            <span className="flex flex-wrap gap-2">
              {blogDetail?.tag?.map((tag, index) => {
                console.log(getTagColor(tag));
                return (
                  <span
                    key={index}
                    className={clsx(
                      " px-2 rounded-full  border border-black",
                      getTagColor(tag)
                    )}
                    // className={`px-2 rounded-full ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </span>
          )}
        </span>
      </span>
      <span className="flex items-center mt-2">
        <img src="/icons/home.svg" alt="" className="size-4 " />
        <img src="/icons/right.svg" alt="" className="size-5" />
        {blogDetail?.category && <p>{blogDetail?.category}</p>}
        <img src="/icons/right.svg" alt="" className="size-5" />
        {blogDetail?.sub_category && <p>{blogDetail?.sub_category}</p>}
      </span>
      <Link
        href={`/blog/${blog_id}/update`}
        className="bg-gray-800 inline-block w-full btn  my-2"
      >
        Update
      </Link>
      <ReactMarkdown className="markdown-content ">
        {blogContent || ""}
      </ReactMarkdown>
      <p className="fixed size-10 bottom-2 right-2 bg-black font-semibold flex items-center justify-center rounded-full border">
        {blogDetail?.views}
      </p>
    </div>
  );
};

export default BlogPage;
