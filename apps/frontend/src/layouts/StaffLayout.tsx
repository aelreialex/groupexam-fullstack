import { Outlet } from "react-router-dom";

function StaffLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <h2>Staff portal</h2>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout;
