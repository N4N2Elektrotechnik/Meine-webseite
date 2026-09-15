import Link from "next/link";
import { company, contactLinks, social } from "@/lib/placeholder-data";
import { ChatIcon, InstagramIcon, MailIcon, PhoneIcon } from "@/components/icons/ContactIcons";
import { LogoBadge } from "@/components/brand/LogoBadge";

const channels = [
  { href: contactLinks.tel, label: company.phone, Icon: PhoneIcon },
  { href: contactLinks.whatsapp, label: "WhatsApp", Icon: ChatIcon, external: true },
  { href: contactLinks.mail, label: company.email, Icon: MailIcon },
  { href: contactLinks.instagram, label: social.instagramHandle, Icon: InstagramIcon, external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-navy-strong px-6 py-14 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <LogoBadge imageHeightClass="h-16 sm:h-20" padding="p-4" />
          <p className="mt-3 max-w-[26ch] font-mono text-xs italic leading-relaxed text-paper/50">
            &bdquo;{company.claim}&ldquo;
          </p>
          <p className="mt-4 font-mono text-xs leading-relaxed text-paper/45">
            {company.address}
            <br />
            {company.serviceArea}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-paper/30">
              Kontakt
            </p>
            <ul className="space-y-2.5">
              {channels.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 font-mono text-xs text-paper/60 transition-colors hover:text-gold"
                  >
                    <Icon className="h-4 w-4 flex-none" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper/50">
            <p className="text-paper/30">Rechtliches</p>
            <Link
              href="/impressum"
              className="block transition-colors hover:text-gold"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="block transition-colors hover:text-gold"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-paper/10 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper/30">
        © {new Date().getFullYear()} {company.name}
      </div>
    </footer>
  );
}
