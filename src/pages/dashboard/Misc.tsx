import { EmptyState } from "@/components/States";
import { MessageSquare, Heart, FileText, User } from "lucide-react";
import { Link } from "react-router-dom";
import { orders } from "@/services/mock";

export function Messages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">Conversations linked to your orders.</p>
      </div>
      <div className="card-soft divide-y divide-border">
        {orders.length === 0 ? (
          <EmptyState icon={MessageSquare} title="No messages yet" description="Once you submit a quote request, the conversation will appear here." />
        ) : (
          orders.map((o) => (
            <Link key={o.id} to={`/dashboard/chat/${o.id}`} className="flex items-center gap-3 p-4 hover:bg-muted transition">
              <img src={o.productImage} alt="" className="w-12 h-12 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{o.supplier}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{o.productTitle}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{o.createdAt}</p>
                <p className="text-xs text-primary font-medium mt-0.5">Open chat →</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
export function Favorites() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Saved products</h1>
      <div className="card-soft"><EmptyState icon={Heart} title="No saved products" description="Tap the heart icon on any product to save it for later." /></div>
    </div>
  );
}
export function RFQs() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">My RFQs</h1>
      <div className="card-soft"><EmptyState icon={FileText} title="No RFQs yet" description="Quote requests you submit will appear here for tracking." /></div>
    </div>
  );
}
export function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Update your business information.</p>
      </div>
      <div className="card-soft p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center"><User className="h-7 w-7" /></div>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">Acme Trading LLC</p>
          </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { l: "Full name", v: "John Doe" },
            { l: "Company", v: "Acme Trading LLC" },
            { l: "Email", v: "buyer@acme.com" },
            { l: "Phone", v: "+1 555 0142" },
            { l: "Country", v: "United States" },
            { l: "Industry", v: "Electronics" },
          ].map((f) => (
            <label key={f.l} className="block">
              <span className="text-xs font-medium text-foreground">{f.l}</span>
              <input defaultValue={f.v} className="input-bb mt-1.5" />
            </label>
          ))}
          <div className="md:col-span-2">
            <button type="button" className="bg-primary text-primary-foreground px-5 h-10 rounded-md text-sm font-medium hover:opacity-90">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
