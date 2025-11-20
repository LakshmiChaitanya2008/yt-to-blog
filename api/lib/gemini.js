import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getPostContent(transcript) {
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Convert the following YouTube transcript into a clean, structured blog post.

- Human-like writing
- Add headings (H2, H3)
- Add bullet points wherever helpful
- Remove filler words, repeated content, mistakes
- Add a short intro & conclusion
- Keep tone clear and engaging

Transcript:
${transcript}
`;
  console.log("Calling Gemini...");
  const result = await model.generateContent(prompt);
  console.log("Gemini responded!");
  console.log(result);
  return result.response.text();
}
