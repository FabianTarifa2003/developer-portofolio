// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

export const dynamic = "force-dynamic"; // mos e cache fare

async function getBlogs() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
}