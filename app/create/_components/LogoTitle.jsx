"use client";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { useSearchParams } from "next/navigation";

function LogoTitle({ onHandleInputChange }) {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams?.get("title") ?? "");

  useEffect(() => {
    const newTitle = searchParams?.get("title") ?? "";
    setTitle(newTitle);
    onHandleInputChange(newTitle);
  }, [searchParams]);

  return (
    <div className="my-10">
      <HeadingDescription
        title={"Logo Title"}
        description={"Add Your Business, App or Website Name for a Custom Logo"}
      />
      <input
        type="text"
        placeholder="Enter your logo name"
        className="p-4 border rounded-lg mt-5 w-full"
        defaultValue={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onHandleInputChange(e.target.value);
        }}
      />
    </div>
  );
}

export default LogoTitle;
