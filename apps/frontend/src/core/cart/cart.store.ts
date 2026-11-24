import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@app/shared";
import type { CartItem } from "./cart.types";
import { MAX_DRINK_QUANTITY } from "./cart.constants";
import { getSelectionKey } from "./cart.utils";

type CartState = {
  items: CartItem[];
  addItem: (
    product: Product,
    selectedExtras?: Product["extras"],
    selectedCondiments?: Product["condiments"],
  ) => void;
  changeQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, selectedExtras = [], selectedCondiments = []) => {
        // Skapa en unik nyckel baserad på produkten och dess valda tillbehör.
        // Används för att avgöra om samma kombination redan finns i varukorgen.
        const selectionKey = getSelectionKey(
          product._id,
          selectedExtras,
          selectedCondiments,
        );

        // Förbered en ny varukorgsrad med ett unikt ID och startkvantitet 1.
        const newItem: CartItem = {
          id: crypto.randomUUID(),
          product,
          quantity: 1,
          selectedExtras: [...selectedExtras],
          selectedCondiments: [...selectedCondiments],
        };

        set((state) => {
          // Kontrollera om samma produkt med samma tillbehör redan finns i varukorgen.
          const existingItem = state.items.find(
            (item) =>
              getSelectionKey(
                item.product._id,
                item.selectedExtras,
                item.selectedCondiments,
              ) === selectionKey,
          );

          // Om kombinationen redan finns, öka kvantiteten istället för att skapa en ny rad.
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === existingItem.id
                  ? {
                      ...item,
                      // Begränsa antalet till 5 för drycker och 99 för övriga produkter.
                      quantity: Math.min(
                        item.product.category === "drink"
                          ? MAX_DRINK_QUANTITY
                          : 99,
                        item.quantity + 1,
                      ),
                    }
                  : item,
              ),
            };
          }

          // Om kombinationen inte finns, lägg till den som en ny rad i varukorgen.
          return {
            items: [...state.items, newItem],
          };
        });
      },

      changeQuantity: (id, quantity) => {
        set((state) => {
          // Hitta varukorgsraden och uppdatera dess kvantitet.
          return {
            items: state.items
              .map((item) => {
                // Lämna övriga varukorgsrader oförändrade.
                if (item.id !== id) return item;

                // Bestäm maxgräns: 5 för drycker och 99 för övriga produkter.
                const max =
                  item.product.category === "drink" ? MAX_DRINK_QUANTITY : 99;

                // Begränsa kvantiteten till intervallet 0–max.
                return {
                  ...item,
                  quantity: Math.max(0, Math.min(max, quantity)),
                };
              })
              // Ta bort varukorgsrader vars kvantitet är 0.
              .filter((item) => item.quantity > 0),
          };
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
