import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.API_KEY) {
  throw new Error("Missing env var from Azure Cognitive Search API Key");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.body;

  const payload = {
    search,
    queryType: "semantic",
    queryLanguage: "en-us",
    captions: "extractive",
    answers: "extractive",
    semanticConfiguration: "config_en",
    select: "id, title_en, content_en",
    count: "true",
  };

  const response = await fetch(
    `https://${process.env.SERVICE_NAME}.search.windows.net/indexes/${process.env.INDEX_NAME}/docs/search?api-version=${process.env.API_VERSION}`,
    //"https://fsunavala-ss-sandbox.search.windows.net/indexes/biographies-multilingual-index/docs/search?api-version=2021-04-30-preview",

    {
      headers: {
        "Content-Type": "application/json",
        "api-key": `${process.env.API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  const json = await response.json();

  console.log(response);

  res.status(200).json(json);
}
