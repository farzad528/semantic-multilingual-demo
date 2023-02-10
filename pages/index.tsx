import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { BeatLoader } from "react-spinners";
import Dropdown, { LanguageType } from "@/components/Dropdown";

const inter = Inter({ subsets: ["latin"] });

interface SearchCaptions {
  text: string;
  highlights: string;
}

interface SearchResult {
  "@search.score": number;
  "@search.rerankerScore": number;
  "@search.captions": SearchCaptions[];
  id: string;
  title_en: string;
  content_en: string;
}
interface SearchResultAnswer {
  key: number;
  text: string;
  highlights: string;
  score: number;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsAnswers, setSearchResultsAnswers] = useState([]);
  const [language, setLanguage] = useState<LanguageType>("en-us");

  const search = searchTerm;
  const queryLanguage = language;

  const getSearchResults = async (e: any) => {
    e.preventDefault();
    setSearchResults([]);
    setLoading(true);
    setCount(0);

    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": `${process.env.API_KEY ?? ""}`,
      },
      body: JSON.stringify({
        search,
        queryLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let results = await response.json();
    setLoading(false);
    setCount(results["@odata.count"]);
    setSearchResults(results.value);
    setSearchResultsAnswers(results["@search.answers"]);
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      getSearchResults(e);
    }
  };
  return (
    <>
      <Head>
        <title>Semantic Search: Multilingual Demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="bg-[#F5F5F5] h-screen">
        <div className="flex w-full justify-center items-center bg-[#444791]">
          <div className="flex items-center bg-white w-2/3 rounded-md my-2 px-2">
            <MagnifyingGlassIcon width={20} className="text-gray-500" />
            <input
              className="py-2 px-1 bg-[#FFFFFFCC] focus:outline-0 w-full hover:bg-gray-50 "
              placeholder={"Type a search query"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Dropdown
            language={language}
            setLanguage={(newLanguage) => setLanguage(newLanguage)}
          />
        </div>
        <div className="flex mx-4">
          <div className="flex-auto pt-4 px-4">
            <div>
              <p>
                Showing {count} {count === 1 ? "result" : "results"}
              </p>
            </div>
            <span className="flex items-center justify-center">
              {loading && <BeatLoader color="#444791" />}
            </span>
            {!loading && (
              <div>
                {searchResultsAnswers ? (
                  searchResultsAnswers.map(
                    (searchResultAnswer: SearchResultAnswer) => {
                      return (
                        <div
                          key={searchResultAnswer.key}
                          className="flex items-start justify-center w-full border bg-white my-2 shadow-xl rounded-xl py-2 px-6 h-32 text-lg"
                        >
                          <LightBulbIcon
                            color="#444791"
                            height={100}
                            className="pr-2"
                          />
                          <p
                            dangerouslySetInnerHTML={{
                              __html: searchResultAnswer.highlights,
                            }}
                          />
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className="mt-20 flex flex-col items-center">
                    <Image
                      alt="no results"
                      src="/no-results.svg"
                      className=""
                      style={{ objectFit: "contain" }}
                      width={80}
                      height={30}
                    />
                    <p className="text-center text-2xl">No results returned</p>
                    <p className="text-center">
                      Try rephrasing or using ChatGPT
                    </p>
                  </div>
                )}
              </div>
            )}
            {!loading && (
              <div>
                {searchResults.map((searchResult: SearchResult) => {
                  return (
                    <div
                      key={searchResult.id}
                      className="flex flex-col items-start w-full border bg-white my-2 shadow-xl rounded-xl py-2 px-6 h-24"
                    >
                      <p className="text-[#4F52B2] hover:underline hover:cursor-pointer text-lg">
                        {searchResult.title_en}
                      </p>
                      <span className="text-sm">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              searchResult["@search.captions"][0].highlights
                                .length === 0
                                ? searchResult["@search.captions"][0].text
                                : searchResult["@search.captions"][0]
                                    .highlights,
                          }}
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
