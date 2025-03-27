"use client";
import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignIn, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const pricingOption = [
  {
    title: "Free",
    icon: "/free.png", // Add your free plan icon here
    features: [
      "⚫ Generate unlimited logos for free",
      "⚫ Longer wait times",
      "⚫ Wait time: 30 seconds to 3 minutes",
      "⚫ Limited Design Options and Quality",
      "⚫ Slow (Not Recommended)",
    ],
    button: "Generate Free",
  },
  {
    title: "Premium",
    icon: "/thunder.png", // Add your premium plan icon here
    features: [
      "⚫ Generate unlimited logos",
      "⚫ Shorter wait times",
      "⚫ Wait time: Less than 10 seconds",
      "⚫ Only 5 Credits",
    ],
    button: "Generate for 1 credit",
  },
];

function PricingModel({ formData }) {
  const { user } = useUser();

  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="">
      <HeadingDescription
        title={"Select your AI Model Plan"}
        description={"Generate Unlimted Fast Logo with your fav model"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {pricingOption?.map((pricing, index) => (
          <div
            className="flex flex-col items-center p-5 border rounded-2xl"
            key={index}
          >
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div className="">
              {pricing.features.map((feature, index) => (
                <h2 className="text-lg mt-3" key={index}>
                  {feature}
                </h2>
              ))}
            </div>
            {user ? (
              <Link href={"/generate-logo?type=" + pricing?.title}>
                <Button
                  // onClick={() =>
                  //   router.push("/generate-logo?type=" + pricing?.title)
                  // }
                  className={"mt-5"}
                >
                  {pricing.button}
                </Button>
              </Link>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={"/generate-logo?type=" + pricing?.title}
              >
                <Button className={"mt-5"}>{pricing.button}</Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
