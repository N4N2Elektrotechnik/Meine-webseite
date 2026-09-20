import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LegalPage, LegalSection, LegalFields } from "@/components/legal/LegalPage";
import { company, contactLinks } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: `Impressum – ${company.name}`,
  description: `Anbieterkennzeichnung gemäß § 5 DDG für ${company.name}.`,
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <LegalPage
        eyebrow="Rechtliches"
        title="Impressum"
        intro="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
      >
        <LegalSection title="Anbieter">
          <LegalFields
            rows={[
              { label: "Firma", value: company.name },
              { label: "Rechtsform", value: company.legalForm },
              { label: "Inhaber", value: company.owner },
              {
                label: "Anschrift",
                value: (
                  <>
                    {company.street}
                    <br />
                    {company.postalCode} {company.city}
                    <br />
                    {company.country}
                  </>
                ),
              },
            ]}
          />
        </LegalSection>

        <LegalSection title="Kontakt">
          <LegalFields
            rows={[
              { label: "Telefon", value: company.phone },
              {
                label: "E-Mail",
                value: (
                  <a href={contactLinks.mail}>{company.email}</a>
                ),
              },
            ]}
          />
        </LegalSection>

        <LegalSection title="Berufsbezeichnung und berufsrechtliche Regelungen">
          <LegalFields
            rows={[
              {
                label: "Berufsbezeichnung",
                value: `${company.profession} (Meistertitel gemäß § 51 HwO; verliehen in ${company.professionAwardedIn})`,
              },
              {
                label: "Zuständige Kammer",
                value: company.chamber,
              },
              {
                label: "Eintragung",
                value: "In der Handwerksrolle eingetragen.",
              },
            ]}
          />
          <p>
            Es gelten die berufsrechtlichen Regelungen der Handwerksordnung
            (HwO), einsehbar unter{" "}
            <a
              href="https://www.gesetze-im-internet.de/hwo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.gesetze-im-internet.de/hwo
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Handelsregister">
          <p>Der Betrieb ist nicht im Handelsregister eingetragen.</p>
        </LegalSection>

        <LegalSection title="Haftung für Inhalte">
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
            Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte
            oder gespeicherte fremde Informationen zu überwachen oder nach
            Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen. Bei Bekanntwerden entsprechender Rechtsverletzungen
            entfernen wir diese Inhalte umgehend.
          </p>
        </LegalSection>

        <LegalSection title="Haftung für Links">
          <p>
            Unser Angebot kann Links zu externen Websites Dritter enthalten,
            auf deren Inhalte wir keinen Einfluss haben. Für diese fremden
            Inhalte übernehmen wir daher keine Gewähr. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
          </p>
        </LegalSection>

        <LegalSection title="Urheberrecht">
          <p>
            Die durch uns erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Vervielfältigung,
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen unserer schriftlichen
            Zustimmung.
          </p>
        </LegalSection>
      </LegalPage>
      <Footer />
    </>
  );
}
