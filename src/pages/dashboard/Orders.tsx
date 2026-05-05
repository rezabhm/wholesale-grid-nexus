import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Inbox, MessageSquare, Package, TrendingUp } from "lucide-react";
import { orders } from "@/services/mock";
import { RowSkeleton, EmptyState } from "@/components/States";
import type { OrderStatus } from "@/types";
import { useState } from "react";

const statusStyles: Record<OrderStatus, string> = {
  Open: "bg-info/10 text-info border-info/20",
  Negotiating: "bg-warning/10 text-warning border-warning/30",
  Closed: "bg-muted text-muted-foreground border-border",
};

export default function Orders() {
  const [tab, setTab] = useState<"All" | OrderStatus>("All");
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => new Promise<typeof orders>((r) => setTimeout(() => r(orders), 300)),
  });

  const list = (data ?? []).filter((o) => tab === "All" || o.status === tab);
  const stats = [
    { label: "Active orders", value: data?.filter((o) => o.status !== "Closed").length ?? 0, icon: Package, accent: "text-primary bg-primary-soft" },
    { label: "Negotiating", value: data?.filter((o) => o.status === "Negotiating").length ?? 0, icon: MessageSquare, accent: "text-warning bg-warning/10" },
    { label: "Total volume", value: `$${(data?.reduce((s, o) => s + o.total, 0) ?? 0).toLocaleString()}`, icon: TrendingUp, accent: "text-success bg-success/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Track requests and active negotiations with suppliers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card-soft p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <div className={`h-8 w-8 rounded-md grid place-items-center ${s.accent}`}><s.icon className="h-4 w-4" /></div>
            </div>
            <p className="text-2xl font-bold mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-1 text-xs">
            {(["All", "Open", "Negotiating", "Closed"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 h-8 rounded-md font-medium transition ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div>{Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)}</div>
        ) : !list.length ? (
          <EmptyState icon={Inbox} title="No orders here" description="Submit a quote request from any product to start an order." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Order</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Supplier</th>
                  <th className="text-right px-5 py-3 font-medium">Qty</th>
                  <th className="text-right px-5 py-3 font-medium">Total</th>
                  <th className="text-center px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.id} className="border-t border-border hover:bg-surface transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={o.productImage} alt="" className="w-10 h-10 rounded object-cover" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">#{o.id}</p>
                          <p className="line-clamp-1 font-medium">{o.productTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell text-muted-foreground">{o.supplier}</td>
                    <td className="px-5 py-3 text-right">{o.qty}</td>
                    <td className="px-5 py-3 text-right font-semibold">${o.total.toLocaleString()}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`badge ${statusStyles[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link to={`/dashboard/chat/${o.id}`} className="text-primary text-xs font-medium hover:underline">Open chat →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
