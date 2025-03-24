"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const heroData = {
  heading: "AI logo Generator",
  description: "Create logos with help of AI",
  inputPlaceholder: "Enter logo name",
};

function Hero() {
  const [logoTitle, setLogoTitle] = useState();
  return (
    <div className="flex items-center flex-col mt-20 sm:mt-32 gap-5 mb-20">
      <h2 className="text-4xl sm:text-6xl text-primary font-bold">
        {heroData.heading}
      </h2>
      <p className="text-2xl md:text-4xl font-bold text-gray-500">
        {heroData.description}
      </p>
      <div className="w-full flex gap-6 max-w-2xl mt-10 sm:mt-20 max-sm:flex-col items-center">
        <input
          type="text"
          className="border flex-1 p-3 rounded-md w-full shadow-md"
          placeholder={heroData.inputPlaceholder}
          onChange={(e) => setLogoTitle(e.target.value)}
        />
        <Link href={"/create?title=" + logoTitle}>
          <Button className="buttons p-6 max-sm:w-full shadow-md">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
