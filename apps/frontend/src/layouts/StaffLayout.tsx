import { Outlet } from "react-router-dom";
import { StaffHeader } from "@app/staff-header";

function StaffLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <StaffHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout;
