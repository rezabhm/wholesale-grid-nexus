import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Package, MessageSquare, Heart, FileText, LogOut, Settings, LayoutDashboard, Menu, X } from "lucide-react";
import { useAuth } from "@/store";
import { useState } from "react";

const items = [
  { to: "/dashboard", label: "Orders", icon: Package, end: true },
  { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { to: "/dashboard/rfqs", label: "My RFQs", icon: FileText },
  { to: "/dashboard/favorites", label: "Saved", icon: Heart },
  { to: "/dashboard/profile", label: "Profile", icon: Settings },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); nav("/"); };

  return (
    <div className="bg-surface min-h-[calc(100vh-4rem)]">
      <div className="container-bb py-6 grid grid-cols-12 gap-6">
        <aside className={`col-span-12 md:col-span-3 lg:col-span-2 ${open ? "block" : "hidden md:block"}`}>
          <div className="card-soft p-4 sticky top-20">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">
                {user?.name?.charAt(0).toUpperCase() ?? "G"}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{user?.name ?? "Guest"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email ?? "Sign in"}</p>
              </div>
            </div>
            <nav className="mt-3 space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mt-2 mb-1">Workspace</p>
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition ${isActive ? "bg-primary-soft text-primary font-medium" : "text-foreground/80 hover:bg-muted"}`
                  }
                >
                  <it.icon className="h-4 w-4" /> {it.label}
                </NavLink>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md mt-2">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </nav>
          </div>
        </aside>

        <section className="col-span-12 md:col-span-9 lg:col-span-10 min-w-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden mb-3 inline-flex items-center gap-2 text-sm h-9 px-3 rounded-md border border-border"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />} Menu
          </button>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export { LayoutDashboard };
