import { Link } from "react-router-dom";
import { Package2 } from "lucide-react";

const sections = [
  { title: "Platform", links: ["Marketplace", "Suppliers", "Categories", "Trade Assurance"] },
  { title: "For buyers", links: ["How it works", "Request a quote", "Buyer protection", "Help center"] },
  { title: "For suppliers", links: ["Become a supplier", "Verification", "Pricing", "Resources"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Press"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="container-bb py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center">
              <Package2 className="h-5 w-5" />
            </div>
            <span className="font-semibold">Tradela</span>
          </div>
          <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
            The modern B2B sourcing platform. Negotiate directly with verified suppliers worldwide.
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title}>
            <h4 className="font-semibold mb-3 text-foreground text-sm">{s.title}</h4>
            <ul className="space-y-2 text-muted-foreground text-xs">
              {s.links.map((l) => (
                <li key={l}><Link to="/" className="hover:text-primary">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-bb py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 Tradela. All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
