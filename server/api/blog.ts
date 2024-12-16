import axios from "axios";

export const getBlogPosts = async () => {
  const response = await axios.get(`/api/blog`);
  return response.data;
};

export const getBlogPost = async (blog_id: string) => {
  const response = await axios.get(`/api/blog/${blog_id}`);
  return response.data;
};

export const createBlogPost = async (data: {
  title: string;
  subtitle: string;
  tag: string[];
  content: string;
  category: string;
  sub_category: string;
  thumbnail: string;
}) => {
  const response = await axios.post(`/api/blog`, data);
  return response.data;
};

export const updateBlogPost = async (
  blog_id: string,
  data: {
    title: string;
    subtitle: string;
    tag: string[];
    content: string;

    category: string;
    sub_category: string;
    thumbnail: string;
  }
) => {
  const response = await axios.put(`/api/blog/${blog_id}`, data);
  return response.data;
};

export const getQueryResult = async ({
  category,
  sub_category,
  search_query,
}: {
  category?: string;
  sub_category?: string;
  search_query?: string;
}) => {
  console.log("Here ! == >", category, sub_category, search_query);
  const response = await axios.get(
    `/api/blog/query?category=${category || ""}&sub_category=${
      sub_category || ""
    }&search_query=${search_query || ""}`
  );
  return response.data;
};
