"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobRequirementsStep() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15171a] to-[#18191a] flex flex-col items-center justify-center">
      <div className="bg-[#18191a] border border-[#232323] rounded-xl shadow-lg px-10 py-10 flex flex-col items-center w-full max-w-xl">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 text-center">
          Describe your Job Requirements
        </h2>
        <textarea
          className="w-full h-32 bg-[#232323] text-gray-100 rounded-md border border-[#232323] p-3 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-[#353535]"
          value={prompt}
          onChange={e => {setPrompt(e.target.value);localStorage.setItem("prompt", e.target.value)}}
          placeholder="Founding Frontend Engineer with 3+ years of experience, with Typescript"
        />
        <div className="w-full flex justify-end">
          <button
            className="px-6 py-2 rounded-md bg-[#ededed] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition"
            onClick={()=>router.push("/job")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
