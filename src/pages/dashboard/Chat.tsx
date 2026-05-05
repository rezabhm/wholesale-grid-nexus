import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Paperclip, Send, FileText, BadgeCheck, MoreHorizontal } from "lucide-react";
import { chatThreads, orders } from "@/services/mock";
import type { ChatMessage, OrderStatus } from "@/types";

const statusStyles: Record<OrderStatus, string> = {
  Open: "bg-info/10 text-info border-info/20",
  Negotiating: "bg-warning/10 text-warning border-warning/30",
  Closed: "bg-muted text-muted-foreground border-border",
};

export default function Chat() {
  const { orderId = "" } = useParams();
  const order = orders.find((o) => o.id === orderId);
  const { data } = useQuery({
    queryKey: ["chat", orderId],
    queryFn: () => new Promise<ChatMessage[]>((r) => setTimeout(() => r(chatThreads[orderId] ?? []), 200)),
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (data) setMessages(data); }, [data]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { id: String(Date.now()), orderId, from: "buyer", text, time }]);
    setText("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: String(Date.now() + 1), orderId, from: "supplier", text: "Thanks — I'll get back with details shortly.", time }]);
    }, 1200);
  };

  return (
    <div className="card-soft flex flex-col h-[calc(100vh-10rem)] overflow-hidden">
      {/* header */}
      <div className="border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/dashboard" className="md:hidden text-muted-foreground"><ArrowLeft className="h-4 w-4" /></Link>
        {order && (
          <>
            <img src={order.productImage} alt="" className="w-10 h-10 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate">{order.supplier}</p>
                <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{order.productTitle} · #{order.id}</p>
            </div>
            <span className={`badge ${statusStyles[order.status]} hidden sm:inline-flex`}>{order.status}</span>
            <Link to={`/products/${order.productId}`} className="text-xs text-primary hover:underline hidden sm:block">View product</Link>
            <button className="p-2 rounded-md hover:bg-muted text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></button>
          </>
        )}
      </div>

      {/* messages */}
      <div className="flex-1 overflow-auto p-6 bg-surface space-y-4">
        <div className="text-center text-xs text-muted-foreground py-2">
          Conversation started. Negotiate quantity, price and shipping terms below.
        </div>
        {messages.map((m) => {
          const mine = m.from === "buyer";
          return (
            <div key={m.id} className={`flex gap-2 ${mine ? "justify-end" : "justify-start"}`}>
              {!mine && (
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold shrink-0">
                  {order?.supplier.charAt(0)}
                </div>
              )}
              <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                {m.attachment && (
                  <div className={`mt-2 flex items-center gap-2 text-xs p-2 rounded-md ${mine ? "bg-white/15" : "bg-muted"}`}>
                    <FileText className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{m.attachment.name}</p>
                      <p className="opacity-70">{m.attachment.size}</p>
                    </div>
                  </div>
                )}
                <p className={`text-[10px] mt-1.5 ${mine ? "text-primary-foreground/60" : "text-muted-foreground"} ${mine ? "text-right" : ""}`}>{m.time}</p>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* input */}
      <form onSubmit={send} className="border-t border-border p-3 flex items-center gap-2">
        <button type="button" className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary" aria-label="Attach"><Paperclip className="h-5 w-5" /></button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 input-bb bg-muted/50 border-transparent focus:bg-background"
        />
        <button type="submit" className="bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground h-10 px-4 rounded-md flex items-center gap-1.5 text-sm font-medium disabled:opacity-50" disabled={!text.trim()}>
          <Send className="h-4 w-4" /> <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
