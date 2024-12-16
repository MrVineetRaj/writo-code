"use client";
// import { getQueryResult } from "@/server/api/blog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  const handleSearch = () => {
    // setSearching(true);
    router.push(`/blog?search_query=${search}`);

    // getQueryResult({ search_query: search }).then((data) => {
    //   console.log(data);
    //   setSearching(false);
    // });
  };
  return (
    <nav className="w-screen px-4 py-2 flex gap-1 bg-black items-center justify-between shadow-md shadow-white/20">
      <Link href={"/"}>
        <h2 className="hidden sm:block">WritoCode</h2>
        <h2 className="sm:hidden">WC</h2>
      </Link>

      <span className="flex items-center gap-2">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <img
          src="/images/search.svg"
          alt=""
          className="size-4"
          onClick={() => {
            handleSearch();
          }}
        />
        <Link href={"/generate-blog"} className="bg-blue-700 btn">
          Create
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
