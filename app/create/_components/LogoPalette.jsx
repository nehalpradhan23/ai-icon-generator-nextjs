import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Colors from "@/app/_data/Colors";

function LogoPalette({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.palette);
  return (
    <div className="my-10">
      <HeadingDescription
        title={"Choose Your Color Palette"}
        description={
          "Pick the colors that reflect your brands personality and create a lasting impression."
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors?.map((palette, index) => (
          <div
            className={`flex p-1 cursor-pointer ${
              selectedOption == palette.name &&
              "border-2 rounded-lg border-primary"
            }`}
            key={index}
          >
            {palette?.colors?.map((color, index) => (
              <div
                className="h-24 w-full"
                onClick={() => {
                  setSelectedOption(palette?.name);
                  onHandleInputChange(palette.name);
                }}
                key={index}
                style={{
                  backgroundColor: color,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoPalette;
