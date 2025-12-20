"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

import { projects } from "@/data/projects";

export function PortfolioPreviewSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [clickedImageRef, setClickedImageRef] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const imageRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleImageClick = (project: typeof projects[0], event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    setClickedImageRef({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    });
    
    setTimeout(() => {
      setSelectedProject(project.slug);
    }, 100);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setClickedImageRef(null);
  };

  const currentProject = projects.find((p) => p.slug === selectedProject);

  return (
    <section className="border-t border-white/10 bg-[color:var(--color-background-strong)] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/ideeailles.png"
              alt="Idée ailes"
              width={300}
              height={300}
              className="w-auto h-auto"
            />
          </div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Le détail au <span className="text-[#F3C16D] text-4xl sm:text-5xl underline decoration-[#F3C16D] decoration-2 underline-offset-4">cœur</span> de chaque <span className="text-[#F3C16D] text-4xl sm:text-5xl">projet</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => {
            return (
            <article
              key={project.slug}
              className="group relative flex flex-col gap-6 rounded-3xl p-6 transition-all duration-300 bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A]"
            >
              <button
                type="button"
                ref={(el) => {
                  imageRefs.current[project.slug] = el;
                }}
                onClick={(e) => handleImageClick(project, e)}
                className="relative w-full overflow-hidden rounded-2xl bg-[#1C1C1C] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(113,221,174,0.5)]"
              >
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={800}
                    height={600}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-auto w-full"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-[#71DDAE]/10">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 rounded-full bg-[#71DDAE] backdrop-blur-sm px-4 py-2 shadow-lg">
                    <span className="text-[#1C1C1C] text-sm font-semibold">Voir le site</span>
                    <span className="text-[#1C1C1C]">→</span>
                  </div>
                </div>
              </button>
              <h3 className="text-2xl font-bold text-black">
                {project.slug === "portfolio-project" ? "Portfolio [DEMO]" : project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.slug === "jwl-marketing" ? (
                  <>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Site Vitrine/E-commerce
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      SEO
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Design sur-mesure
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      API's
                    </span>
                  </>
                ) : project.slug === "greenbeamcraft" ? (
                  <>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Site E-commerce
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Configurateur 2D/3D
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Interface admin
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      API's
                    </span>
                  </>
                ) : project.slug === "portfolio-project" ? (
                  <>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Site vitrine
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Design sur mesure
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      Animations Motion
                    </span>
                    <span className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black">
                      API's
                    </span>
                  </>
                ) : (
                  project.stack.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#71DDAE]/40 bg-[#2A9D7A]/60 px-3 py-1 text-xs font-normal text-black"
                    >
                      {tag}
                    </span>
                  ))
                )}
              </div>
            </article>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Link
            href="https://calendly.com/webdifference/nouvelle-reunion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] px-8 py-4 text-2xl font-extrabold tracking-wide text-[#1C1C1C] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              height: "68px",
            }}
          >
            <FaCalendarAlt className="text-2xl" />
            Prendre un RDV →
          </Link>
        </div>
      </div>

      {/* Modal avec iframe et animation d'expansion */}
      <AnimatePresence>
        {selectedProject && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={clickedImageRef ? {
                x: clickedImageRef.x - window.innerWidth / 2,
                y: clickedImageRef.y - window.innerHeight / 2,
                width: clickedImageRef.width,
                height: clickedImageRef.height,
                scale: 0.3,
                opacity: 0,
              } : {
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                width: "85vw",
                height: "90vh",
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                duration: 0.6,
                bounce: 0.2,
              }}
              className="relative rounded-2xl border border-white/10 bg-[#1C1C1C] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  {currentProject.slug === "portfolio-project" ? "Portfolio [DEMO]" : currentProject.title}
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
              <div className="relative h-[calc(90vh-80px)] overflow-hidden">
                {currentProject.liveUrl && currentProject.liveUrl !== "#" ? (
                  <iframe
                    src={currentProject.liveUrl}
                    className="h-full w-full border-0"
                    title={currentProject.title}
                    allow="fullscreen"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/60">
                    <p>URL du site non disponible</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
