import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LegalPage, LegalSection, LegalFields } from "@/components/legal/LegalPage";
import { company, contactLinks } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: `Datenschutzerklärung – ${company.name}`,
  description: `Informationen zur Verarbeitung personenbezogener Daten auf der Website von ${company.name}.`,
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <LegalPage
        eyebrow="Rechtliches"
        title="Datenschutz"
        intro="Diese Erklärung beschreibt, welche personenbezogenen Daten auf dieser Website verarbeitet werden und zu welchem Zweck — abgestimmt auf die tatsächlich eingesetzten bzw. geplanten Funktionen."
      >
        <LegalSection title="1. Verantwortlicher">
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
          <LegalFields
            rows={[
              { label: "Name", value: `${company.owner}, ${company.name}` },
              {
                label: "Anschrift",
                value: (
                  <>
                    {company.street}, {company.postalCode} {company.city}
                  </>
                ),
              },
              { label: "Telefon", value: company.phone },
              {
                label: "E-Mail",
                value: <a href={contactLinks.mail}>{company.email}</a>,
              },
            ]}
          />
        </LegalSection>

        <LegalSection title="2. Ihre Rechte">
          <p>
            Sie haben im Rahmen der DSGVO jederzeit das Recht auf Auskunft
            über Ihre gespeicherten personenbezogenen Daten, deren Herkunft
            und Empfänger sowie den Zweck der Datenverarbeitung. Ihnen steht
            außerdem ein Recht auf Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die
            Verarbeitung zu. Erteilte Einwilligungen können Sie jederzeit mit
            Wirkung für die Zukunft widerrufen. Sie haben zudem das Recht,
            sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
          </p>
          <p>Zuständige Aufsichtsbehörde für Bayern:</p>
          <p>
            Bayerisches Landesamt für Datenschutzaufsicht (BayLDA),{" "}
            <a
              href="https://www.lda.bayern.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.lda.bayern.de
            </a>
          </p>
        </LegalSection>

        <LegalSection title="3. Kontaktformular">
          <p>
            Wenn Sie uns über das Kontaktformular eine Anfrage senden, werden
            Ihre Angaben aus dem Formular — Name, E-Mail-Adresse, optional
            Telefonnummer und Ihre Nachricht — zur Bearbeitung Ihrer Anfrage
            bei uns gespeichert. Die Verarbeitung erfolgt auf Grundlage Ihrer
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie zur Bearbeitung
            Ihrer Anfrage bzw. Anbahnung eines Vertrags (Art. 6 Abs. 1 lit. b
            DSGVO). Die Daten werden gelöscht, sobald sie für die Bearbeitung
            nicht mehr erforderlich sind, spätestens nach Ablauf
            gesetzlicher Aufbewahrungsfristen.
          </p>
          <p>
            Die technische Anbindung des Formulars soll über Supabase
            erfolgen, siehe Abschnitt 7.
          </p>
        </LegalSection>

        <LegalSection title="4. Direktkontakt per WhatsApp">
          <p>
            Wir bieten auf dieser Website einen Button an, der einen Chat mit
            uns über WhatsApp öffnet. Beim Anklicken wird die WhatsApp-App
            oder WhatsApp Web mit unserer Nummer ({company.phone}) geöffnet —
            es findet dabei kein automatischer Datenabgleich mit unserer
            Website statt. Erst wenn Sie tatsächlich eine Nachricht über
            WhatsApp senden, verarbeitet der Anbieter WhatsApp Ireland
            Limited (Teil von Meta) Ihre Daten gemäß dessen eigener
            Datenschutzerklärung.
          </p>
        </LegalSection>

        <LegalSection title="5. Verlinkung zu Instagram">
          <p>
            Wir verlinken auf dieser Website auf unser Instagram-Profil. Es
            handelt sich um einen einfachen Link, keine Einbindung
            (Embedding) von Instagram-Inhalten auf unserer Seite. Erst wenn
            Sie diesem Link folgen, verlassen Sie unsere Website und es
            gelten die Datenschutzbestimmungen von Instagram/Meta Platforms
            Ireland Limited.
          </p>
        </LegalSection>

        <LegalSection title="6. Kundenbewertungen">
          <p>
            Wenn Sie über das Bewertungsformular eine Bewertung abgeben,
            verarbeiten wir die von Ihnen eingegebenen Daten: Anzeigename,
            E-Mail-Adresse, Sternebewertung und Bewertungstext. Die
            Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6
            Abs. 1 lit. a DSGVO) durch aktives Absenden des Formulars.
          </p>
          <p>
            <strong>Ihre E-Mail-Adresse wird niemals öffentlich angezeigt.</strong>{" "}
            Sie dient ausschließlich der internen Zuordnung und
            gegebenenfalls einer Rückfrage durch uns.
          </p>
          <p>
            Neu abgegebene Bewertungen werden nicht automatisch
            veröffentlicht. Sie werden zunächst gespeichert und erscheinen
            im internen Verwaltungsbereich, wo wir sie prüfen und entweder
            freigeben oder ablehnen bzw. löschen. Nur freigegebene
            Bewertungen werden öffentlich auf der Website angezeigt. Sie
            können die Löschung Ihrer Bewertung jederzeit formlos bei uns
            beantragen.
          </p>
        </LegalSection>

        <LegalSection title="7. Supabase (Datenbank/Backend)">
          <p>
            Für die Speicherung von Kontaktanfragen und Kundenbewertungen
            soll Supabase als Datenbank- und Backend-Dienst eingesetzt
            werden. Soweit hierbei personenbezogene Daten im Auftrag
            verarbeitet werden, schließen wir mit dem Anbieter einen
            Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
          </p>
        </LegalSection>

        <LegalSection title="8. Google Analytics (nur nach Einwilligung)">
          <p>
            Wir planen den Einsatz von Google Analytics zur anonymisierten
            Reichweitenmessung. Google Analytics wird ausschließlich dann
            geladen, wenn Sie zuvor über unseren Cookie-Hinweis aktiv
            eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO, § 25 TTDSG). Ohne
            Ihre Einwilligung wird kein Analyse-Dienst geladen und es werden
            keine entsprechenden Cookies gesetzt. Ihre Einwilligung können
            Sie jederzeit über den Cookie-Hinweis widerrufen.
          </p>
          <p>Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
        </LegalSection>

        <LegalSection title="9. Google Maps">
          <p>
            Aktuell ist auf dieser Website keine Google-Maps-Karte
            eingebunden. Sollte künftig eine interaktive Karte eingebunden
            werden, aktualisieren wir diese Datenschutzerklärung vorab und
            binden die Karte — sofern datenschutzrechtlich erforderlich —
            erst nach Ihrer Einwilligung ein.
          </p>
        </LegalSection>

        <LegalSection title="10. Cookies und Einwilligungsverwaltung">
          <p>
            Diese Website verwendet ohne Ihre Einwilligung ausschließlich
            technisch notwendige Speicherung: Ihre Auswahl im Cookie-Hinweis
            (Zustimmung oder Ablehnung nicht notwendiger Dienste wie Google
            Analytics) wird lokal in Ihrem Browser (localStorage) hinterlegt,
            damit Sie nicht bei jedem Besuch erneut gefragt werden. Nicht
            notwendige Dienste werden erst nach Ihrer aktiven Zustimmung
            geladen.
          </p>
        </LegalSection>

        <LegalSection title="11. Änderungen dieser Datenschutzerklärung">
          <p>
            Wir passen diese Datenschutzerklärung an, sobald Änderungen an
            der Website oder eingesetzten Diensten dies erforderlich machen,
            zum Beispiel bei Einführung neuer Funktionen.
          </p>
        </LegalSection>
      </LegalPage>
      <Footer />
    </>
  );
}
