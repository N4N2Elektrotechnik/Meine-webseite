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
        intro="Diese Erklärung beschreibt, welche personenbezogenen Daten auf dieser Website verarbeitet werden und zu welchem Zweck."
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

        <LegalSection title="2. Hosting und Server-Logs">
          <p>
            Diese Website wird bei Netlify gehostet (Netlify, Inc., 101 2nd
            Street, San Francisco, CA 94105, USA). Beim Aufruf der Website
            verarbeitet der Hosting-Anbieter technisch bedingt Zugriffsdaten,
            insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Aufrufs, die
            aufgerufene Seite bzw. Datei, Angaben zu Browser und
            Betriebssystem sowie die übertragene Datenmenge. Die Verarbeitung
            ist erforderlich, um die Website auszuliefern und ihre Stabilität
            und Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse am sicheren und effizienten
            Betrieb der Website). Wir verwenden diese Daten nicht für
            Analyse- oder Werbezwecke.
          </p>
          <p>
            Dabei kann eine Übermittlung von Daten in die USA stattfinden.
            Netlify, Inc. gibt an, am EU-U.S. Data Privacy Framework
            teilzunehmen und für Datenübermittlungen zusätzlich die
            Standardvertragsklauseln der Europäischen Kommission zu
            verwenden. Die Verarbeitung in unserem Auftrag richtet sich nach
            dem Auftragsverarbeitungsvertrag (Data Processing Agreement) von
            Netlify, der nach Angaben von Netlify in dessen
            Nutzungsbedingungen einbezogen ist.
          </p>
          <p>
            Die Speicherdauer bestimmt Netlify nach eigenen Angaben anhand
            von Menge, Art und Sensibilität der Daten; eine feste Frist für
            Zugriffsdaten nennt Netlify nicht.
          </p>
        </LegalSection>

        <LegalSection title="3. Kontaktformular">
          <p>
            Wenn Sie uns über das Kontaktformular eine Anfrage senden,
            verarbeiten wir die Angaben aus dem Formular: Name und
            E-Mail-Adresse (Pflichtangaben), optional Ihre Telefonnummer sowie
            Ihre Nachricht (Pflichtangabe). Ohne die Pflichtangaben können wir
            Ihre Anfrage nicht bearbeiten. Die Angaben werden in unserer
            Datenbank gespeichert (Abschnitt 5) und uns zusätzlich per
            E-Mail mitgeteilt (Abschnitt 6).
          </p>
          <p>
            Zweck ist die Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Ihre
            Einwilligung, die Sie durch das Setzen des Häkchens erteilen
            (Art. 6 Abs. 1 lit. a DSGVO), sowie, soweit Ihre Anfrage auf einen
            Vertrag oder vorvertragliche Maßnahmen zielt, Art. 6 Abs. 1 lit. b
            DSGVO. Die Einwilligung können Sie jederzeit mit Wirkung für die
            Zukunft widerrufen.
          </p>
          <p>
            <strong>Speicherdauer:</strong> Kontaktanfragen löschen wir
            grundsätzlich innerhalb von 7 Tagen nach Abschluss der
            Bearbeitung, sofern die Daten nicht für einen daraus
            entstandenen Auftrag bzw. Vertrag oder wegen gesetzlicher
            Aufbewahrungspflichten weiter benötigt werden. In diesen Fällen
            speichern wir sie, bis der Zweck entfallen ist bzw. die
            Aufbewahrungspflicht endet. Das betrifft den Eintrag in der
            Datenbank ebenso wie die bei uns eingegangene
            Benachrichtigungs-E-Mail. Wir nehmen die Löschung selbst vor; eine
            automatische Löschung findet nicht statt. Beim E-Mail-Dienstleister
            Resend wird die versendete Benachrichtigung nach dessen Angaben
            30 Tage vorgehalten (Abschnitt 6).
          </p>
          <p>
            Zum Schutz vor automatisierten Anfragen enthält das Formular ein
            für Menschen unsichtbares Zusatzfeld (Honeypot). Es wird nicht
            gespeichert; ist es ausgefüllt, wird die Anfrage verworfen.
          </p>
        </LegalSection>

        <LegalSection title="4. Kundenbewertungen">
          <p>
            Wenn Sie über das Bewertungsformular eine Bewertung abgeben,
            verarbeiten wir die von Ihnen eingegebenen Daten: Anzeigename,
            E-Mail-Adresse, Sternebewertung und Bewertungstext. Die
            Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6
            Abs. 1 lit. a DSGVO) durch aktives Absenden des Formulars. Diese
            Angaben sind erforderlich, damit wir Ihre Bewertung prüfen und
            ggf. veröffentlichen können.
          </p>
          <p>
            <strong>Ihre E-Mail-Adresse wird niemals öffentlich angezeigt.</strong>{" "}
            Sie dient ausschließlich der internen Zuordnung und
            gegebenenfalls einer Rückfrage durch uns.
          </p>
          <p>
            Neu abgegebene Bewertungen werden nicht automatisch
            veröffentlicht. Sie werden zunächst in der Datenbank gespeichert
            und erscheinen im internen Verwaltungsbereich, wo wir sie prüfen
            und entweder freigeben oder ablehnen bzw. löschen. Nur
            freigegebene Bewertungen werden öffentlich angezeigt — mit
            Anzeigename, Sternebewertung und Text, und damit weltweit
            abrufbar.
          </p>
          <p>
            <strong>Speicherdauer:</strong> Abgelehnte oder nicht
            veröffentlichte Bewertungen löschen wir grundsätzlich spätestens
            nach 30 Tagen, sofern keine rechtliche Notwendigkeit zur
            weiteren Speicherung besteht. Veröffentlichte Bewertungen
            speichern wir, bis Sie die Löschung verlangen, Sie Ihre
            Einwilligung widerrufen oder wir sie löschen; die Löschung können
            Sie jederzeit formlos bei uns beantragen. Wir nehmen die Löschung
            selbst vor; eine automatische Löschung findet nicht statt.
          </p>
        </LegalSection>

        <LegalSection title="5. Datenbank (Supabase)">
          <p>
            Kontaktanfragen und Bewertungen speichern wir in einer Datenbank
            von Supabase. Unsere Website verbindet sich mit dieser Datenbank
            ausschließlich serverseitig; Ihr Browser baut keine direkte
            Verbindung zu Supabase auf. Die Datenbank ist so eingerichtet,
            dass Besucher Einträge nur einreichen, aber nicht auslesen
            können. Öffentlich lesbar ist ausschließlich die Ansicht der
            freigegebenen Bewertungen, ohne E-Mail-Adresse. Auf die
            gespeicherten Daten kann nur der Inhaber nach einem Login
            zugreifen (Abschnitt 7).
          </p>
          <p>
            Anbieter ist Supabase Pte. Ltd., 65 Chulia Street #38-02/03,
            OCBC Centre, Singapur 049513. Supabase verarbeitet die Daten in
            unserem Auftrag; der Auftragsverarbeitungsvertrag (Data
            Processing Addendum) ist nach Angaben von Supabase Bestandteil der
            Nutzungsbedingungen. Da Supabase seinen Sitz in Singapur hat,
            kann eine Übermittlung in Drittländer stattfinden; Supabase
            stützt sich dafür nach eigenen Angaben auf die
            Standardvertragsklauseln der Europäischen Kommission.
          </p>
          <p>
            Für unser Projekt ist die Region West EU (Irland, eu-west-1)
            ausgewählt. Nach Angaben von Supabase werden die Daten in der
            gewählten Region gespeichert und hauptsächlich verarbeitet,
            sofern nicht unsere Weisungen oder gesetzliche Vorgaben etwas
            anderes erfordern.
          </p>
        </LegalSection>

        <LegalSection title="6. E-Mail-Benachrichtigung (Resend)">
          <p>
            Nach dem Absenden des Kontaktformulars wird über den E-Mail-Dienst
            Resend eine Benachrichtigung an uns versendet. Sie enthält die
            von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, ggf.
            Telefonnummer und Nachricht); Ihre E-Mail-Adresse wird als
            Antwortadresse hinterlegt. Zweck ist die zeitnahe Bearbeitung
            Ihrer Anfrage; die Rechtsgrundlage entspricht Abschnitt 3.
          </p>
          <p>
            Anbieter ist Plus Five Five, Inc. (Resend), 2261 Market Street
            #5039, San Francisco, CA 94114, USA. Resend verarbeitet die Daten
            in unserem Auftrag; der Auftragsverarbeitungsvertrag (DPA) wird
            mit der Annahme der Nutzungsbedingungen verbindlich.
          </p>
          <p>
            Für unser Konto ist die Versandregion Irland (eu-west-1)
            eingerichtet. Diese Region bestimmt nach Angaben von Resend nur,
            von wo aus E-Mails versendet werden; Nachrichteninhalte,
            Zustellprotokolle und Kontodaten speichert Resend nach eigenen
            Angaben in den USA. Die Übermittlung in die USA stützt Resend nach
            eigenen Angaben auf die Standardvertragsklauseln der Europäischen
            Kommission und das EU-U.S. Data Privacy Framework. E-Mail-Inhalte
            und Protokolle werden nach Angaben von Resend 30 Tage gespeichert.
          </p>
        </LegalSection>

        <LegalSection title="7. Adminbereich (Login)">
          <p>
            Ein ausschließlich für uns bestimmter Verwaltungsbereich ist per
            Login (E-Mail und Passwort über die Authentifizierung von
            Supabase) geschützt. Für Besucher ohne Login werden dabei keine
            Cookies gesetzt. Nach einem Login setzt die Authentifizierung
            technisch notwendige Sitzungs-Cookies, die nur uns als
            Administrator betreffen (§ 25 Abs. 2 Nr. 2 TDDDG).
          </p>
        </LegalSection>

        <LegalSection title="8. Google Maps (Karte auf der Kontaktseite)">
          <p>
            Auf der Kontaktseite bieten wir eine Karte von Google Maps an.
            Sie wird <strong>nicht automatisch</strong> geladen: Zunächst
            sehen Sie nur einen Platzhalter, und vor Ihrem Klick besteht
            keine Verbindung zu Google. Erst wenn Sie auf „Google Maps
            anzeigen“ klicken, lädt Ihr Browser die Karte von Google
            (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Irland).
          </p>
          <p>
            Dabei können Daten an Google übertragen werden, insbesondere Ihre
            IP-Adresse, Angaben zu Browser und Gerät, Ihre Spracheinstellung
            und die Adresse der aufrufenden Seite. Google kann außerdem
            Informationen auf Ihrem Endgerät speichern oder auslesen.
            Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6
            Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Ihre Auswahl wird von
            uns nicht gespeichert: Mit „Karte ausblenden“ oder beim erneuten
            Laden der Seite ist die Karte wieder ausgeblendet und es besteht
            keine Verbindung mehr zu Google. Bereits übertragene Daten
            lassen sich dadurch nicht zurückholen.
          </p>
          <p>
            Die Schaltflächen „Route planen“ und „Google-Profil“ sind
            einfache Links. Erst wenn Sie sie anklicken, öffnet sich Google
            (Google Maps bzw. unser Google-Unternehmensprofil) in einem neuen
            Tab; es gelten die Datenschutzbestimmungen von Google.
          </p>
          <p>
            Dabei kann eine Übermittlung von Daten in die USA stattfinden.
            Google gibt an, dass Google LLC am EU-U.S. Data Privacy Framework
            teilnimmt und sich für Datenübermittlungen ergänzend auf
            Standardvertragsklauseln stützt.
          </p>
        </LegalSection>

        <LegalSection title="9. Direktkontakt per WhatsApp und Instagram-Link">
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
          <p>
            Wir verlinken außerdem auf unser Instagram-Profil. Es handelt
            sich um einen einfachen Link, keine Einbindung (Embedding) von
            Instagram-Inhalten auf unserer Seite. Erst wenn Sie diesem Link
            folgen, verlassen Sie unsere Website und es gelten die
            Datenschutzbestimmungen von Instagram/Meta Platforms Ireland
            Limited.
          </p>
        </LegalSection>

        <LegalSection title="10. Cookies und lokale Speicherung">
          <p>
            Unsere Website setzt für Besucher keine Cookies und speichert
            keine Daten im lokalen Speicher (localStorage/sessionStorage) Ihres
            Browsers. Wir setzen keine Analyse-, Tracking- oder
            Werbedienste ein. Ausnahmen sind ausschließlich der Login im
            Adminbereich (Abschnitt 7) und die Google-Karte nach Ihrem Klick
            (Abschnitt 8).
          </p>
        </LegalSection>

        <LegalSection title="11. Empfänger und Drittlandübermittlung">
          <p>
            Empfänger Ihrer Daten sind, soweit oben beschrieben: Netlify
            (Hosting), Supabase (Datenbank), Resend (E-Mail-Versand) und —
            nur nach Ihrem Klick — Google (Karte). Angaben zu den jeweiligen
            Anbietern, zu Drittlandübermittlungen und deren Grundlagen finden
            Sie in den Abschnitten 2, 5, 6 und 8.
          </p>
        </LegalSection>

        <LegalSection title="12. Ihre Rechte">
          <p>
            Sie haben im Rahmen der DSGVO das Recht auf Auskunft (Art. 15),
            Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
            Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20). Soweit
            wir Daten auf Grundlage berechtigter Interessen verarbeiten
            (Art. 6 Abs. 1 lit. f DSGVO, z. B. Server-Logs), können Sie
            dieser Verarbeitung aus Gründen, die sich aus Ihrer besonderen
            Situation ergeben, widersprechen (Art. 21). Erteilte
            Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft
            widerrufen (Art. 7 Abs. 3). Wenden Sie sich dafür an die oben
            genannten Kontaktdaten.
          </p>
          <p>
            Eine automatisierte Entscheidungsfindung einschließlich
            Profiling findet nicht statt.
          </p>
          <p>
            Sie haben zudem das Recht, sich bei einer
            Datenschutz-Aufsichtsbehörde zu beschweren. Zuständige
            Aufsichtsbehörde für Bayern:
          </p>
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

        <LegalSection title="13. Änderungen dieser Datenschutzerklärung">
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
