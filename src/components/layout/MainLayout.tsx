import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import RFQModal from "@/features/products/RFQModal";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RFQModal />
    </div>
  );
}
