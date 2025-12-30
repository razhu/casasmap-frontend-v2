import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ComparisonProperty {
  id: string;
  title: string;
  priceUS?: number | null;
  priceBS?: number | null;
}

interface ComparisonState {
  properties: ComparisonProperty[];
  addProperty: (property: ComparisonProperty) => void;
  removeProperty: (id: string) => void;
  clearAll: () => void;
  isInComparison: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      properties: [],

      addProperty: (property) => {
        const current = get().properties;

        // Max 4 properties
        if (current.length >= 4) {
          return;
        }

        // Don't add if already in comparison
        if (current.find((p) => p.id === property.id)) {
          return;
        }

        set({ properties: [...current, property] });
      },

      removeProperty: (id) => {
        set({ properties: get().properties.filter((p) => p.id !== id) });
      },

      clearAll: () => {
        set({ properties: [] });
      },

      isInComparison: (id) => {
        return get().properties.some((p) => p.id === id);
      },
    }),
    {
      name: "comparison-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
