import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Paperclip, Send, FileText } from "lucide-react";
import { chatThreads, orders } from "@/services/mock";
import type { ChatMessage } from "@/types";

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
    setMessages((m) => [...m, { id: String(Date.now()), orderId, from: "buyer", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setText("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: String(Date.now() + 1), orderId, from: "supplier", text: "Thanks, I'll get back to you with details shortly.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1200);
  };

  return (
    <div className="bg-card border border-border flex flex-col h-[calc(100vh-180px)]">
      {/* header */}
      <div className="border-b border-border p-3 flex items-center gap-3">
        <Link to="/dashboard" className="md:hidden text-muted-foreground"><ArrowLeft className="h-4 w-4" /></Link>
        {order && (
          <>
            <img src={order.productImage} alt="" className="w-10 h-10 object-cover border border-border" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{order.supplier}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{order.productTitle}</p>
            </div>
            <Link to={`/products/${order.productId}`} className="text-xs text-primary hover:underline hidden sm:block">View product</Link>
          </>
        )}
      </div>

      {/* messages */}
      <div className="flex-1 overflow-auto p-4 bg-surface space-y-3">
        {messages.map((m) => {
          const mine = m.from === "buyer";
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${mine ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground"} px-3 py-2 text-sm`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
                {m.attachment && (
                  <div className={`mt-2 flex items-center gap-2 text-xs p-2 ${mine ? "bg-[hsl(var(--primary-hover))]" : "bg-surface-alt"}`}>
                    <FileText className="h-4 w-4" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{m.attachment.name}</p>
                      <p className="opacity-70">{m.attachment.size}</p>
                    </div>
                  </div>
                )}
                <p className={`text-[10px] mt-1 ${mine ? "opacity-70" : "text-muted-foreground"} text-right`}>{m.time}</p>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* input */}
      <form onSubmit={send} className="border-t border-border p-3 flex items-center gap-2">
        <button type="button" className="p-2 text-muted-foreground hover:text-primary" aria-label="Attach"><Paperclip className="h-5 w-5" /></button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-border h-10 px-3 text-sm outline-none focus:border-primary"
        />
        <button type="submit" className="bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground h-10 px-4 flex items-center gap-1 text-sm">
          <Send className="h-4 w-4" /> <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
