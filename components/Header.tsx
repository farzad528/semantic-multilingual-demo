import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="flex justify-between items-center w-full bg-white border-b-2 ">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="azs icon"
          src="/microsoft.svg"
          style={{ objectFit: "contain" }}
          width={150}
          height={30}
        />
        <h1 className="flex items-center font-bold ml-2 tracking-tight text-lg">
          Semantic Search Multilingual Demo
        </h1>
      </Link>
      <a
        href="https://learn.microsoft.com/azure/search/search-what-is-azure-search"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="AZS Icon"
          src="/azs.png"
          className=""
          style={{ objectFit: "contain" }}
          width={80}
          height={30}
        />
      </a>
    </header>
  );
}
