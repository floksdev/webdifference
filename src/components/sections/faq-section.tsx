"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";
import { FaChevronDown } from "react-icons/fa";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="text-base text-white/80 max-w-2xl mx-auto">
            Des réponses simples pour vous aider à décider en toute confiance.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="group rounded-2xl border border-[#71DDAE]/30 bg-gradient-to-br from-[#71DDAE]/10 to-[#2A9D7A]/10 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-[#71DDAE]/50"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-white pr-8">
                    {item.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-[#71DDAE] to-[#2A9D7A] flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <FaChevronDown className="text-white text-xs" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="pt-2 border-t border-[#71DDAE]/20">
                      <p className="text-sm text-white/80 leading-relaxed pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
