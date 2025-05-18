import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/Data/faq";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [visibleCount, setVisibleCount] = useState(6);
  const totalFaqs = faqs.length;
  const allVisible = visibleCount >= totalFaqs;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, totalFaqs));
  };

  const showLess = () => {
    setVisibleCount(6);
    window.scrollTo({
      top: document.getElementById("faq-section")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* 👇 Heading with Slide Down Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl gradient-title text-center mb-6 font-semibold my-6"
      >
        Things You Might Ask
      </motion.h1>

      {/* 👇 FAQ Section */}
      <section
        id="faq-section"
        className="max-w-3xl mx-auto my-12 px-4 py-8 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl"
      >
        <Accordion type="multiple" className="w-full space-y-4">
          <AnimatePresence mode="wait">
            {faqs.slice(0, visibleCount).map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                layout
              >
                <AccordionItem value={`faq-${index}`}>
                  <AccordionTrigger className="text-base font-medium hover:gradient-title hover:no-underline transition-all duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base hover:gradient-title hover:no-underline transition-all duration-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Accordion>

        {/* 👇 Buttons */}
        <div className="text-center mt-6">
          {!allVisible && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={loadMore}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold transition-transform duration-300"
            >
              Load More
            </motion.button>
          )}
          {allVisible && totalFaqs > 6 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={showLess}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold transition-transform duration-300"
            >
              Show Less
            </motion.button>
          )}
        </div>
      </section>
    </div>
  );
}
