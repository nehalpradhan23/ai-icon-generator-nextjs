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
  model: "gemini-2.5-pro-exp-03-25",
  // model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  // topK: 40,
  maxOutputTokens: 65536,
  // maxOutputTokens: 8192,
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

export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a text prompt to create Logo for Logo Title/Brand name : test22,with description: test222222, with Color combination of Soft Purples, also include the Let AI Select the best idea and include Vintage Logo Designs With Text & Icon design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.  Give me result in JSON portal with prompt field only",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "The user wants a JSON output containing a single field named \"prompt\".\nThis prompt should guide an AI image generator to create a logo for the brand \"test22\".\n\nHere's a breakdown of the requirements for the prompt:\n1.  **Logo Title/Brand Name:** test22\n2.  **Description:** test222222 (This seems like placeholder text, but I should include it as requested, maybe as context or inspiration).\n3.  **Color Combination:** Soft Purples\n4.  **AI Selection:** Let the AI select the best idea (This implies asking for variations or giving the AI creative freedom within the constraints).\n5.  **Design Idea:** Vintage Logo Designs With Text & Icon\n6.  **Reference Prompt:** Incorporate elements from the provided reference prompt: \"Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.\"\n\n**Drafting the prompt:**\n\n*   Start with the core request: \"Vintage logo design for the brand 'test22'.\"\n*   Incorporate the reference prompt's style: \"hand-drawn, artistic style, intricate details, retro aesthetic.\"\n*   Specify the elements: \"featuring both text ('test22') and an icon.\"\n*   Incorporate the description: \"Inspired by the concept 'test222222'.\" (Maybe phrase it less literally, like \"evoking a sense related to 'test222222'\"). Let's stick closer to the request for now. \"Consider the description 'test222222' for thematic inspiration.\"\n*   Specify colors: \"Use a color palette dominated by soft purples.\"\n*   Mention typography: \"Employ bold, vintage typography for the text 'test22'.\"\n*   Address the icon: \"The icon should complement the vintage style and the brand name 'test22'. It could draw inspiration from themes like food, animals, characters, or unique brand elements, fitting a hand-drawn, intricate aesthetic.\"\n*   Include AI selection: \"Generate multiple variations exploring different vintage icon concepts (e.g., maybe an animal, a character, an abstract symbol related to 'test22' or 'test222222'), allowing the AI creative freedom to interpret the best vintage approach within the soft purple color scheme. The logo should be versatile.\"\n*   Refine and combine: \"Create a vintage logo for the brand name 'test22'. The logo should feature both the text 'test22' using bold, vintage typography and a relevant icon, designed in a hand-drawn, artistic style with intricate details and a retro aesthetic. Use a color palette focused on soft purples. Draw inspiration from the description 'test222222' and consider themes like animals, characters, or unique abstract elements for the icon. Generate a few distinct options embodying this vintage, hand-drawn style, allowing creative interpretation for the best overall design. Ensure the final logo is versatile.\"\n\n**Structuring as JSON:**\n\n```json\n{\n  \"prompt\": \"Create a vintage logo for the brand name 'test22'. The logo must feature both the text 'test22' using bold, retro typography and a relevant icon. Design the logo in a hand-drawn, artistic, vintage style with intricate details. Use a color palette dominated by soft purples. Consider the description 'test222222' for thematic inspiration for the icon, potentially exploring vintage interpretations of animals, characters, or unique brand elements suitable for a hand-drawn aesthetic. Generate multiple distinct vintage logo options (text & icon), allowing AI creative freedom to select the most effective design within these parameters. The final logo should have a retro feel and be versatile.\"\n}\n```\nThis looks complete and covers all the user's requirements.",
        },
        {
          text: "```json\n{\n  \"prompt\": \"Create a vintage-style logo for the brand name 'test22'. The design should incorporate both the text 'test22' using bold, retro typography and an accompanying icon, rendered in a hand-drawn, artistic style with intricate details reminiscent of classic vintage designs. Utilize a color palette focused on various shades of soft purples. Draw thematic inspiration from the description 'test222222' when conceptualizing the icon, potentially exploring vintage representations of food, animals, characters, or unique brand elements that fit the hand-drawn aesthetic. Generate several distinct vintage logo variations (text & icon combined), allowing AI creative freedom to interpret and select the most compelling design that adheres to the soft purple color scheme and overall retro, versatile aesthetic.\"\n}\n```",
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
