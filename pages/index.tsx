import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
    console.log(results.value);
    setLoading(false);
    setCount(results["@odata.count"]);
    setSearchResults(results.value);
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
              className="py-2 px-1 bg-[#FFFFFFCC] focus:outline-0 w-full"
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
        <div className="flex w-screen px-3">
          <div className="flex-auto w-1/4 pt-4 px-2 bg-white">
            <div className="bg-white pl-4 flex flex-col">
              <p>Ask ChatGPT</p>
              <div className="bg-purple-500">placeholder for prompt</div>
            </div>
          </div>
          <div className="flex-auto w-3/4 pt-4 px-4 bg-sky-300">
            <div>
              <p>Showing {count} results</p>
              {/* {!loading && (
                <button
                  className="bg-rose-300"
                  onClick={(e) => getSearchResults(e)}
                >
                  click me for results!
                </button>
              )} */}
              {loading && (
                <BeatLoader color="#444791" className="flex items-center" />
              )}
            </div>

            <div className="">
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
                            searchResult["@search.captions"][0].highlights,
                        }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
