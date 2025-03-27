"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");

  useEffect(() => {
    if (typeof window !== undefined && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const GenerateAILogo = async () => {
    // check for credits
    if (modelType !== "Free" && userDetail?.credits <= 0) {
      // alert("not enough credits");
      toast.error("Not enough credits");
      return;
    }
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);
    console.log("prompt- ", PROMPT);

    // generate logo prompt from AI
    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: formData?.title,
      desc: formData?.desc,
      type: modelType,
      userCredits: userDetail?.credits,
    });
    console.log("ai result ############# ", result);
    setLoading(false);
    setLogoImage(result?.data?.image);
    // generate Logo Image
  };

  const downloadBase64Image = () => {
    const link = document.createElement("a");
    link.href = logoImage;
    link.download = Date.now();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center mt-10">
      <h2 className="text-3xl font-bold text-center mt-10">
        {!loading && "Creating Image..."}
      </h2>
      {loading && (
        // {loading && logoImage && (
        <div className="flex flex-col gap-5">
          {/* <Image src={"/design_1.png"} alt="logo" width={200} height={200} /> */}
          <Image src={logoImage} alt="logo" width={200} height={200} />
          <div className="">
            <Button onClick={() => downloadBase64Image()}>
              Download Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateLogo;
