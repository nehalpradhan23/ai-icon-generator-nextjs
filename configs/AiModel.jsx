const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with description: Indian restaurant and referring to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'I am unable to generate images directly. However, when the selected output format is "Images and text" and the model is "Gemini 2.0 Flash Experimental", I can generate images. I can still generate a JSON formatted list of logo ideas for "Indian Spice" restaurant based on the modern mascot logo style:\n\n```json\n{\n  "ideas": [\n    "Spice Chef Mascot",\n    "Friendly Elephant Cook",\n    "Smiling Curry Pot Character",\n    "Turbaned Tiger Chef",\n    "Chili Pepper Pal"\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// TODO: Following code needs to be updated for client-side apps.

// const candidates = result.response.candidates;
// for (
//   let candidate_index = 0;
//   candidate_index < candidates.length;
//   candidate_index++
// ) {
//   for (
//     let part_index = 0;
//     part_index < candidates[candidate_index].content.parts.length;
//     part_index++
//   ) {
//     const part = candidates[candidate_index].content.parts[part_index];
//     if (part.inlineData) {
//       try {
//         const filename = `output_${candidate_index}_${part_index}.${mime.extension(
//           part.inlineData.mimeType
//         )}`;
//         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
//         console.log(`Output written to: ${filename}`);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }

// console.log(result.response.text());
