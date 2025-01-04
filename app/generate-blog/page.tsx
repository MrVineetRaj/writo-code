"use client";
import BlogInput from "@/components/shared/input";
import NewBlogPreView from "@/components/shared/preview";
import React, { useState } from "react";

const GenerateBlogPage = () => {
  const [title, setTitle] = useState<string>("");
  const [subtitle, setsubtitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string[]>([""]);
  const [category, setCategory] = useState<string>("");
  const [sub_category, setSub_category] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  return (
    <div className="w-screen p-4 sm:px-16 sm:pt-8 md:px-32 lg:px-44">
      <BlogInput
        blog_id=""
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
      <NewBlogPreView
        title={title}
        subtitle={subtitle}
        tag={tag}
        category={category}
        sub_category={sub_category}
        thumbnail={thumbnail}
      />
    </div>
  );
};

export default GenerateBlogPage;
