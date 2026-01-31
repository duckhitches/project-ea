"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function GlowingEffectDemoSecond() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">

  <GridItem
    area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
    title="AI-Powered Interview Coach"
    description="Practice interviews that adapt dynamically to your responses. Get personalized, context-aware questions like never before."
  />

  <GridItem
    area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
    icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
    title="Company-Specific Questions"
    description="Our AI researches the company you choose and tailors interview questions to match its tech stack, culture, and role expectations."
  />

  <GridItem
    area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
    icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
    title="Resume-Based Questioning"
    description="Upload your resume — the AI will analyze it and ask relevant technical and behavioral follow-up questions in real time."
  />

  <GridItem
    area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
    icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
    title="Completely Private & Secure"
    description="Your data stays encrypted and private. NoQwit.ai never stores or shares your personal details or transcripts."
  />

  <GridItem
    area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
    icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
    title="Real-Time Feedback"
    description="You’ll receive instant feedback on tone, clarity, and technical accuracy to refine your interview performance."
  />

</ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-montserrat text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-montserrat text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
