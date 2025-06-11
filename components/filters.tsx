import { useState } from "react";

export default function Filters({ label }: { label: string }) {
  const [isOption, setIsoption] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([
    "check",
    "testing",
    "practice",
  ]);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  return (
    // <div>
    //   <label className="text-gray-400 text-xs mb-1 block">{label}</label>
    //   <div className="flex flex-wrap gap-2">
    //     <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
    //       Customer Success
    //       <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //         &times;
    //       </button>
    //     </span>
    //     <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
    //       Customer Success and Manager
    //       <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
    //         &times;
    //       </button>
    //     </span>
    //   </div>
    // </div>
    // <div>

    //     {/* {addfilter && (
    //       <ul>
    //         {options.map((option: string) => (
    //           <li
    //             key={option}
    //             className="px-4 py-2 hover:bg-[#232323] text-gray-100 text-sm-cursor-pointer transition"
    //             onClick={() => {
    //               setAddfiltervalue(option);
    //               setAddfilter(false);
    //               setFilters((filter) => [...filter, option]);
    //               // options.filter((f: string)=>f!=option);
    //               setOptions(options.filter((f: string) => f != option));
    //             }}
    //           >
    //             {option}
    //           </li>
    //         ))}
    //       </ul>
    //     )} */}
    //   </div>
    //   {/* {filters.map((filter) => (
    //     <div key={filter}>
    //       <Filters label={filter} />
    //     </div>
    //   ))} */}
    // </div>
    <div className="mb-2 relative">
      <label className="text-gray-300 text-sm font-medium">{label}</label>
      {/* <div className="flex items-start gap-4 mt-1"> */}
        <div className="relative w-48">
          <input
            className="w-full bg-[#232323] text-gray-200 border border-[#353535] rounded px-3 py-2 pr-8 appearance-none focus:outline-none"
            onClick={() => setIsoption(true)}
            placeholder=""
          />
          {isOption && (
            <ul>
              {options.map((option) => (
                <li
                  key={label}
                  className="px-4 py-2 hover:bg-[#232323] text-gray-100 text-sm-cursor-pointer transition"
                  onClick={() => {
                    setSelectedOption((selectOption) => [
                      ...selectOption,
                      option,
                    ]);
                    setOptions(options.filter((f) => f != option));
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedOption.map((option) => (
            <span key={option} className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
              {option}
              <button className="ml-2 text-gray-400 hover:text-red-500 text-base font-bold">
                 &times;
              </button>
            </span>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
}
