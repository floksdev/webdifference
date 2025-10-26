"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type ProjectQuoteInput } from "@/lib/schemas/project-quote";

const defaultQuote: ProjectQuoteInput = {
  projectType: "",
  designLevel: "",
  functionalScope: [],
  marketingSupport: false,
  deadline: undefined,
  budgetRange: { min: 3000, max: 6000 },
  paymentPreference: "IBAN",
  subscriptionModel: { enabled: false, monthly: undefined },
};

type QuoteStore = {
  data: ProjectQuoteInput;
  update: (payload: Partial<ProjectQuoteInput>) => void;
  reset: () => void;
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      data: defaultQuote,
      update: (payload) =>
        set((state) => ({
          data: { ...state.data, ...payload },
        })),
      reset: () => set({ data: defaultQuote }),
    }),
    {
      name: "webdifference-quote",
      partialize: (state) => ({ data: state.data }),
    },
  ),
);
