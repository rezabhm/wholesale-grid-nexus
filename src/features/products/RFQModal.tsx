import { useState } from "react";
import Modal from "@/components/Modal";
import { BBButton } from "@/components/BBButton";
import { useUI } from "@/store";
import { products } from "@/services/mock";
import { Upload, Check, ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const steps = ["Quantity & notes", "Attachments", "Review & submit"];

export default function RFQModal() {
  const { rfqOpen, rfqProductId, closeRfq } = useUI();
  const product = products.find((p) => p.id === rfqProductId);
  const nav = useNavigate();

  const [step, setStep] = useState(0);
  const [qty, setQty] = useState(100);
  const [target, setTarget] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const reset = () => { setStep(0); setQty(100); setTarget(""); setMsg(""); setFile(null); };
  const close = () => { closeRfq(); setTimeout(reset, 200); };

  const submit = () => {
    toast.success("Quote request sent — chat opened");
    close();
    nav("/dashboard/chat/o1001");
  };

  if (!product) return null;

  const canNext = step === 0 ? qty >= product.moq && msg.trim().length > 0 : true;

  return (
    <Modal open={rfqOpen} onClose={close} title="Request for Quotation" subtitle={`Step ${step + 1} of ${steps.length} — ${steps[step]}`} size="lg">
      {/* Stepper */}
      <div className="px-6 pt-5">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`h-7 w-7 rounded-full grid place-items-center text-xs font-semibold transition ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Product summary */}
        <div className="flex gap-3 p-3 rounded-lg bg-surface border border-border mb-5">
          <img src={product.image} alt="" className="w-14 h-14 rounded object-cover" />
          <div className="text-sm flex-1 min-w-0">
            <p className="line-clamp-2 text-foreground font-medium">{product.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{product.supplier.name} · MOQ {product.moq}</p>
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-medium text-foreground">Quantity *</span>
                <div className="flex mt-1.5">
                  <input
                    type="number"
                    min={product.moq}
                    value={qty}
                    onChange={(e) => setQty(+e.target.value)}
                    required
                    className="input-bb rounded-r-none"
                  />
                  <span className="bg-muted border border-l-0 border-border rounded-r-md px-3 flex items-center text-sm text-muted-foreground">{product.unit}</span>
                </div>
                {qty < product.moq && <p className="text-xs text-destructive mt-1">Minimum {product.moq}</p>}
              </label>
              <label className="block">
                <span className="text-xs font-medium text-foreground">Target unit price (USD)</span>
                <input
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  type="number"
                  step="0.01"
                  placeholder="Optional"
                  className="input-bb mt-1.5"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-foreground">Message to supplier *</span>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={5}
                placeholder="Describe customization, packaging, shipping destination, certifications…"
                className="mt-1.5 w-full border border-input rounded-md p-3 text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 resize-none"
              />
            </label>
          </div>
        )}

        {step === 1 && (
          <label className="block border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary hover:bg-primary-soft transition">
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-sm font-medium mt-3">{file ? file.name : "Upload spec sheet, drawing or reference image"}</p>
            <p className="text-xs text-muted-foreground mt-1">{file ? "Click to replace · Optional" : "PDF, PNG, JPG up to 20MB · Optional"}</p>
          </label>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Row label="Quantity" value={`${qty} ${product.unit}`} />
            <Row label="Target price" value={target ? `$${target} / unit` : "—"} />
            <Row label="Attachment" value={file ? <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> {file.name}</span> : "None"} />
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Message</p>
              <div className="p-3 bg-surface border border-border rounded-md text-sm whitespace-pre-wrap">{msg}</div>
            </div>
            <div className="text-xs text-muted-foreground bg-primary-soft border border-primary/15 rounded-md p-3">
              On submit, a chat thread will be created with the supplier where you can negotiate quantity, price, packaging and shipping terms.
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 px-6 py-4 border-t border-border bg-surface">
        <BBButton variant="ghost" onClick={step === 0 ? close : () => setStep(step - 1)}>
          {step === 0 ? "Cancel" : <><ArrowLeft className="h-4 w-4" /> Back</>}
        </BBButton>
        {step < steps.length - 1 ? (
          <BBButton onClick={() => setStep(step + 1)} disabled={!canNext}>Continue <ArrowRight className="h-4 w-4" /></BBButton>
        ) : (
          <BBButton onClick={submit}>Submit request</BBButton>
        )}
      </div>
    </Modal>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 text-sm py-2 border-b border-border">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
