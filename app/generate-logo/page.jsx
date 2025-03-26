"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";

function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
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
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);
    console.log("prompt- ", PROMPT);

    // generate logo prompt from AI
    const res = await axios.post("/api/ai-logo-model", { prompt: PROMPT });
    console.log("ai res ############# ", res?.data);

    // generate Logo Image
  };

  return <div>GenerateLogo</div>;
}

export default GenerateLogo;
