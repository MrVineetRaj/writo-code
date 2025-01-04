"use client";
import BlogInput from "@/components/shared/input";
import NewBlogPreView from "@/components/shared/preview";
import { getBlogPost } from "@/server/api/blog";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const BlogUpdatePage = () => {
  const params = useParams();
  const [blog_id, setBlogId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tag, setTag] = React.useState<string[]>([""]);
  const [subtitle, setsubtitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [sub_category, setSub_category] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");

  useEffect(() => {
    const blog_id: string = params?.blog_id as string;
    setBlogId(blog_id);
    // Load blog details
    getBlogPost(blog_id).then((res) => {
      console.log(res);
      setTitle(res.blog.blog.title);
      setContent(res.blog.content);
      setTag(res.blog.blog.tag);
      setsubtitle(res.blog.blog.subtitle);
      setCategory(res.blog.blog.category);
      setSub_category(res.blog.blog.sub_category);
      setThumbnail(res.blog.blog.thumbnail);
    });
  }, []);

  return (
    <main className="w-screen p-4 sm:px-16 sm:pt-8 md:px-32 lg:px-44">
      {title && <h3 className="text-center">Updating Blog <span className="text-blue-500"> {title}</span></h3>}
      <BlogInput
        blog_id={blog_id}
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setsubtitle={setsubtitle}
        content={content}
        setContent={setContent}
        tag={tag}
        setTag={setTag}
        category={category}
        setCategory={setCategory}
        sub_category={sub_category}
        setSub_category={setSub_category}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
      />
    </main>
  );
};

export default BlogUpdatePage;
