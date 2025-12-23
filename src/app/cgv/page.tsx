import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente (CGV)",
  description: "Conditions générales de vente de Web Difference",
};

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-8">Conditions générales de vente (CGV)</h1>

        <p className="text-white/80 mb-8">
          Les présentes Conditions Générales de Vente (ci-après les « CGV ») régissent l'ensemble des prestations de services proposées par <strong>Web Difference</strong>, entreprise individuelle, dans le cadre de son activité d'agence digitale.
        </p>

        <p className="text-white/80 mb-8">
          Toute commande implique l'acceptation sans réserve des présentes CGV par le client.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">1. Identification du prestataire</h2>
          <div className="space-y-2 text-white/90">
            <p className="font-semibold text-white">Web Difference</p>
            <p>Entreprise individuelle</p>
            <p>Responsable : <strong>Tristan Wehrlé</strong></p>
            <div className="mt-4 space-y-1">
              <p>📍 Adresse : <strong>7 rue Valette, 75005 Paris, France</strong></p>
              <p>📧 Email : <a href="mailto:contact@webdifference.fr" className="text-[#71DDAE] hover:underline font-semibold">contact@webdifference.fr</a></p>
              <p>SIREN : <strong>939 093 068</strong></p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">2. Champ d'application</h2>
          <p className="text-white/90 mb-4">
            Les présentes CGV s'appliquent à toutes les prestations fournies par Web Difference, notamment :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Création ou refonte de sites internet</li>
            <li>Développement d'applications web ou mobiles</li>
            <li>Prestations de design, UX/UI</li>
            <li>Optimisation SEO</li>
            <li>Automatisation, intégration d'outils, maintenance</li>
          </ul>
          <p className="text-white/90 mt-4">
            Elles prévalent sur tout autre document ou condition du client.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">3. Commande et contractualisation</h2>
          <p className="text-white/90 mb-4">
            Toute prestation fait l'objet :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Soit d'un <strong>devis écrit</strong></li>
            <li>Soit d'une <strong>proposition commerciale</strong> validée par le client</li>
          </ul>
          <p className="text-white/90 mt-4 mb-4">
            La commande est réputée ferme et définitive après :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Validation écrite du devis</li>
            <li>Et, le cas échéant, versement d'un acompte</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">4. Tarifs</h2>
          <p className="text-white/90 mb-4">
            Les prix sont exprimés en euros (€), hors taxes.
          </p>
          <p className="text-white/90 mb-4">
            Web Difference étant soumise au régime de la <strong>franchise en base de TVA</strong> (article 293B du CGI), la TVA n'est pas applicable.
          </p>
          <p className="text-white/90">
            Les tarifs peuvent être forfaitaires ou calculés sur devis selon la nature et la complexité du projet.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">5. Modalités de paiement</h2>
          <p className="text-white/90 mb-4">
            Sauf mention contraire :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li><strong>Acompte de 50 %</strong> à la commande</li>
            <li><strong>Solde à la livraison</strong> ou selon l'échéancier défini</li>
          </ul>
          <p className="text-white/90 mt-4 mb-4">
            Les paiements s'effectuent par virement bancaire ou tout autre moyen accepté.
          </p>
          <p className="text-white/90 mb-4">
            Tout retard de paiement entraîne, de plein droit :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Des pénalités de retard calculées sur la base du taux légal en vigueur</li>
            <li>Une indemnité forfaitaire pour frais de recouvrement de <strong>40 €</strong> (article L441-10 du Code de commerce)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">6. Délais de réalisation</h2>
          <p className="text-white/90 mb-4">
            Les délais indiqués sont donnés à titre indicatif.
          </p>
          <p className="text-white/90 mb-4">
            Web Difference ne saurait être tenue responsable d'un retard résultant :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>D'un manque de collaboration du client</li>
            <li>De retards de validation</li>
            <li>De la non-fourniture des contenus nécessaires</li>
          </ul>
          <p className="text-white/90 mt-4">
            Tout délai est automatiquement prolongé en conséquence.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">7. Obligations du client</h2>
          <p className="text-white/90 mb-4">
            Le client s'engage à :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Fournir des informations exactes et complètes</li>
            <li>Transmettre les contenus nécessaires dans les délais convenus</li>
            <li>Disposer des droits sur les éléments fournis (textes, images, logos, etc.)</li>
          </ul>
          <p className="text-white/90 mt-4">
            Le client est seul responsable des contenus diffusés sur son site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">8. Propriété intellectuelle</h2>
          <p className="text-white/90 mb-4">
            Sauf mention contraire, la propriété intellectuelle des livrables est transférée au client <strong>après paiement intégral</strong> des sommes dues.
          </p>
          <p className="text-white/90">
            Web Difference se réserve le droit de mentionner le projet dans ses références commerciales, sauf opposition écrite du client.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">9. Maintenance et évolutions</h2>
          <p className="text-white/90 mb-4">
            Toute prestation de maintenance ou d'évolution fait l'objet d'un devis ou d'un contrat distinct.
          </p>
          <p className="text-white/90 mb-4">
            Web Difference n'est pas responsable des dysfonctionnements résultant :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>D'interventions tierces</li>
            <li>De mises à jour externes</li>
            <li>D'une mauvaise utilisation par le client</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">10. Responsabilité</h2>
          <p className="text-white/90 mb-4">
            La responsabilité de Web Difference est strictement limitée au montant total payé par le client pour la prestation concernée.
          </p>
          <p className="text-white/90">
            En aucun cas, Web Difference ne pourra être tenue responsable de dommages indirects, pertes de chiffre d'affaires, de données ou d'exploitation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">11. Résiliation</h2>
          <p className="text-white/90 mb-4">
            En cas de résiliation anticipée à l'initiative du client :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Les sommes déjà versées restent acquises</li>
            <li>Les prestations réalisées sont dues</li>
          </ul>
          <p className="text-white/90 mt-4">
            Toute prestation engagée mais non encore facturée pourra l'être au prorata.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">12. Force majeure</h2>
          <p className="text-white/90">
            Web Difference ne saurait être tenue responsable en cas de force majeure telle que définie par la jurisprudence française.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">13. Données personnelles</h2>
          <p className="text-white/90">
            Les données personnelles sont traitées conformément à la <a href="/politique-de-confidentialite" className="text-[#71DDAE] hover:underline font-semibold">Politique de confidentialité</a> accessible sur le site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">14. Droit applicable et juridiction compétente</h2>
          <p className="text-white/90 mb-4">
            Les présentes CGV sont régies par le droit français.
          </p>
          <p className="text-white/90">
            Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux français.
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Web Difference. Tous droits réservés.</p>
        </footer>
      </article>
    </div>
  );
}

