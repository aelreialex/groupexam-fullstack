import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Header } from "@app/header";
import { Footer } from "@app/footer";
import { useState } from "react";
import { CartDrawer } from "@app/cart-drawer";
import { getMenu } from "../core/menu/menu.api";
import { useCartStore } from "../core/cart/cart.store";

function CustomerLayout() {
  const { data: menu } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  const cartItems = useCartStore((state) => state.items);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartQuantity={cartQuantity}
      />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="w-full flex-1">
        <Outlet context={menu} />
      </main>

      <Footer />
    </div>
  );
}

export default CustomerLayout;
