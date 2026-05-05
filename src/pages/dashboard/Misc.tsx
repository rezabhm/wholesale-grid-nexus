import { EmptyState } from "@/components/States";
import { MessageSquare, Heart, FileText, User } from "lucide-react";

export function Messages() {
  return <div className="bg-card border border-border p-6"><EmptyState icon={MessageSquare} title="No messages" description="Conversations with suppliers appear here." /></div>;
}
export function Favorites() {
  return <div className="bg-card border border-border p-6"><EmptyState icon={Heart} title="No favorites yet" description="Save products you like and find them here." /></div>;
}
export function RFQs() {
  return <div className="bg-card border border-border p-6"><EmptyState icon={FileText} title="No RFQs" description="Submitted quotation requests appear here." /></div>;
}
export function Profile() {
  return (
    <div className="bg-card border border-border p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center"><User className="h-8 w-8" /></div>
        <div>
          <h1 className="text-lg font-semibold">Buyer profile</h1>
          <p className="text-sm text-muted-foreground">Update your business information</p>
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
            <span className="text-xs text-muted-foreground">{f.l}</span>
            <input defaultValue={f.v} className="mt-1 w-full border border-border h-10 px-3 text-sm outline-none focus:border-primary" />
          </label>
        ))}
        <div className="md:col-span-2">
          <button type="button" className="bg-primary text-primary-foreground px-5 h-10 text-sm">Save changes</button>
        </div>
      </form>
    </div>
  );
}
