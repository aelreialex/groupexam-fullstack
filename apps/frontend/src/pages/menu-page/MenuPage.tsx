import type { Menu, Product } from "@app/shared";
import { useOutletContext } from "react-router-dom";
import { useCartStore } from "../../core/cart/cart.store";

import { ProductCard } from "@app/product-card";
import { ProductCardGrid } from "@app/product-card-grid";
import { Pamphlet } from "@app/pamphlet";
import { Section } from "@app/section";
import { SectionTitle } from "@app/section-title";
import { DrinkRow } from "@app/drink-row";

export function MenuPage() {
  const menu = useOutletContext<Menu | undefined>();

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const changeQuantity = useCartStore((state) => state.changeQuantity);

  function getDrinkQuantity(productId: string) {
    return items.find((item) => item.product._id === productId)?.quantity ?? 0;
  }

  function handleDrinkQuantityChange(drink: Product, quantity: number) {
    const item = items.find((item) => item.product._id === drink._id);

    if (item) {
      changeQuantity(item.id, quantity);
    } else if (quantity > 0 && drink.inStock) {
      addItem(drink);
    }
  }

  return (
    <Section>
      <div className="mb-6 space-y-3">
        <SectionTitle as="h1" eyebrow="Korv, mos och annat viktigt">
          Menyn
        </SectionTitle>

        <p className="font-kalam">
          Den har inte ändrats mycket sen -71. Varför skulle den?
        </p>
      </div>
      <ProductCardGrid>
        {menu?.meals.map((meal) => (
          <ProductCard
            key={meal._id}
            product={meal}
            imageSrc={meal.image}
            imageAlt={meal.name}
          />
        ))}
      </ProductCardGrid>
      <div className="mt-8">
        <Pamphlet
          title="Att dricka"
          contentClassName="mx-auto w-full max-w-2xl"
        >
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">
              Läggs till separat i din beställning.
            </p>
          </div>

          {menu?.drinks.map((drink) => (
            <DrinkRow
              key={drink._id}
              product={drink}
              quantity={getDrinkQuantity(drink._id)}
              onQuantityChange={(quantity) =>
                handleDrinkQuantityChange(drink, quantity)
              }
            />
          ))}
        </Pamphlet>
      </div>
    </Section>
  );
}
