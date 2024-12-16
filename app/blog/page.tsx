"use client";
import BlogCard from "@/components/home/blod-card";
import { IBlogPostDetail } from "@/lib/types";
import { getQueryResult } from "@/server/api/blog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const QueryResultPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as string;
  const sub_category = searchParams.get("sub_category") as string;
  const search_query = searchParams.get("search_query") as string;
  console.log(sub_category);

  const [blogs, setBlogs] = useState<IBlogPostDetail[] | null>(null);

  useEffect(() => {
    if (category || sub_category) {
      getQueryResult({ category, sub_category }).then((res) => {
        // console.log(res);
        setBlogs(res?.blogs);
      });
    }

    if (search_query) {
      getQueryResult({ search_query }).then((res) => {
        // console.log(res);
        setBlogs(res?.blogs);
      });
    }
  }, [category, sub_category, search_query]);

  return (
    <div className="w-screen p-2 ">
      {category && <h3>Category: {category}</h3>}
      {sub_category && <p>Sub Category: {sub_category}</p>}
      {search_query && <h3>Results for {`"${search_query}"`}</h3>}
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

export default QueryResultPage;
