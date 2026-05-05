import { NavLink, Outlet } from "react-router-dom";
import { Package, MessageSquare, User, Heart, FileText, LogOut } from "lucide-react";
import { useAuth } from "@/store";

const items = [
  { to: "/dashboard", label: "My Orders", icon: Package, end: true },
  { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { to: "/dashboard/rfqs", label: "My RFQs", icon: FileText },
  { to: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="container-bb py-4">
      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="bg-card border border-border">
            <div className="p-4 border-b border-border">
              <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {user?.name?.charAt(0).toUpperCase() ?? "G"}
              </div>
              <p className="font-medium text-sm mt-2">{user?.name ?? "Guest Buyer"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email ?? "Sign in to continue"}</p>
            </div>
            <nav className="py-2">
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-sm border-l-2 ${isActive ? "border-primary bg-accent text-accent-foreground font-medium" : "border-transparent text-foreground hover:bg-surface-alt"}`
                  }
                >
                  <it.icon className="h-4 w-4" /> {it.label}
                </NavLink>
              ))}
              <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-surface-alt border-l-2 border-transparent">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </nav>
          </div>
        </aside>
        <section className="col-span-12 md:col-span-9 lg:col-span-10">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
