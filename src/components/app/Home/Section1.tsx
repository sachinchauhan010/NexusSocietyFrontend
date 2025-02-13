import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import HomeVideo from "/HomeVideo.mp4";

export function Section1() {
  const word1= `NEXUS SOCIETY`
  const word2 = `We are the future`
  const word3 = `Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows`
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
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white">
        <TextGenerateEffect words={word1} />
        <TextGenerateEffect words={word2} />
        <TextGenerateEffect words={word3} />
      </div>
    </div>
  );
}
