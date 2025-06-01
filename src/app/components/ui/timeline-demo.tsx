'use client'

import React from "react";
import { Timeline } from "@/app/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: (
        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Aryan S P
        </span>
      ),
      content: (
        <div>
          <p className="text-lg font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Expertise in AI/ML, AI Integration and LLM training
          </p>
          <div className="mt-2">
            <img
              src="/profaryan.jpg"
              alt="Aryan S P"
              width={500}
              height={500}
              className="aspect-square w-full max-w-[300px] sm:max-w-[400px] rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <div className="mt-2">
            <a
              href="https://www.linkedin.com/in/aryansp/"
              target="__blank"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold inline-block hover:opacity-90 transition-opacity"
            >
              Know more →
            </a>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Eshan Vijay Shettennavar
        </span>
      ),
      content: (
        <div>
          <p className="text-lg font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Expertise in Full stack web development, UI/UX Design and DevOps
          </p>
          <div className="mt-2">
            <img
              src="/profeshan.jpg"
              alt="Eshan Vijay Shettennavar"
              width={500}
              height={500}
              className="aspect-square w-full max-w-[300px] sm:max-w-[400px] rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <div className="mt-2">
            <a
              href="https://www.linkedin.com/in/eshan-shettennavar/"
              target="__blank"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold inline-block hover:opacity-90 transition-opacity"
            >
              Know more →
            </a>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Why did we build this?
        </span>
      ),
      content: (
        <div>
          <p className="text-lg font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          We built this platform to help students and professionals prepare for the best jobs and internships.
          </p>
          <div className="mt-2">
            <img
              src="/meme.jpg"
              alt="Eshan Vijay Shettennavar"
              width={500}
              height={500}
              className="aspect-square w-full max-w-[300px] sm:max-w-[400px] rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
         
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full">
      <Timeline data={data} />
    </div>
  );
} 