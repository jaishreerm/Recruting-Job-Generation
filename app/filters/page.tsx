

export default function Home() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="w-[800px] rounded-2xl bg-black/70 shadow-2xl border border-gray-700 p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-200">
            Add Candidates from LinkedIn
          </h2>
          <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-1 rounded-md font-semibold">
            Done
          </button>
        </div>
        {/* Filter Controls */}
        <div className="flex gap-6">
          {/* Left Panel */}
          <div className="w-1/2 flex flex-col gap-4">
            {/* Filter Actions */}
            <div className="flex gap-2 mb-2">
              <button className="bg-gray-600 hover:bg-gray-500 text-gray-100 px-3 py-1 rounded">
                Reset
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">
                Apply Filters
              </button>
            </div>
            {/* Add Filters Dropdown */}
            <div className="mb-2">
              <label className="block text-gray-300 text-sm mb-1">
                Add Filters
              </label>
              <div className="relative">
                <select className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded px-3 py-2 appearance-none focus:outline-none">
                  <option>Select Filters</option>
                  <option>Current Title</option>
                  <option>Past Title</option>
                  <option>Seniority Level</option>
                  <option>Region</option>
                  <option>Postal Code</option>
                  <option>Company</option>
                </select>
                {/* Dropdown Arrow */}
                <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  &#9662;
                </span>
              </div>
            </div>
            {/* Filter Inputs */}
            <div className="flex flex-col gap-3">
              {/* Current Title */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Current Title
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Customer Success
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                </div>
              </div>
              {/* Past Title */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Past Title
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Customer Success
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                  <span className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Customer Success and Manager
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                </div>
              </div>
              {/* Seniority Level */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Seniority Level
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Manager
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                  <span className="bg-red-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Internship
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                </div>
              </div>
              {/* Region */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Region
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Manager
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                  <span className="bg-red-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Internship
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                </div>
              </div>
              {/* Postal Code */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Postal Code
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    560102 Bangalore
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                  <span className="bg-red-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Pune
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                </div>
              </div>
              {/* Company */}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Company
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Customer Success
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                  <span className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs flex items-center">
                    Customer Success and Manager
                    <button className="ml-1 text-red-400 hover:text-red-600">
                      &times;
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Panel */}
          <div className="w-1/2 flex flex-col gap-4">
            {/* Filter Suggestions Dropdown (mockup) */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[340px] bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-20">
                <ul>
                  {[
                    "Customer Success Manager",
                    "Manager of Customer Success",
                    "Head of Customer Success",
                    "Customer Success Specialist",
                  ].map((title) => (
                    <li
                      key={title}
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-800"
                    >
                      <span className="text-gray-100">{title}</span>
                      <span className="flex gap-2">
                        <button className="text-green-400 hover:underline text-xs">
                          Include
                        </button>
                        <button className="text-red-400 hover:underline text-xs">
                          Exclude
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Empty state for candidate list */}
            <div className="flex-1 bg-gray-900/60 rounded-lg border border-gray-800 flex items-center justify-center text-gray-500">
              {/* Placeholder for candidate profiles */}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <span className="text-gray-400 text-sm">2,560 Profiles Found</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300">
              1
            </button>
            <span className="text-gray-400">2 ... 499</span>
            <span className="text-gray-400 text-sm">25 per page</span>
          </div>
        </div>
       </div>
    </div>
  );
}
