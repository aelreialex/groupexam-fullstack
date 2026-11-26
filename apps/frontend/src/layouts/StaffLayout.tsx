import { Outlet } from "react-router-dom";
import { StaffHeader } from "@app/staff-header";

function StaffLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <StaffHeader />

      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout;
