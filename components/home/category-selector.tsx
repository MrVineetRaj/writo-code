"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

const Pill = ({
  name,
  isActive,
  handleClick,
}: {
  name: string;
  isActive: boolean;
  handleClick: () => void;
}) => {
  return (
    <span
      className={clsx(
        `px-2 py-1 rounded-full text-sm `,
        isActive ? "bg-blue-500 text-white" : "border "
      )}
      onClick={handleClick}
    >
      {name}
    </span>
  );
};

const CategorySelector = () => {
  const router = useRouter();
  const [showCategory, setShowCategory] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("");
  const categories = [
    {
      name: "Web Development",
      sub_categories: [
        { name: "React" },
        { name: "Next JS" },
        { name: "MongoDB" },
        { name: "Express" },
        { name: "Node JS" },
      ],
    },
    {
      name: "Mobile Developnt",
      sub_categories: [
        { name: "React Native" },
        { name: "Flutter" },
        { name: "Swift" },
        { name: "Kotlin" },
        { name: "Java" },
      ],
    },
    {
      name: "Mobile Devlopment",
      sub_categories: [
        { name: "React Native" },
        { name: "Flutter" },
        { name: "Swift" },
        { name: "Kotlin" },
        { name: "Java" },
      ],
    },
    {
      name: "Mobile Developmet",
      sub_categories: [
        { name: "React Native" },
        { name: "Flutter" },
        { name: "Swift" },
        { name: "Kotlin" },
        { name: "Java" },
      ],
    },
    {
      name: "Mobile Devepment",
      sub_categories: [
        { name: "React Native" },
        { name: "Flutter" },
        { name: "Swift" },
        { name: "Kotlin" },
        { name: "Java" },
      ],
    },
  ];
  return (
    <div className="px-4 flex flex-col gap-2  w-screen my-2">
      <span
        className="btn bg-black"
        onClick={() => {
          setShowCategory(!showCategory);
        }}
      >
        Categories
      </span>

      <div
        className={clsx(
          "overflow-hidden flex flex-wrap gap-1",
          !showCategory && "hidden"
        )}
      >
        {categories.map((category, index) => (
          <Pill
            key={index}
            name={category.name}
            isActive={category.name === activeCategory}
            handleClick={() => {
              setActiveCategory(category.name);
            }}
          />
        ))}
      </div>

      {activeCategory && (
        <div className="flex flex-col flex-wrap gap-1">
          <h4>Sub Categories</h4>
          <div className="flex flex-wrap gap-1">
            {categories
              .find((category) => category.name === activeCategory)
              ?.sub_categories.map((sub_category, index) => (
                <Pill
                  key={index}
                  name={sub_category.name}
                  isActive={false}
                  handleClick={() => {
                    router.push(
                      `/blog?category=${activeCategory}&sub_category=${sub_category.name}`
                    );
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
