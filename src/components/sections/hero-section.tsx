"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="w-fit mb-4">
            <div className="flex items-center gap-3 rounded-full border border-[#1C1C1C]/20 bg-[#FFFFFF] px-6 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.32),0_0_20px_rgba(113,221,174,0.4),0_0_40px_rgba(113,221,174,0.2)]">
              <Image
                src="/assets/main/fond-blanc/logo-sm.png"
                alt="Web Difference loupe"
                width={40}
                height={40}
                className="h-10 w-10 flex-shrink-0"
                priority
              />
              <p className="text-sm font-semibold text-[#1C1C1C] sm:text-base md:text-lg whitespace-nowrap">
              J'ai un site internet mais aucune trace des clients...  😱
              </p>
            </div>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Votre <span className="text-[#71DDAE]">site</span> doit <span className="text-[#71DDAE]">donner envie</span> de <span className="text-[#71DDAE]">rester</span>, pas de <span className="line-through decoration-[#1C1C1C]"><span className="text-[#71DDAE]">revenir</span> <span className="text-white">en</span> <span className="text-[#71DDAE]">arrière</span></span>.
          </h1>
          <p className="max-w-2xl text-lg font-medium text-white/80 md:text-xl">
          Design moderne, SEO solide, Suivi complet :<br /> on construit un site qui retient vos visiteurs et vous apporte des résultats.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative inline-flex">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] px-8 py-4 text-2xl font-extrabold tracking-wide text-[#1C1C1C] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
                style={{
                  height: "68px",
                }}
              >
                <FaCalendarAlt className="text-2xl" />
                Prendre RDV
              </Link>
              <div className="absolute top-full -left-12 -mt-4 pointer-events-none">
                <Image
                  src="/assets/main/unptitclick2.png"
                  alt="Un ptit click ?"
                  width={200}
                  height={150}
                  className="w-auto h-auto max-w-[200px]"
                />
              </div>
            </div>
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#71DDAE] bg-[#1C1C1C]/50 backdrop-blur px-8 py-4 text-lg font-extrabold tracking-wide text-[#71DDAE] transition-all duration-200 hover:bg-[#1C1C1C]/70"
              style={{
                height: "68px",
              }}
            >
              Découvrir nos projets
              <FaArrowDown className="text-xl" color="#71DDAE" />
            </Link>
          </div>
        </motion.div>

      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2 }}
      >
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:rgba(113,221,174,0.25)] blur-[220px]" />
        <div className="absolute left-1/4 top-1/4 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:rgba(255,255,255,0.18)] blur-[200px]" />
      </motion.div>
    </section>
  );
}
