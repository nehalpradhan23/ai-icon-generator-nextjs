import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/Firebase.config";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  const { prompt, email, title, desc, type, userCredits } = await req.json();
  let base64ImageWithMime = "";

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    // return;
    // TODO
    // generate AI text prompt for logo
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    console.log(
      "AI prompt ++++++++++++++++++++++++++++++++++++++++++ ",
      JSON.parse(AiPromptResult.response.text()).prompt
    );

    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;

    // Generate Logo from AI modal
    if (type === "Free") {
      console.log(
        "Free ++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
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

      base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    } else {
      console.log(
        "Premium++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );

      // replicate API endpoing
      const output = await replicate.run(
        "bytedance/hyper-flux-8step:16084e9731223a4367228928a6cb393b21736da2a0ca6a5a492ce311f0a97143",
        {
          input: {
            seed: 0,
            width: 400,
            height: 400,
            prompt: AIPrompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "png",
            guidance_scale: 3.5,
            output_quality: 30,
            num_inference_steps: 8,
          },
        }
      );
      console.log(output);
      base64ImageWithMime = await ConvertImageToBase64(output);

      // update credits in firebase
      const docRef = doc(db, "users", email);
      await updateDoc(docRef, { credits: Number(userCredits) - 1 });
    }
    console.log(
      "image information ++++++++++++++++++++ : ",
      base64ImageWithMime
    );

    // save to firebase database
    try {
      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: base64ImageWithMime,
        title: title,
        desc: desc,
      });
    } catch (error) {
      console.log(error);
      // return NextResponse.json(error);
    }
    return NextResponse.json({ image: base64ImageWithMime });

    // create AI logo Image
  } catch (error) {
    console.log("Image generation error: ", error);

    return NextResponse.json(error);
  }
}

async function ConvertImageToBase64(image) {
  const res = await axios.get(image, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(res.data).toString("base64");
  return `data:image/png;base64,${base64ImageRaw}`;
}
