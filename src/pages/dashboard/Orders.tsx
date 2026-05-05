import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";
import { orders } from "@/services/mock";
import { RowSkeleton, EmptyState } from "@/components/States";
import type { OrderStatus } from "@/types";

const statusStyles: Record<OrderStatus, string> = {
  Open: "bg-info/10 text-info border-info/30",
  Negotiating: "bg-warning/10 text-warning-foreground border-warning/40",
  Closed: "bg-muted text-muted-foreground border-border",
};

export default function Orders() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => new Promise<typeof orders>((r) => setTimeout(() => r(orders), 300)),
  });

  return (
    <div className="bg-card border border-border">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h1 className="font-semibold">My Orders</h1>
        <div className="flex gap-1 text-xs">
          {(["All", "Open", "Negotiating", "Closed"] as const).map((t, i) => (
            <button key={t} className={`px-3 h-8 border ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}>{t}</button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div>{Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)}</div>
      ) : !data?.length ? (
        <EmptyState icon={Inbox} title="No orders yet" description="Start sourcing products and your orders will appear here." />
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-surface-alt text-xs text-muted-foreground uppercase">
            <tr>
              <th className="text-left p-3">Order</th>
              <th className="text-left p-3 hidden md:table-cell">Supplier</th>
              <th className="text-right p-3">Qty</th>
              <th className="text-right p-3">Total</th>
              <th className="text-center p-3">Status</th>
              <th className="text-right p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr key={o.id} className="border-t border-border hover:bg-surface">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={o.productImage} alt="" className="w-12 h-12 object-cover border border-border" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">#{o.id}</p>
                      <p className="line-clamp-1 text-foreground">{o.productTitle}</p>
                      <p className="text-xs text-muted-foreground md:hidden">{o.supplier}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">{o.supplier}</td>
                <td className="p-3 text-right">{o.qty}</td>
                <td className="p-3 text-right font-semibold">${o.total.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <span className={`inline-block text-xs px-2 py-1 border ${statusStyles[o.status]}`}>{o.status}</span>
                </td>
                <td className="p-3 text-right">
                  <Link to={`/dashboard/chat/${o.id}`} className="text-primary text-xs hover:underline">Open chat →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
