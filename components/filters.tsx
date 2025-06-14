import axios from "axios";
import { useEffect, useState } from "react";

export default function Filters({
  label,
  selected,
  onSelectedChange,
}: {
  label: string;
  selected: { id: string; text: string; selectionType: "INCLUDED" | "EXCLUDED" }[];
  onSelectedChange: (
    selected: { id: string; text: string; selectionType: "INCLUDED" | "EXCLUDED" }[]
  ) => void;
}) {
  const [isOption, setIsoption] = useState(false);
  const [options, setOptions] = useState<{ id: string; text: string; selectionType: "INCLUDED" | "EXCLUDED" }[]>([]);
  const [selectedOption, setSelectedOption] = useState<typeof options>([]);
  const [query, setquery] = useState("");

  const endpointMap: { [key: string]: string } = {
    "Job Titles": "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_job_title_suggestions",
    "Companies": "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_company_suggestions",
    "Locations": "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_geography_location_region_suggestions",
    "Seniority Level": "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_seniority_level",
    "Postal Code": "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_geography_location_postal_code_suggestions",
    "Years": "https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/filter_years_in",
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const handleGetOptions = async () => {
        if (!query) return;

        try {
          const res = await axios.post(
            endpointMap[label],
            { query },
            {
              headers: {
                "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
                "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST!,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Response for ", label, "from RapidAPI:", res.data);
          setOptions(res.data.data.map((item: any) => ({
            id: item.id,
            text: item.displayValue,
            selectionType: "INCLUDED",
          })));
        } catch (error) {
          console.error("Error fetching", label, "from RapidAPI:", error);
        }
      };

      handleGetOptions();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, label]);

  return (
    <div className="mb-6 relative">
      <label className="text-sm font-medium text-white block mb-1">{label}</label>
      <div className="relative w-full max-w-sm">
        <input
          className="w-full bg-[#262626] text-white border border-[#3a3a3a] rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4b4b4b]"
          onClick={() => setIsoption(!isOption)}
          placeholder={`Search ${label}`}
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        {isOption && (
          <ul className="absolute z-20 w-full mt-1 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg shadow-lg max-h-52 overflow-auto">
            {options.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 hover:bg-[#333333] text-gray-200 text-sm cursor-pointer transition duration-150 ease-in-out"
                onClick={() => {
                  setSelectedOption((prev) => [...prev, option]);
                  setOptions(options.filter((f) => f.id !== option.id));
                  setIsoption(false);
                  onSelectedChange([...selected, option]);
                }}
              >
                {option.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {selectedOption.map((option) => (
          <span
            key={option.id}
            className="bg-[#2d2d2d] text-white px-3 py-1 rounded-full text-sm flex items-center shadow-sm border border-[#444]"
          >
            {option.text}
            <button
              className="ml-2 text-gray-400 hover:text-red-400 font-bold transition duration-150 ease-in-out cursor-pointer"
              onClick={() => {
                setSelectedOption(selectedOption.filter((s) => s.id !== option.id));
                setOptions((prev) => [...prev, option]);
              }}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
