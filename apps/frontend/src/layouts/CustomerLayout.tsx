import { Link, Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <h2>Restaurant</h2>
        <Link to="/">Home</Link> <Link to="/menu">Menu</Link>{" "}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer>
        <p>Customer footer</p>
      </footer>
    </div>
  );
}

export default CustomerLayout;
