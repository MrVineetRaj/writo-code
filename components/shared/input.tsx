"use client";

import { createBlogPost, updateBlogPost } from "@/server/api/blog";
import { usePathname, useRouter } from "next/navigation";

import NewBlogPreView from "./preview";
import dynamic from "next/dynamic";

const BlockNoteContainer = dynamic(
  () => import("@/components/shared/BlockNoteContainer"),
  {
    ssr: false,
  }
);

const BlogInput = ({
  blog_id,
  title,
  setTitle,
  subtitle,
  setsubtitle,
  content,
  setContent,
  tag,
  setTag,
  category,
  setCategory,
  sub_category,
  setSub_category,
  thumbnail,
  setThumbnail,
}: {
  blog_id: string;
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setsubtitle: (subtitle: string) => void;
  content: string;
  setContent: (content: string) => void;
  tag: string[];
  setTag: (tag: string[]) => void;
  category: string;
  setCategory: (category: string) => void;
  sub_category: string;
  setSub_category: (sub_category: string) => void;
  thumbnail: string;
  setThumbnail: (thumbnail: string) => void;
}) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleGenerateBlog = () => {
    createBlogPost({
      title,
      subtitle: subtitle,
      tag,
      content,
      category,
      sub_category,
      thumbnail,
    }).then((res) => {
      // console.log(res);
      if (res.status === 201) {
        router.push(`/blog/${res.blog.detail._id}`);
      }
    });
  };

  const handleUpdateBlog = () => {
    updateBlogPost(blog_id, {
      title,
      subtitle: subtitle,
      tag,
      content,
      category,
      sub_category,
      thumbnail,
    }).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        // console.log(res.blog.detail._id);
        router.push(`/blog/${res.blog.detail._id}`);
      }
    });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <span className="grid grid-cols-2 gap-3">
          <input
            type="text"
            className="input w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            className="input w-full"
            placeholder="Sub Title"
            value={subtitle}
            onChange={(e) => {
              setsubtitle(e.target.value);
            }}
          />
          <input
            value={tag}
            type="text"
            className="input w-full"
            placeholder="Tag"
            onChange={(e) => {
              const tags: string[] = e.target.value.split(",");
              tags.map((tag) => tag.trim());

              setTag(tags);
            }}
          />
          <input
            type="text"
            className="input w-full"
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <input
            type="text"
            className="input w-full"
            placeholder="Sub Category"
            value={sub_category}
            onChange={(e) => {
              setSub_category(e.target.value);
            }}
          />
          <input
            type="text"
            className="input w-full"
            placeholder="Thumbnail"
            value={thumbnail}
            onChange={(e) => {
              setThumbnail(e.target.value);
            }}
          />
        </span>

        {/* <textarea
          className="input w-full min-h-96"
          placeholder="Content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea> */}

        <NewBlogPreView
          title={title}
          subtitle={subtitle}
          tag={tag}
          category={category}
          sub_category={sub_category}
          thumbnail={thumbnail}
        />

        {pathName.includes("update") ? (
          content ? (
            <BlockNoteContainer
              initialContent={content}
              setContent={setContent}
              editable={true}
            />
          ) : (
            <p>Loading</p>
          )
        ) : (
          <BlockNoteContainer
            initialContent={content}
            setContent={setContent}
            editable={true}
          />
        )}
        <button
          className="btn bg-blue-700"
          onClick={() => {
            // console.log(pathName);
            if (pathName.includes("update")) {
              handleUpdateBlog();
            } else if (pathName.includes("generate-blog")) {
              // console.log("Generating Blog");
              handleGenerateBlog();
            }
            // handleGenerateBlog();
          }}
        >
          Generate Blog
        </button>
      </div>
    </div>
  );
};

export default BlogInput;
