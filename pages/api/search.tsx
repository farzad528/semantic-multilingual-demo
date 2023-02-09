import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.API_KEY) {
  throw new Error("Missing env var from Azure Cognitive Search API Key");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search, queryLanguage } = req.body;

  const payload = {
    search,
    queryType: "semantic",
    speller: "lexicon",
    queryLanguage,
    captions: "extractive",
    answers: "extractive",
    semanticConfiguration:
      queryLanguage === "de-de"
        ? "config_de"
        : queryLanguage === "es-es"
        ? "config_es"
        : queryLanguage === "en-us"
        ? "config_en"
        : "config_en",
    select: "id, title_en, content_en",
    count: "true",
    highlightPreTag: "<b>",
    highlightPostTag: "</b>",
  };

  const response = await fetch(
    `https://${process.env.SERVICE_NAME}.search.windows.net/indexes/${process.env.INDEX_NAME}/docs/search?api-version=${process.env.API_VERSION}`,
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
