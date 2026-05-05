import { Link } from "react-router-dom";

const sections = [
  { title: "Trade Services", links: ["Trade Assurance", "Business Identity", "Logistics Service", "Inspection Solutions", "Letter of Credit"] },
  { title: "Help & Community", links: ["Help Center", "Live Chat", "Submit a Complaint", "Report IPR", "Integrity Compliance"] },
  { title: "Sell on Tradela", links: ["Become a Supplier", "Verification Service", "Membership Programs", "Partner Programs", "Affiliate Program"] },
  { title: "Get to Know Us", links: ["About Tradela.com", "Corporate Responsibility", "News Center", "Careers", "Press Releases"] },
];

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border mt-12">
      <div className="container-bb py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {sections.map((s) => (
          <div key={s.title}>
            <h4 className="font-semibold mb-3 text-foreground">{s.title}</h4>
            <ul className="space-y-2 text-muted-foreground">
              {s.links.map((l) => (
                <li key={l}><Link to="/" className="hover:text-primary">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-bb py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 Tradela.com. All rights reserved.</p>
          <p>Policy · Privacy · Terms · Intellectual Property Protection</p>
        </div>
      </div>
    </footer>
  );
}
