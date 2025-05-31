"use client";

import { Carousel } from "./carousel";

export function CarouselDemo() {
  const slideData = [
    {
      title: "Practice Interviews Anytime, Anywhere",
      button: "Start Practice",
      src: "/pexels-1.jpg",
    },
    {
      title: "Get Instant AI Feedback",
      button: "Try Now",
      src: "/pexels-2.jpg"
    },
    {
      title: "Perfect for Students & Freshers",
      button: "Join Free",
      src: "/pexels-3.jpg"
    },
    {
      title: "Boost Your Interview Confidence",
      button: "Get Started",
      src: "/pexels-4.jpg"
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full">
      <Carousel slides={slideData} />
    </div>
  );
} 