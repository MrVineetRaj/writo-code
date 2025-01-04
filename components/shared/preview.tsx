"use client";
import { getTagColor } from "@/lib/services/getTagColor";
// import { IBlogPostDetail } from "@/lib/types";
import clsx from "clsx";
import React from "react";
import ReactMarkdown from "react-markdown";

const NewBlogPreView = ({
  title = "",
  subtitle = "",
  blogContent = "",
  tag = [""],
  category = "",
  sub_category = "",
  thumbnail = "",
}: {
  title?: string;
  subtitle?: string;
  blogContent?: string;
  tag?: string[];
  category?: string;
  sub_category?: string;
  thumbnail?: string;
}) => {

  return (
    <div className="">
      <h2 className="text-center my-4">Preview</h2>

      <span className="flex justify-center items-center gap-4 bg-white text-black p-2 rounded-md">
        {thumbnail && (
          <img src={thumbnail} alt="Temp" className="size-12 rounded" />
        )}
        <span>
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
          {tag && (
            <span className="flex flex-wrap gap-2">
              {tag?.map((tag, index) => {
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
        {category && <p>{category}</p>}
        <img src="/icons/right.svg" alt="" className="size-5" />
        {sub_category && <p>{sub_category}</p>}
      </span>
      {/* <button className="bg-gray-800 my-1 btn w-full">Update</button> */}
    </div>
  );
};

export default NewBlogPreView;
