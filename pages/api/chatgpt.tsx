import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.API_KEY) {
  throw new Error("Missing env var from Azure OpenAI API Key");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload = {
    prompt,
    temperature: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
  };

  const response = await fetch(
    `https://${process.env.OPENAI_SERVICE_NAME}.openai.azure.com/openai/deployments/${process.env.DEPLOYMENT_NAME}/completions?api-version=2022-12-01`,
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": `${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  const json = await response.json();

  console.log(response);

  res.status(200).json(json);
}
