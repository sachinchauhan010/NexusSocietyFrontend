import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export function Section2() {
  return (
    <div className="relative w-full h-screen overflow-hidden mt-10">
      <h1 className="text-4xl mx-auto font-semibold text-center py-4">Our Vision</h1>
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
    </div>
  );
}
