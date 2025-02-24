import { Button, Input } from "@nextui-org/react";

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function SearchBar() {
  return (
    <div className="w-screen h-[250px] px-8 flex flex-col justify-center items-center bg-gradient-to-t from-gray-700 to-gray-500 text-white shadow-lg">
      <h1 className="font-bold text-3xl py-3">Over 4,000+ hostels and paying guests across 35+ cities</h1>
      <div className="w-full flex flex-row justify-center items-center">
        <Input label="Search" type="text" size="sm" radius="none" className="w-[70%] shadow-xl"/>
        <Button color="success" size="lg" radius="none" className="shadow-xl">
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-white pointer-events-none flex-shrink-0" />
        </Button>
      </div>
    </div>
  );
}
