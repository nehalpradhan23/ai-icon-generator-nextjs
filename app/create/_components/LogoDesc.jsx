import React from "react";
import HeadingDescription from "./HeadingDescription";

function LogoDesc({ onHandleInputChange, formData }) {
  return (
    <div className="my-10">
      <HeadingDescription
        title={"Describe Your Logo Vision"}
        description={
          "Share your ideas, themes or inspirations to create a logo that prefectly represents your brand or project"
        }
      />
      <input
        type="text"
        defaultValue={formData?.desc}
        // value={formData?.desc}
        placeholder="Enter your logo name"
        className="p-4 border rounded-lg mt-5 w-full"
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoDesc;
