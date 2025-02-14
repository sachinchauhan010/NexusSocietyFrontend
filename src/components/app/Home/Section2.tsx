import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export function Section2() {
  return (
    <div className="relative w-full h-screen overflow-hidden mt-10 flex flex-col justify-between">
      <h1 className="text-4xl mx-auto font-semibold text-center py-4 font-roboto">
        Our Vision
      </h1>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Your Society <br /> Our Priority
        </motion.h1>
      </LampContainer>

      {/* Static paragraph at the bottom */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4">
        <p className="text-white text-center text-base sm:text-base md:text-lg lg:text-xl xl:text-3xl 2xl:text-4xl">
          Dedicated to shaping flourishing communities with excellence,
          innovation, and unwavering commitment.
        </p>
      </div>
    </div>
  );
}
