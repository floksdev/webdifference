'use client';

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export function BackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95"
    >
      <FaArrowLeft className="text-lg" />
      Page précédente
    </button>
  );
}

