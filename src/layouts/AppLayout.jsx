import { Header } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="text-slate-100">
      <div className="grid-background bg-slate-800"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default AppLayout;
