import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/Firebase.config";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, email, title, desc } = await req.json();

  try {
    // generate AI text prompt for logo
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    console.log(JSON.parse(AiPromptResult.response.text()).prompt);

    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;

    // Generate Logo from AI modal
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      AIPrompt,
      {
        headers: {
          Authorization: "Bearer " + process.env.HUGGING_FACE_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    // convert to base 64 image
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");

    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    console.log(base64ImageWithMime);

    // save to firebase database
    try {
      await setDoc(
        doc(db, "users", EmailAddress, "logos", Date.now().toString()),
        { image: base64ImageWithMime, title: title, desc: desc }
      );
    } catch (error) {
      return NextResponse.json(error);
    }

    return NextResponse.json({ image: base64ImageWithMime });
    // create AI logo Image
  } catch (error) {
    return NextResponse.json(error);
  }
}
