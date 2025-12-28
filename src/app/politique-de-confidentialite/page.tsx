import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site Web Difference",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-8">Politique de confidentialité</h1>

        <p className="text-white/80 mb-8">
          La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site <strong>Web Difference</strong> des modalités de collecte, d'utilisation et de protection de leurs données personnelles, conformément au Règlement (UE) 2016/679 du 27 avril 2016 relatif à la protection des données à caractère personnel (RGPD) et à la loi Informatique et Libertés modifiée.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Responsable du traitement</h2>
          <p className="text-white/90 mb-4">Le responsable du traitement des données personnelles est :</p>
          <div className="space-y-2 text-white/90">
            <p className="font-semibold text-white">Web Difference</p>
            <p>Entreprise individuelle</p>
            <p>Responsable : <strong>Tristan Wehrlé</strong></p>
            <div className="mt-4 space-y-1">
              <p>📍 Adresse : <strong>7 rue Valette, 75005 Paris, France</strong></p>
              <p>📧 Email : <a href="mailto:contact@webdifference.fr" className="text-[#71DDAE] hover:underline font-semibold">contact@webdifference.fr</a></p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Données personnelles collectées</h2>
          <p className="text-white/90 mb-4">
            Les données susceptibles d'être collectées sur le site sont strictement limitées à ce qui est nécessaire, notamment :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Adresse email (formulaire de contact ou d'inscription à la newsletter)</li>
            <li>Nom et prénom (le cas échéant)</li>
            <li>Numéro de téléphone (lors de la prise de contact ou de rendez-vous)</li>
            <li>Données de navigation (pages consultées, interactions, adresse IP anonymisée)</li>
          </ul>
          <p className="text-white/90 mt-4">
            Aucune donnée sensible n'est collectée.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Finalités du traitement</h2>
          <p className="text-white/90 mb-4">
            Les données personnelles sont collectées pour les finalités suivantes :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Répondre aux demandes envoyées via les formulaires du site</li>
            <li>Gérer la prise de rendez-vous et les échanges commerciaux</li>
            <li>Envoyer des communications informatives ou marketing (guides, actualités), uniquement avec le consentement de l'utilisateur</li>
            <li>Améliorer l'expérience utilisateur et les performances du site</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Base légale du traitement</h2>
          <p className="text-white/90 mb-4">
            Les traitements de données reposent sur :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Le consentement explicite de l'utilisateur</li>
            <li>L'exécution de mesures précontractuelles ou contractuelles</li>
            <li>L'intérêt légitime de Web Difference à améliorer ses services et sa communication</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Durée de conservation</h2>
          <p className="text-white/90 mb-4">
            Les données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Données de contact : <strong>3 ans</strong> après le dernier échange</li>
            <li>Données de prospection commerciale : <strong>3 ans</strong> à compter du dernier contact</li>
            <li>Données techniques et statistiques : <strong>13 mois maximum</strong></li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Destinataires des données</h2>
          <p className="text-white/90 mb-4">
            Les données personnelles sont destinées exclusivement à <strong>Web Difference</strong>.
          </p>
          <p className="text-white/90 mb-4">
            Elles peuvent toutefois être traitées par des prestataires techniques agissant en tant que sous-traitants, notamment :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Outils de prise de rendez-vous (ex. Calendly)</li>
            <li>Hébergement et infrastructure (ex. Vercel)</li>
            <li>Outils d'analyse de performance et de suivi</li>
          </ul>
          <p className="text-white/90 mt-4">
            Ces prestataires sont contractuellement tenus de respecter la confidentialité et la sécurité des données.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Transferts hors Union européenne</h2>
          <p className="text-white/90">
            Certaines données peuvent être hébergées ou traitées en dehors de l'Union européenne, notamment via des prestataires situés aux États-Unis.
          </p>
          <p className="text-white/90 mt-4">
            Dans ce cas, Web Difference s'assure que ces transferts sont encadrés par des garanties appropriées conformément au RGPD (clauses contractuelles types, mesures de sécurité renforcées).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Sécurité des données</h2>
          <p className="text-white/90">
            Web Difference met en œuvre toutes les mesures techniques et organisationnelles appropriées afin de garantir la sécurité, l'intégrité et la confidentialité des données personnelles et d'empêcher tout accès non autorisé, perte ou divulgation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Droits des utilisateurs</h2>
          <p className="text-white/90 mb-4">
            Conformément au RGPD, chaque utilisateur dispose des droits suivants :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Droit d'accès</li>
            <li>Droit de rectification</li>
            <li>Droit d'effacement</li>
            <li>Droit d'opposition</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>
          <p className="text-white/90 mt-4">
            Toute demande peut être adressée par email à <a href="mailto:contact@webdifference.fr" className="text-[#71DDAE] hover:underline font-semibold">contact@webdifference.fr</a>.
          </p>
          <p className="text-white/90 mt-2">
            Une réponse sera apportée dans un délai maximum de <strong>30 jours</strong>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Cookies</h2>
          <p className="text-white/90 mb-4">
            Le site peut utiliser des cookies ou traceurs nécessaires à son bon fonctionnement et à l'analyse de son audience.
          </p>
          <p className="text-white/90">
            Lorsque requis par la réglementation, le consentement de l'utilisateur est demandé avant le dépôt de cookies non essentiels.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Modification de la politique</h2>
          <p className="text-white/90">
            Web Difference se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de garantir sa conformité avec le droit en vigueur.
          </p>
          <p className="text-white/90 mt-4">
            La version en vigueur est celle publiée sur le site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Droit applicable</h2>
          <p className="text-white/90 mb-4">
            La présente politique de confidentialité est régie par le droit français.
          </p>
          <p className="text-white/90">
            En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-white/10 space-y-2">
          <p className="text-white/60 text-sm">Dernière mise à jour : <strong>{new Date().getFullYear()}</strong></p>
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Web Difference. Tous droits réservés.</p>
        </footer>
      </article>
    </div>
  );
}






