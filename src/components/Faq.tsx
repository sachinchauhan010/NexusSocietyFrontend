// components/FAQ.tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/Data/faq";

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto my-12 px-4 py-8 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h2>

      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-lg font-medium hover:text-blue-600 transition-all duration-300">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
