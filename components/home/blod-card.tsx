import { getTagColor } from "@/lib/services/getTagColor";
import { IBlogPostDetail } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }: { blog: IBlogPostDetail }) => {
  return (
    <Link
      href={`blog/${blog._id}`}
      className="flex flex-row gap-2 p-2 items-center relative hover:shadow-lg hover:shadow-black border border-transparent rounded hover:border hover:border-gray-200 animate-smooth active:scale-90"
    >
      <div className="">
        <img
          src={blog?.thumbnail}
          alt={"thumbnail"}
          className="size-14 rounded"
        />
      </div>
      <div>
        <h3>{blog.title}</h3>
        <p>{blog.subtitle}</p>
        {blog.tag && (
          <span className="flex flex-wrap gap-2">
            {blog.tag?.map((tag, index) => {
              // console.log(getTagColor(tag));
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
      </div>
      <span className="absolute text-sm font-semibold border flex items-center justify-center px-2 py-1 rounded-full top-1 right-1">
        {blog.views}
      </span>
    </Link>
  );
};

export default BlogCard;
