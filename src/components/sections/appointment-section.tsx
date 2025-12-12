"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";

export function AppointmentSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  const daysOfWeek = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];
    // Jours du mois précédent pour remplir la première semaine
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = months[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Dates disponibles (exemple)
  const availableDates = [15, 16, 17, 18, 19, 22, 23, 24, 26, 29, 30, 31];

  return (
    <section className="border-t border-white/10 py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-start">
        {/* Colonne gauche */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              On discute de votre projet ? ☕
            </h2>
          </div>

          {/* Étapes */}
          <div className="space-y-6 relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#71DDAE] via-[#71DDAE]/50 to-transparent" />

            {/* Étape 1 */}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#71DDAE] to-[#2A9D7A] border-2 border-[#1C1C1C] shadow-lg">
                <FaCheck className="text-white text-sm" />
              </div>
              <div className="pt-2">
                <p className="text-lg font-semibold text-white">
                  Vous prenez rendez-vous
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C1C1C]/50 border-2 border-white/20">
                <span className="text-white text-sm font-bold">02</span>
              </div>
              <div className="pt-2">
                <p className="text-lg font-semibold text-white">
                  On clarifie vos besoins
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C1C1C]/50 border-2 border-white/20">
                <span className="text-white text-sm font-bold">03</span>
              </div>
              <div className="pt-2">
                <p className="text-lg font-semibold text-white">
                  Web Difference se met au boulot !
                </p>
              </div>
            </div>
          </div>

          {/* Texte clients */}
          <p className="text-base text-white/80 leading-relaxed">
            300+ clients ont obtenu des résultats concrets en faisant appel à nos services, pourquoi pas vous ?
          </p>

          {/* Logos clients */}
          <div className="flex flex-wrap items-center gap-6 opacity-60">
            <span className="text-2xl font-bold text-white">ENGIE</span>
            <span className="text-2xl font-bold text-white">Vinted</span>
            <span className="text-2xl font-bold text-white">CENTURY 21</span>
            <span className="text-2xl font-bold text-white">RENAULT</span>
          </div>
        </div>

        {/* Colonne droite - Calendrier */}
        <div className="flex-1 lg:max-w-md">
          <p className="text-lg text-white/80 italic mb-4 text-center lg:text-left">
            Soyez pas timides!
            <span className="inline-block ml-2 text-[#71DDAE]">↓</span>
          </p>

          <div className="rounded-2xl bg-gradient-to-br from-[#1C1C1C]/80 to-[#1C1C1C]/60 border border-[#71DDAE]/30 backdrop-blur-sm shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Choisissez un jour
            </h3>

            {/* Navigation mois */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <span className="text-base font-semibold text-white">
                {monthName} {year}
              </span>
              <button
                onClick={nextMonth}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-white/60 py-2"
                >
                  {day}.
                </div>
              ))}
            </div>

            {/* Calendrier */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                const isAvailable = day && availableDates.includes(day);
                const isToday = day && 
                  new Date().getDate() === day &&
                  new Date().getMonth() === currentMonth.getMonth() &&
                  new Date().getFullYear() === currentMonth.getFullYear();

                if (!day) {
                  return <div key={index} className="h-10" />;
                }

                return (
                  <button
                    key={index}
                    className={`h-10 rounded-lg text-sm font-medium transition ${
                      isAvailable
                        ? "bg-gradient-to-br from-[#71DDAE] to-[#2A9D7A] text-[#1C1C1C] hover:scale-110 cursor-pointer shadow-md"
                        : "text-white/40 cursor-not-allowed"
                    } ${
                      isToday ? "ring-2 ring-[#71DDAE] ring-offset-2 ring-offset-[#1C1C1C]" : ""
                    }`}
                    disabled={!isAvailable}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Fuseau horaire */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>🌐</span>
                <span>Heure d'Europe centrale ({new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

