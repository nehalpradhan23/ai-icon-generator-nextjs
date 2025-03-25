import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { Loader2Icon } from "lucide-react";
import Prompt from "@/app/_data/Prompt";
import axios from "axios";

function LogoIdea({ formData, onHandleInputChange }) {
  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);
  useEffect(() => {
    generateLogoDesignIdea();
  }, []);

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design.title
    )
      .replace("{logoTitle}", formData.title)
      .replace("{logoDesc}", formData.desc)
      .replace("{logoPrompt}", formData.design.prompt);

    // console.log(PROMPT);
    const result = await axios.post("/api/ai-design-ideas", {
      prompt: PROMPT,
    });

    console.log(result.data);
    !ideas && setIdeas(result.data.ideas);
    setLoading(false);
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={"Select Your Design Idea"}
        description={
          "Choose a design style that aligns with your vision, or skip to receive a random suggestion."
        }
      />
      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10" />}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {ideas &&
          ideas.map((item, index) => (
            <h2
              key={index}
              onClick={() => {
                setSelectedOption(item);
                onHandleInputChange(item);
              }}
              className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption == item && "border-primary"}`}
            >
              {item}
            </h2>
          ))}
        <h2
          onClick={() => {
            setSelectedOption("Let AI Select the best idea");
            onHandleInputChange("Let AI Select the best idea");
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${
            selectedOption == "Let AI Select the best idea" && "border-primary"
          }`}
        >
          Let AI Select the best idea
        </h2>
      </div>
    </div>
  );
}

export default LogoIdea;
