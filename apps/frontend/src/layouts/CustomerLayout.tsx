import { Outlet } from "react-router-dom";
import { Header } from "@app/header";
import { Footer } from "@app/footer";

function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default CustomerLayout;
