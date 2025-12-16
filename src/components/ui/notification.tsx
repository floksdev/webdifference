"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NotificationType = "success" | "error";

interface NotificationProps {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  onClose: () => void;
}

export function Notification({ message, type, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-md mx-auto"
        >
          <div
            className={`rounded-2xl p-4 shadow-2xl backdrop-blur-md border-2 ${
              type === "success"
                ? "bg-gradient-to-r from-[#71DDAE]/90 to-[#2A9D7A]/90 border-[#71DDAE] text-black"
                : "bg-gradient-to-r from-red-500/90 to-red-600/90 border-red-400 text-white"
            }`}
            style={{
              boxShadow:
                type === "success"
                  ? "0 20px 60px rgba(113, 221, 174, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                  : "0 20px 60px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {type === "success" ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm leading-relaxed">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-current/70 hover:text-current transition"
                aria-label="Fermer la notification"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

