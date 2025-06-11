"use client";

import Filters from "@/components/filters";
// import Filters from "@/components/filters";
import { useState } from "react";

interface OptionType {
  [key: string]: string[]
}

export default function Candidates() {
  const [addfilter, setAddfilter] = useState<boolean>(false);
  const [addfiltervalue, setAddfiltervalue] = useState("Search Filter");
  const options: OptionType ={
    "Current Title": ["abc", "def"], 
    "Past Title": ["ghi", "jkl"], 
    "Postal Code": ["123456", "654321"], 
    "City": ["Banglore", "Hyderabad"]};
  const [filterOptions, setFilterOptions] = useState<string[]>(Object.keys(options));
  const [filters, setFilters] = useState<string[]>([]);

  function handleReset(){
    setFilters([]);
    setFilterOptions(Object.keys(options));
    setAddfiltervalue("Search Filter");
    setAddfilter(false);
  }

  const handleApplyFilters = async () => {
    console.log("Clicked")
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
                    setFilters((filter)=>[...filter, option]);
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
        {filters.map((filter)=>(
            <div key={filter}>
                <Filters label={filter} availableOptions={options[filter]} />
            </div>
        ))}
      </aside>
    </div>
    // <div className="w-full h-screen flex bg-gradient-to-br from-[#232323] to-[#18191a] text-gray-200 font-sans">
    //   {/* Left Panel: Filters */}
    //   <aside className="w-[340px] min-h-screen bg-black/60 border-r border-[#353535] px-6 py-8 flex flex-col gap-6">
    //     {/* Top Controls */}
    //     <div className="flex gap-3 mb-3">
    //       <button className="flex-1 py-2 rounded-lg bg-[#d3d3d3] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#bdbdbd] transition">
    //         Reset
    //       </button>
    //       <button className="flex-1 py-2 rounded-lg bg-[#ededed] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition">
    //         Apply Filters
    //       </button>
    //     </div>
    //     {/* Add Filters Dropdown */}
    //     <div className="mb-2 relative">
    //       <label className="block text-gray-300 text-sm mb-1">
    //         Add Filters
    //       </label>
    //       <select className="w-full bg-[#232323] text-gray-200 border border-[#353535] rounded px-3 py-2 pr-8 appearance-none focus:outline-none">
    //         {/* <option>Select Filters</option> */}
    //         <option>Current Title</option>
    //         <option>Past Title</option>
    //         <option>Seniority Level</option>
    //         <option>Region</option>
    //         <option>Postal Code</option>
    //         <option>Company</option>
    //       </select>
    //       {/* Dropdown Arrow */}
    //       <span className="absolute right-3 top-9 text-gray-400 pointer-events-none">
    //         &#9662;
    //       </span>
    //       {/* Dropdown Suggestion Box */}
    //       {/* <div className="absolute left-0 top-14 w-full bg-[#1a1a1a] border border-[#353535] rounded-lg shadow-lg z-20">
    //         <ul>
    //           {[
    //             "Customer Success Manager",
    //             "Manager of Customer Success",
    //             "Head of Customer Success",
    //             "Customer Success Specialist",
    //           ].map((title) => (
    //             <li
    //               key={title}
    //               className="flex justify-between items-center px-4 py-2 hover:bg-[#232323] transition"
    //             >
    //               <span className="text-gray-100 text-sm">{title}</span>
    //               <span className="flex gap-2 ml-4">
    //                 <button className="text-green-400 hover:underline text-xs">
    //                   Include
    //                 </button>
    //                 <button className="text-red-400 hover:underline text-xs">
    //                   Exclude
    //                 </button>
    //               </span>
    //             </li>
    //           ))}
    //         </ul>
    //       </div> */}
    //     </div>
    //     {/* Filters Section */}
    //     <div className="flex flex-col gap-4">
    //       {/* Current Title */}
    //       <div>
    //         <label className="text-gray-400 text-xs mb-1 block">
    //           Current Title
    //         </label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
    //             Customer Success
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //         </div>
    //       </div>
    //       {/* Past Title */}
    //       {/* <div>
    //         <label className="text-gray-400 text-xs mb-1 block">
    //           Past Title
    //         </label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
    //             Customer Success
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
    //             Customer Success and Manager
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //         </div>
    //       </div> */}
    //       <Filters label={"Past Title"} />
    //       {/* Seniority Level */}
    //       <div>
    //         <label className="text-gray-400 text-xs mb-1 block">
    //           Seniority Level
    //         </label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="flex items-center bg-[#232323] px-3 py-1 rounded-full text-xs">
    //             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
    //             Manager
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //           <span className="flex items-center bg-[#232323] px-3 py-1 rounded-full text-xs">
    //             <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
    //             Internship
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //         </div>
    //       </div>
    //       {/* Region */}
    //       <div>
    //         <label className="text-gray-400 text-xs mb-1 block">Region</label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="flex items-center bg-[#232323] px-3 py-1 rounded-full text-xs">
    //             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
    //             Manager
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //           <span className="flex items-center bg-[#232323] px-3 py-1 rounded-full text-xs">
    //             <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
    //             Internship
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //         </div>
    //       </div>
    //       {/* Postal Code */}
    //       <div>
    //         <label className="text-gray-400 text-xs mb-1 block">
    //           Postal Code
    //         </label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="flex items-center bg-[#232323] px-3 py-1 rounded-full text-xs">
    //             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
    //             560102 Bangalore
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //           <span className="flex items-center bg-[#232323] px-3 py-1 rounded-full text-xs">
    //             <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
    //             Pune
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //         </div>
    //       </div>
    //       {/* Company */}
    //       <div>
    //         <label className="text-gray-400 text-xs mb-1 block">Company</label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
    //             Customer Success
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
    //             Customer Success and Manager
    //             <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //               &times;
    //             </button>
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </aside>

      // {/* Right Panel: Candidates List */}
      // <main className="flex-1 flex flex-col p-6">
      //   {/* Top Bar */}
      //   <div className="flex items-center justify-between mb-2">
      //     <div></div>
      //     <button className="px-5 py-1 rounded-md bg-[#ededed] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition">
      //       Done
      //     </button>
      //   </div>
      //   {/* Candidate List Placeholder */}
      //   <div className="flex-1 grid grid-rows-7 gap-4 mt-2">
      //     {/* Empty candidate cards as placeholders */}
      //     {[...Array(7)].map((_, i) => (
      //       <div
      //         key={i}
      //         className="w-full h-16 rounded-lg bg-[#242526] border border-[#353535]"
      //       ></div>
      //     ))}
      //   </div>
      //   {/* Footer */}
      //   <div className="flex items-center justify-between pt-4 border-t border-[#353535] mt-2">
      //     <span className="text-gray-400 text-sm">2,560 Profiles Found</span>
      //     <div className="flex items-center gap-2">
      //       <button className="w-8 h-8 flex items-center justify-center rounded bg-[#232323] text-gray-300 border border-[#353535]">
      //         1
      //       </button>
      //       <span className="text-gray-400">2 ... 499</span>
      //       <span className="text-gray-400 text-sm">25 per page</span>
      //     </div>
      //   </div>
      // </main>
    // </div>
  );
}
