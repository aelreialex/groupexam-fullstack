import { Section } from "@app/section";
import { SectionTitle } from "@app/section-title";
import { OrderCard } from "./OrderCard";

import { mockOrders } from "./testdata";

export function StaffOrdersPage() {
  const pendingOrders = mockOrders.filter(
    (order) => order.status === "pending",
  );

  const preparingOrders = mockOrders.filter(
    (order) => order.status === "preparing",
  );

  const readyOrders = mockOrders.filter((order) => order.status === "ready");

  return (
    <>
      <Section>
        <SectionTitle eyebrow="Tisdag • Lunchservering " as="h1">
          Inkommande beställningar
        </SectionTitle>

        <div className="flex flex-col md:flex-row gap-4 justify-between mt-6">
          {/* PENDING COLUMN */}
          <div
            className="
            bg-bg-surface 
            rounded-md border-2 border-border-subtle
            overflow-hidden
            flex-1
          "
          >
            {/* PANEL HEADER */}
            <div
              className="
              flex items-center gap-2 
              justify-between
              bg-status-new-order
              p-4
              border-b-3             
            "
            >
              <h2
                className=" 
                text-text-on-status
                font-alfa-slab-one
                text-xl
              "
              >
                Ny order
              </h2>
              <span
                className="
                flex size-9 items-center justify-center 
                rounded-full border-2 border-black 
                bg-bg-surface
                font-bold
                text-xl
                aspect-square
              "
              >
                {pendingOrders.length}
              </span>
            </div>

            {/* ORDER CARDS */}
            <div className="flex flex-col gap-4 p-4">
              {pendingOrders.map((order) => (
                <OrderCard order={order} key={order._id} />
              ))}
            </div>
          </div>

          {/* PREPARING COLUMN */}
          <div
            className="
            bg-bg-surface 
            rounded-md border-2 border-border-subtle
            overflow-hidden
            flex-1
          "
          >
            {/* PANEL HEADER */}
            <div
              className="
              flex items-center gap-2 
              justify-between
              bg-status-preparing
              p-4
              border-b-3             
            "
            >
              <h2
                className=" 
                text-text-primary
                font-alfa-slab-one
                text-xl
              "
              >
                Tillagas
              </h2>
              <span
                className="
                flex size-9 items-center justify-center 
                rounded-full border-2 border-black 
                bg-bg-surface
                font-bold
                text-xl
                aspect-square
              "
              >
                {preparingOrders.length}
              </span>
            </div>

            {/* ORDER CARDS */}
            <div className="flex flex-col gap-4 p-4">
              {preparingOrders.map((order) => (
                <OrderCard order={order} key={order._id} />
              ))}
            </div>
          </div>

          {/* READY COLUMN */}
          <div
            className="
            bg-bg-surface 
            rounded-md border-2 border-border-subtle
            overflow-hidden
            flex-1
          "
          >
            {/* PANEL HEADER */}
            <div
              className="
              flex items-center gap-2 
              justify-between 
              bg-status-ready
              p-4
              border-b-3             
            "
            >
              <h2
                className=" 
                text-text-on-status
                font-alfa-slab-one
                text-xl
              "
              >
                Klar för hämtning
              </h2>
              <span
                className="
                flex size-9 items-center justify-center 
                rounded-full border-2 border-black 
                bg-bg-surface
                font-bold
                text-xl
                aspect-square
              "
              >
                {readyOrders.length}
              </span>
            </div>

            {/* ORDER CARDS */}
            <div className="flex flex-col gap-4 p-4">
              {readyOrders.map((order) => (
                <OrderCard order={order} key={order._id} />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
