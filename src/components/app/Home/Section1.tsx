import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import HomeVideo from "/HomeVideo.mp4";

export function Section1() {
  const word1 = `NEXUS SOCIETY`
  const word2 = `Together, We Create.Together, We Thrive!`
  const word3 = `Nexus Society empowers individuals to lead, create, and drive meaningful change.`;
  const word4 = `A thriving space where collaboration fuels innovation and every voice matters.`;
  const word5 = `Step into a world where creativity turns visions into reality.`;  
 


  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={HomeVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white gap-y-10">
        <TextGenerateEffect words={word1} className="lg:text-7xl md:text-5xl text-3xl font-semibold" />
        <TextGenerateEffect words={word2} className="lg:text-4xl md:text-3xl text-2xl font-base" />
        <div className="mt-24">
          <TextGenerateEffect words={word3} className="lg:2xl md:text-xl text-lg" />
          <TextGenerateEffect words={word4} className="lg:2xl md:text-xl text-lg" />
          <TextGenerateEffect words={word5} className="lg:2xl md:text-xl text-lg" />
        </div>
      </div>
    </div>
  );
}
