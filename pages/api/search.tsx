import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.API_KEY) {
  throw new Error("Missing env var from Azure Cognitive Search API Key");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search, queryLanguage } = req.body;

  const payload: any = {
    search,
    queryType: "semantic",
    speller: "lexicon",
    queryLanguage,
    captions: "extractive",
    answers: "extractive",
    count: "true",
    highlightPreTag: "<b>",
    highlightPostTag: "</b>",
    // top: 5, 
  };

  // TODO: add additional queryLanguages here
  // select statements are optional but recommended for performance optimization to only include fields that are used in your semanticConfiguration for a given language
  switch (queryLanguage) {
    case "de-de":
      payload.semanticConfiguration = "config_de";
      payload.select = "id, title_de, content_de";
      break;
    case "es-es":
      payload.semanticConfiguration = "config_es";
      payload.select = "id, title_es, content_es";
      break;
    case "en-us":
      payload.semanticConfiguration = "config_en";
      payload.select = "id, title_en, content_en";
      break;
    default:
      payload.semanticConfiguration = "config_en";
      payload.select = "id, title_en, content_en";
  }

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
