"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobRequirementsStep() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] border border-[#2c2c2c] rounded-2xl shadow-xl px-10 py-12 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Describe Your Job Requirements!
        </h2>

        <textarea
          className="w-full h-40 bg-[#262626] text-white placeholder-gray-400 rounded-lg border border-[#3d3d3d] p-4 text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-[#4f4f4f] transition duration-150 ease-in-out"
          value={prompt}
          onChange={e => {
            setPrompt(e.target.value);
            localStorage.setItem("prompt", e.target.value);
          }}
          placeholder="E.g. Frontend Developer with 3+ years of hands-on experience using TypeScript, React, HTML, Canvas and TailwindCSS."
        />

        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-3 bg-gradient-to-r from-[#f1f1f1] to-[#dcdcdc] hover:from-[#ffffff] hover:to-[#e0e0e0] text-black font-semibold rounded-lg shadow-md border border-[#cfcfcf] transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            onClick={() => router.push("/job")}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
