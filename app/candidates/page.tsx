"use client";

import Filters from "@/components/filters";
import axios from "axios";
// import Filters from "@/components/filters";
import { useEffect, useState } from "react";

interface OptionType {
  [key: string]: string[]
}

interface FinalFilterValueType {
  id: string,
  text: string,
  selectionType: "INCLUDED" | "EXCLUDED"
}

interface FinalFilterType {
  type: string,
  values: FinalFilterValueType[],
  selectedSubFilter: number,
}

function geminiToFilterState(geminiFilters: {[key: string]: string | string[]}): {[key: string]: FinalFilterValueType[]} {
  if (!geminiFilters) {
    return {};
  }
  const result: {[key: string]: FinalFilterValueType[]} = {};
  Object.entries(geminiFilters).forEach(([key, value])=>{
    if (Array.isArray(value)) {
      result[key] = value.map((v)=>({
        id: v,
        text: v,
        selectionType: "INCLUDED"
      }));
    } else if (typeof value === "string" && value.trim()) {
      result[key] = [{
        id: value,
        text: value,
        selectionType: "INCLUDED"
      }];
    }
  });

  return result;
}

export default function Candidates() {
  const [addfilter, setAddfilter] = useState<boolean>(false);
  const [addfiltervalue, setAddfiltervalue] = useState("Search Filter");
  // const options: OptionType ={
  //   "Current Title": ["abc", "def"], 
  //   "Past Title": ["ghi", "jkl"], 
  //   "Postal Code": ["123456", "654321"], 
  //   "City": ["Banglore", "Hyderabad"]};
  const options: OptionType = {
    "Job Titles": [],
    "Companies": [],
    "Locations": [],
    "Seniority Level": [],
    "Postal Code": [],
    "Years": []
  }
  const [filterOptions, setFilterOptions] = useState<string[]>(Object.keys(options));
  const [filters, setFilters] = useState<{[key: string]: FinalFilterValueType[]}>({});
  const [finalFilters, setFinalFilters]=useState<FinalFilterType[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
    const geminiFilters = JSON.parse(localStorage.getItem("filters") || "{}");
    const initialFilters = geminiToFilterState(geminiFilters);
    setFilters(initialFilters);
    const usedKeys = Object.keys(initialFilters);
    setFilterOptions((prev)=>prev.filter((opt)=>!usedKeys.includes(opt)));
  }, []);

  function handleReset(){
    setFilters({});
    setFilterOptions(Object.keys(options));
    setAddfiltervalue("Search Filter");
    setAddfilter(false);
  }

  const handleApplyFilters = async () => {
    try {
      const newFilters: FinalFilterType[]=Object.entries(filters).filter(([value])=>value.length>0).map(([label, value])=>({type: label, values: value, selectedSubFilter: 50}));
      setFinalFilters(newFilters);
      console.log("Final Filters: ", finalFilters);
      const res=await axios.post('https://linkedin-sales-navigator-no-cookies-required.p.rapidapi.com/premium_search_person', {
        data: {
          account_number: 1,
          page: 1,
          filters: newFilters
        }
      });
      console.log("Response of candidate search: ", res);
    } catch (error) {
      console.log("Error in applying filter candidate search: ", error);
    }
  }

  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-[#232323] to-[#18191a] text-gray-200 font-sans">
      <aside className="w-[340px] min-h-screen bg-black/60 border-r border-[#353535] px-6 py-8 flex flex-col gap-6">
        <div className="flex gap-3 mb-3">
          <button onClick={handleReset} className="flex-1 py-2 rounded-lg bg-[#d3d3d3] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#bdbdbd] transition">
            Reset
          </button>
          <button onClick={handleApplyFilters} className="flex-1 py-2 rounded-lg bg-[#ededed] text-black font-semibold shadow shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition">
            Apply Filters
          </button>
        </div>
        <div className="mb-2 relative">
          <label className="block text-gray-300 text-sm mb-1">
            Add Filters
          </label>
          <input
            placeholder={addfiltervalue}
            // value={addfiltervalue}
            className="w-full bg-[#232323] text-gray-200 border border-[#353535] rounded px-3 py-2 pr-8 appearance-none focus:outline-none"
            onClick={() => setAddfilter(!addfilter)}
          />
          {addfilter && (
            <ul>
              {filterOptions.map((option: string) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-[#232323] text-gray-100 text-sm-cursor-pointer transition"
                  onClick={() => {
                    setAddfiltervalue(option);
                    setAddfilter(false);
                    // setFilters((filter)=>[...filter, option]);
                    setFilters((prev)=>({
                      ...prev,
                      [option]: []
                    }));
                    // options.filter((f: string)=>f!=option);
                    setFilterOptions(filterOptions.filter((x: string)=>x!=option));
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        {Object.keys(filters).map((filter)=>(
            <div key={filter}>
                <Filters label={filter} selected={filters[filter]} onSelectedChange={(selected)=>setFilters((prev)=>({...prev, [filter]: selected}))} />
            </div>
        ))}
      </aside>

      <main className="flex-1 flex flex-col p-6">
        {/* <div className="flex items-center justify-end mb-2"> */}
        <div className="fixed top-4 right-4 z-50">
          <button className="px-5 py-1 rounded-md bg-[#ededed] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition">
            Done
          </button>
          <div className="grid grid-rows-7 gap-4 mt-2">
            {[1, 2, 3].map((cand, i)=>(
              <div key={i} className="w-full h-16 rounded-lg bg-[#242526] border border-[#353535]"></div>
            ))}
          </div>
        </div>
      </main>
    </div>
    //   {/* Right Panel: Candidates List */}
    //   <main className="flex-1 flex flex-col p-6">
    //     {/* Top Bar */}
    //     <div className="<flex items-center justify-between mb-2>">
    //       <div></div>
    //       <button className="px-5 py-1 rounded-md bg-[#ededed] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition">
    //         Done
    //       </button>
    //     </flex>
    //     {/* Candidate List Placeholder */}
    //     <div className="flex-1 grid grid-rows-7 gap-4 mt-2">
    //       {/* Empty candidate cards as placeholders */}
    //       {[...Array(7)].map((_, i) => (
    //         <div
    //           key={i}
    //           className="w-full h-16 rounded-lg bg-[#242526] border border-[#353535]"
    //         ></div>
    //       ))}
    //     </div>
    //     {/* Footer */}
    //     <div className="flex items-center justify-between pt-4 border-t border-[#353535] mt-2">
    //       <span className="text-gray-400 text-sm">2,560 Profiles Found</span>
    //       <div className="flex items-center gap-2">
    //         <button className="w-8 h-8 flex items-center justify-center rounded bg-[#232323] text-gray-300 border border-[#353535]">
    //           1
    //         </button>
    //         <span className="text-gray-400">2 ... 499</span>
    //         <span className="text-gray-400 text-sm">25 per page</span>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
}
