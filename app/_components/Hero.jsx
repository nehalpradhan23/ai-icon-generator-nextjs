import { Button } from "@/components/ui/button";
import React from "react";

const heroData = {
  heading: "AI logo Generator",
  description: "Create logos with help of AI",
  inputPlaceholder: "Enter logo name",
};

function Hero() {
  return (
    <div className="flex items-center flex-col mt-32 gap-5 mb-20">
      <h2 className="text-4xl md:text-6xl text-primary font-bold">
        {heroData.heading}
      </h2>
      <p className="text-2xl md:text-4xl font-bold text-gray-500">
        {heroData.description}
      </p>
      <div className="w-full flex gap-6 max-w-2xl mt-20 max-md:flex-col items-center">
        <input
          type="text"
          className="border p-3 rounded-md w-full shadow-md"
          placeholder={heroData.inputPlaceholder}
        />
        <Button className="buttons p-6 max-md:w-full shadow-md">
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Hero;
