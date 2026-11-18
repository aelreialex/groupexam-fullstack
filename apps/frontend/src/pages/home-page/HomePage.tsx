import { SectionTitle } from "@app/section-title";
import { Pamphlet } from "@app/pamphlet";
import { ProductCard } from "@app/product-card";
import { createProductSchema } from "@app/shared";
import korvImage from "../../assets/korv-m-brod.png";
import { Section } from "@app/section";
import { ProductCardGrid } from "../../base/product-card-grid";

const exampleProduct = createProductSchema.parse({
  _id: "meal-1",
  name: "Grillad korv med bröd",
  price: 30,
  description:
    "Ordentligt grillad i mjukt bröd, med senap, ketchup och rostad lök.",
  nisseQuote: "Lite stökig. Precis som det ska vara.",
  sortOrder: 0,
  ingredients: [
    {
      _id: "ingredient-bread",
      name: "Korvbröd",
      role: "base",
    },
    {
      _id: "ingredient-sausage",
      name: "Grillkorv",
      role: "sausage",
    },
  ],
  extras: [
    {
      _id: "extra-onion",
      name: "Extra rostad lök",
      role: "topping",
      price: 5,
      isCustomizable: true,
    },
    {
      _id: "extra-salad",
      name: "Extra räksallad",
      role: "topping",
      price: 10,
      isCustomizable: true,
    },
  ],
});

export function HomePage() {
  return (
    <div>
      <Section>
        <p>Här kommer hero-innehållet.</p>
      </Section>

      <Section>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Serveras 11-14">Dagens lunch</SectionTitle>

          <p className="font-kalam text-sm">"Det som står framme är dagens"</p>
        </div>

        <ProductCardGrid>
          <ProductCard
            product={exampleProduct}
            imageSrc={korvImage}
            imageAlt="Grillad korv med bröd"
          />
          <ProductCard
            product={exampleProduct}
            imageSrc={korvImage}
            imageAlt="Grillad korv med bröd"
          />
          <ProductCard
            product={exampleProduct}
            imageSrc={korvImage}
            imageAlt="Grillad korv med bröd"
          />
        </ProductCardGrid>
      </Section>

      <Section background>
        <SectionTitle eyebrow="Varje dag sen 1971">Om Nisse</SectionTitle>
      </Section>

      <Section>
        <SectionTitle eyebrow="Stortorget · mitt i stan">
          Hitta hit
        </SectionTitle>
        <Pamphlet title="Öppet">{null}</Pamphlet>
      </Section>
    </div>
  );
}
