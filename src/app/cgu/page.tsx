import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation (CGU)",
  description: "Conditions générales d'utilisation du site Web Difference",
};

export default function CGUPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-8">Conditions générales d'utilisation (CGU)</h1>

        <p className="text-white/80 mb-8">
          Les présentes Conditions Générales d'Utilisation (ci-après les « CGU ») ont pour objet de définir les modalités d'accès et d'utilisation du site <strong>Web Difference</strong>.
        </p>

        <p className="text-white/80 mb-8">
          En naviguant sur le site, l'utilisateur reconnaît avoir pris connaissance des présentes CGU et les accepter sans réserve.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">1. Objet du site</h2>
          <p className="text-white/90">
            Le site Web Difference a pour vocation de présenter les services proposés par l'agence, ses réalisations, ses contenus informatifs (guides, articles) ainsi que de permettre la prise de contact ou de rendez-vous.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">2. Accès au site</h2>
          <p className="text-white/90 mb-4">
            Le site est accessible gratuitement à tout utilisateur disposant d'un accès à internet.
          </p>
          <p className="text-white/90">
            Web Difference se réserve le droit de suspendre, limiter ou interrompre l'accès au site, notamment pour des raisons de maintenance, de mise à jour ou pour tout autre motif technique, sans préavis.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">3. Utilisation du site</h2>
          <p className="text-white/90 mb-4">
            L'utilisateur s'engage à utiliser le site de manière loyale, licite et conforme à sa destination.
          </p>
          <p className="text-white/90 mb-4">
            Il est strictement interdit de :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Porter atteinte au bon fonctionnement du site</li>
            <li>Utiliser le site à des fins frauduleuses, malveillantes ou illicites</li>
            <li>Tenter d'accéder à des données ou systèmes non autorisés</li>
            <li>Copier, reproduire ou exploiter tout ou partie du site sans autorisation</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">4. Responsabilité de l'utilisateur</h2>
          <p className="text-white/90 mb-4">
            L'utilisateur est seul responsable de l'utilisation qu'il fait des informations disponibles sur le site.
          </p>
          <p className="text-white/90">
            Il lui appartient de vérifier l'adéquation des services proposés à ses besoins avant toute prise de décision ou engagement contractuel.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">5. Responsabilité de Web Difference</h2>
          <p className="text-white/90 mb-4">
            Web Difference s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, aucune garantie n'est apportée quant à leur exhaustivité ou leur actualité.
          </p>
          <p className="text-white/90 mb-4">
            Web Difference ne saurait être tenue responsable :
          </p>
          <ul className="text-white/90 space-y-2 list-disc list-inside">
            <li>Des interruptions ou dysfonctionnements du site</li>
            <li>Des dommages indirects résultant de l'utilisation du site</li>
            <li>De l'utilisation faite par l'utilisateur des informations disponibles</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">6. Propriété intellectuelle</h2>
          <p className="text-white/90 mb-4">
            L'ensemble du site, incluant notamment les contenus, textes, images, graphismes, logos, icônes, animations, vidéos et bases de données, est protégé par le Code de la propriété intellectuelle.
          </p>
          <p className="text-white/90">
            Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable de Web Difference est strictement interdite.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">7. Liens hypertextes</h2>
          <p className="text-white/90 mb-4">
            Le site peut contenir des liens hypertextes vers des sites tiers.
          </p>
          <p className="text-white/90">
            Web Difference n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou fonctionnement.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">8. Données personnelles</h2>
          <p className="text-white/90">
            L'utilisation du site implique la collecte et le traitement de certaines données personnelles, conformément à la <a href="/politique-de-confidentialite" className="text-[#71DDAE] hover:underline font-semibold">Politique de confidentialité</a> accessible sur le site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">9. Cookies</h2>
          <p className="text-white/90 mb-4">
            Le site peut utiliser des cookies ou traceurs nécessaires à son fonctionnement et à la mesure de son audience.
          </p>
          <p className="text-white/90">
            Lorsque la réglementation l'exige, le consentement de l'utilisateur est recueilli avant tout dépôt de cookies non essentiels.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">10. Modification des CGU</h2>
          <p className="text-white/90 mb-4">
            Web Difference se réserve le droit de modifier les présentes CGU à tout moment.
          </p>
          <p className="text-white/90">
            La version applicable est celle en vigueur lors de la navigation sur le site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">11. Droit applicable</h2>
          <p className="text-white/90 mb-4">
            Les présentes CGU sont régies par le droit français.
          </p>
          <p className="text-white/90">
            Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux français.
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Web Difference. Tous droits réservés.</p>
        </footer>
      </article>
    </div>
  );
}



