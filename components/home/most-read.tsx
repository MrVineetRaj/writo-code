"use client";

import { IBlogPostDetail } from "@/lib/types";
import React, { useEffect, useState } from "react";
import BlogCard from "./blod-card";
import { getBlogPosts } from "@/server/api/blog";

const MostRead = () => {
  const [blogs, setBlogs] = useState<IBlogPostDetail[] | null>(null);
  useEffect(() => {
    // Load most read articles
    getBlogPosts().then((res) => {
      console.log(res);
      setBlogs(res?.blogs);
    });

    // setBlogs(example_blog_details);
  }, []);
  return (
    <div className="w-screen p-2 ">
      <h3>Most Read Articles</h3>
      {blogs ? (
        <div className="flex flex-col gap-2">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>No Blogs found</div>
      )}
    </div>
  );
};

export default MostRead;
