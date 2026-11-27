import { Check, X } from "lucide-react";
import { Section } from "@app/section";
import { Pamphlet } from "@app/pamphlet";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/button";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmOrder } from "../../core/orders/orders.api";
import type { ConfirmOrder, Order } from "@app/shared";

export function PaymentResultPage() {
  const navigate = useNavigate();

  const { orderId } = useParams();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  async function handleConfirmOrder(orderId: string, sessionId: ConfirmOrder) {
    try {
      const response = await confirmOrder(orderId, sessionId);
      setOrder(response);
    } catch (error) {
      console.error("Något gick fel:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (orderId && sessionId) {
      handleConfirmOrder(orderId, { sessionId });
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [orderId, sessionId]);

  const isSuccess = order?.paymentStatus === "paid";
  const StatusIcon = isSuccess ? Check : X;

  if (isLoading) {
    return <Section>Laddar...</Section>;
  }

  return (
    <Section>
      <div className="flex min-h-[65vh] items-center justify-center py-6">
        <div className="relative w-full max-w-lg">
          <div
            className={`absolute left-1/2 top-0 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-border-strong shadow-[3px_3px_0_var(--color-border-strong)]
						${
              isSuccess && !hasError
                ? "bg-interactive-primary text-text-primary"
                : "bg-bg-surface text-brand-primary"
            }`}
          >
            <StatusIcon size={26} strokeWidth={3} aria-hidden="true" />
          </div>

          <Pamphlet variant="result">
            <div className="space-y-4 pt-2 text-center">
              <div className="space-y-2 font-alfa-slab-one text-brand-primary">
                <p className="text-xs uppercase tracking-wider">
                  {isSuccess ? "Beställningen är klar" : "Ingen fara"}
                </p>
                <h1 className="text-3xl leading-tight sm:text-4xl">
                  {isSuccess && !hasError ? (
                    <>
                      Tack för din
                      <br />
                      beställning!
                    </>
                  ) : (
                    <>
                      Betalningen
                      <br />
                      avbröts
                    </>
                  )}
                </h1>
              </div>

              <p className="text-sm">
                {isSuccess && !hasError
                  ? "Betalningen har genomförts och din beställning är bekräftad."
                  : "Beställningen har inte slutförts och du har inte blivit debiterad."}
              </p>

              {isSuccess && !hasError ? (
                <>
                  <div className="border-y border-dashed border-border-subtle py-4">
                    <p className="text-xs font-bold uppercase tracking-wider">
                      Ordernummer
                    </p>

                    <p className="font-alfa-slab-one text-2xl text-brand-primary">
                      #{order.orderNumber}
                    </p>
                  </div>

                  <div className="border border-border-subtle text-left">
                    <h2 className="border-b border-border-strong px-4 py-3 font-alfa-slab-one text-brand-primary">
                      Din beställning
                    </h2>

                    <ul className="divide-y divide-dashed divide-border-subtle px-4">
                      {order.cart.map((item) => {
                        const ingredients = [
                          ...item.extras,
                          ...item.condiments,
                        ];

                        return (
                          <li
                            key={item.name}
                            className="flex items-start justify-between gap-4 py-3 text-sm"
                          >
                            <div>
                              <p>
                                <span className="font-bold text-brand-primary">
                                  {item.quantity} x
                                </span>{" "}
                                {item.name}
                              </p>

                              {ingredients.length > 0 && (
                                <p className="mt-1 text-xs text-text-secondary">
                                  {ingredients
                                    .map((ingredient) => ingredient.name)
                                    .join(", ")}
                                </p>
                              )}
                            </div>

                            <span className="shrink-0">
                              {item.totalItemPrice} kr
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="flex items-center justify-between gap-4 border-t border-border-strong px-4 py-3">
                      <span className="text-xs font-bold uppercase">
                        Totalt betalt
                      </span>
                      <span className="font-alfa-slab-one text-lg text-brand-primary">
                        {order.price} kr
                      </span>
                    </div>
                  </div>

                  <p className="font-kalam text-sm">
                    Vi har tagit emot beställningen och börjar grilla.
                  </p>

                  <Button onClick={() => navigate("/")}>Till startsidan</Button>
                </>
              ) : (
                <>
                  <div className="space-y-2 border-y border-dashed border-border-subtle py-4">
                    <h2 className="font-alfa-slab-one text-sm text-brand-primary">
                      Din beställning väntar kvar.
                    </h2>
                    <p className="text-sm">
                      Du kan gå tillbaka till checkout och återuppta betalningen
                      när du vill.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <Button onClick={() => navigate("/checkout")}>
                      Tillbaka till checkout
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => navigate("/menu")}
                    >
                      Tillbaka till menyn
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Pamphlet>
        </div>
      </div>
    </Section>
  );
}
