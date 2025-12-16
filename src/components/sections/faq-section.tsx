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
            Questions <span className="text-[#71DDAE] text-4xl sm:text-5xl font-bold">fréquentes</span>
          </h2>
          <p className="text-base text-white/80 max-w-2xl mx-auto">
            Des réponses <span className="text-[#71DDAE] font-semibold">simples</span> pour vous <span className="text-[#71DDAE] font-semibold">aider</span> à décider en toute <span className="text-[#71DDAE] font-semibold">confiance</span>.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-[#71DDAE] pr-8">
                    {item.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <FaChevronDown className="text-[#71DDAE] text-xs" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-white/80 leading-relaxed">
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
