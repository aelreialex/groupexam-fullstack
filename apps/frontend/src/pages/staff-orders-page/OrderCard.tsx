import { Button } from "@app/button";
import type { MockOrder } from "./testdata";

type OrderCardProps = {
  order: MockOrder;
};

export function OrderCard({ order }: OrderCardProps) {
  const buttonText = () => {
    if (order.status === "pending") {
      return "Börja tillaga";
    }
    if (order.status === "preparing") {
      return "Markera klar";
    }
    if (order.status === "ready") {
      return "Utlämnad";
    }
  };

  return (
    <article
      className="
        flex flex-col gap-4
        bg-bg-surface 
        rounded-md border-2 border-border-strong/70
        shadow-[3px_4px_0_0_rgba(56,43,34,0.2)]
        p-4
      "
    >
      <section
        className="
          flex justify-between 
          border-b border-border-subtle border-dotted
          pb-4
        "
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-alfa-slab-one text-xl text-brand-primary">
            #{order.orderNumber}
          </h3>
          <p className="text-xl">{order.customerName}</p>
        </div>

        <span className="font-bold text-xl">
          {new Date(order.createdAt).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </section>

      <section
        className="
          flex flex-col gap-4
          border-b border-border-subtle border-dotted
          pb-4
        "
      >
        {order.cart.map((item, index) => {
          const ingredients = [...item.extras, ...item.condiments];

          return (
            <div key={`${item.productId}-${index}`} className="flex gap-2">
              <span className="font-semibold">{item.quantity}x</span>

              <div>
                <p>{item.name}</p>

                {ingredients.length > 0 && (
                  <aside className="text-xs text-text-secondary">
                    {ingredients
                      .map((ingredient) => ingredient.name)
                      .join(", ")}
                  </aside>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex gap-2 justify-between">
          <p>Totalt</p>
          <span className="font-bold">{order.price} kr</span>
        </div>

        <Button>{buttonText()}</Button>
      </section>
    </article>
  );
}
