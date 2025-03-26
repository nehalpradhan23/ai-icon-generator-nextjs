import { AILogoPrompt } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // generate AI text prompt for logo
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;
    return NextResponse.json(AIPrompt);
    // create AI logo Image
  } catch (error) {
    return NextResponse.json(error);
  }
}
