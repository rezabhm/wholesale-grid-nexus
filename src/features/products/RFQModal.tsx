import { useState } from "react";
import Modal from "@/components/Modal";
import { BBButton } from "@/components/BBButton";
import { useUI } from "@/store";
import { products } from "@/services/mock";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function RFQModal() {
  const { rfqOpen, rfqProductId, closeRfq } = useUI();
  const product = products.find((p) => p.id === rfqProductId);
  const [qty, setQty] = useState(100);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quote request sent to supplier");
    closeRfq();
    setMsg("");
    setFile(null);
  };

  return (
    <Modal open={rfqOpen} onClose={closeRfq} title="Request for Quotation" size="lg">
      {product && (
        <form onSubmit={submit} className="p-5 space-y-4">
          <div className="flex gap-3 p-3 bg-surface border border-border">
            <img src={product.image} alt="" className="w-16 h-16 object-cover" />
            <div className="text-sm flex-1 min-w-0">
              <p className="line-clamp-2 text-foreground">{product.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{product.supplier.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-muted-foreground">Quantity *</span>
              <div className="flex mt-1">
                <input
                  type="number"
                  min={product.moq}
                  value={qty}
                  onChange={(e) => setQty(+e.target.value)}
                  required
                  className="flex-1 border border-border h-10 px-3 text-sm outline-none focus:border-primary"
                />
                <span className="bg-surface-alt border border-l-0 border-border px-3 flex items-center text-sm text-muted-foreground">{product.unit}</span>
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Target unit price (USD)</span>
              <input type="number" step="0.01" placeholder="0.00" className="mt-1 w-full border border-border h-10 px-3 text-sm outline-none focus:border-primary" />
            </label>
          </div>

          <label className="block">
            <span className="text-xs text-muted-foreground">Message to supplier *</span>
            <textarea
              required
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              placeholder="Describe your requirements: customization, packaging, shipping destination..."
              className="mt-1 w-full border border-border p-3 text-sm outline-none focus:border-primary resize-none"
            />
          </label>

          <label className="block border border-dashed border-border p-4 text-center cursor-pointer hover:border-primary hover:bg-accent/30">
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <Upload className="h-5 w-5 mx-auto text-muted-foreground" />
            <p className="text-xs text-muted-foreground mt-1">{file ? file.name : "Attach product spec, drawing or reference (UI only)"}</p>
          </label>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <BBButton type="button" variant="secondary" onClick={closeRfq}>Cancel</BBButton>
            <BBButton type="submit">Send Inquiry</BBButton>
          </div>
        </form>
      )}
    </Modal>
  );
}
