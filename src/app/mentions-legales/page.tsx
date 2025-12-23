import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Web Difference",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-8">Mentions légales</h1>

        <p className="text-white/80 mb-8">
          Conformément aux dispositions des articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN), il est porté à la connaissance des utilisateurs du présent site les informations suivantes :
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Éditeur du site</h2>
          <div className="space-y-2 text-white/90">
            <p className="font-semibold text-white">Web Difference</p>
            <p>Entreprise individuelle</p>
            <p className="mt-2">Responsable de la publication : Tristan Wehrlé</p>
            <div className="mt-4 space-y-1">
              <p>📍 Adresse : 7 rue Valette, 75005 Paris, France</p>
              <p>📧 Email : <a href="mailto:contact@webdifference.fr" className="text-[#71DDAE] hover:underline">contact@webdifference.fr</a></p>
              <p>📞 Téléphone : <a href="tel:+33638723038" className="text-[#71DDAE] hover:underline">06 38 72 30 38</a></p>
            </div>
            <div className="mt-4 space-y-1 text-sm">
              <p>SIREN : 939 093 068</p>
              <p>Immatriculé au Registre National des Entreprises (INPI)</p>
              <p>Code APE : 62.01Z</p>
              <p>TVA intracommunautaire : non applicable, article 293B du Code général des impôts</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Hébergement</h2>
          <p className="text-white/90 mb-2">Le site est hébergé par :</p>
          <div className="text-white/90">
            <p className="font-semibold text-white">Vercel Inc.</p>
            <p>440 N Barranca Ave #4133</p>
            <p>Covina, CA 91723 – États-Unis</p>
            <p>🌐 <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#71DDAE] hover:underline">https://vercel.com</a></p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Conception et développement</h2>
          <p className="text-white/90">
            Le présent site a été conçu et développé par Web Difference, agence digitale spécialisée dans la création de solutions web sur mesure, l'optimisation de la performance digitale et l'accompagnement stratégique des entreprises.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Propriété intellectuelle</h2>
          <p className="text-white/90 mb-4">
            L'ensemble du site, y compris sa structure, ses textes, images, graphismes, logos, icônes, vidéos, animations, bases de données et contenus, est protégé par le Code de la propriété intellectuelle et demeure la propriété exclusive de Web Difference, sauf mention contraire.
          </p>
          <p className="text-white/90">
            Toute reproduction, représentation, modification, publication, adaptation ou exploitation, totale ou partielle, de tout ou partie du site, par quelque procédé que ce soit, sans autorisation écrite préalable, est strictement interdite et constitue une contrefaçon susceptible d'engager la responsabilité civile et pénale de son auteur.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Responsabilité</h2>
          <p className="text-white/90 mb-4">
            Web Difference s'efforce de fournir sur ce site des informations aussi précises et actualisées que possible. Toutefois, l'agence ne saurait garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
          </p>
          <p className="text-white/90">
            L'utilisateur reconnaît utiliser les informations et outils disponibles sur le site sous sa responsabilité exclusive. Web Difference ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Liens hypertextes</h2>
          <p className="text-white/90">
            Le site peut contenir des liens hypertextes vers des sites tiers. Web Difference n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur politique de confidentialité ou leurs pratiques.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Données personnelles</h2>
          <p className="text-white/90 mb-4">
            La gestion des données personnelles des utilisateurs est détaillée dans la <a href="/politique-de-confidentialite" className="text-[#71DDAE] hover:underline">Politique de confidentialité</a>, accessible depuis le site.
          </p>
          <p className="text-white/90">
            Conformément au Règlement Général sur la Protection des Données (RGPD), l'utilisateur dispose de droits d'accès, de rectification, d'opposition, de limitation et de suppression des données le concernant.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#71DDAE] mb-4">Droit applicable</h2>
          <p className="text-white/90 mb-4">
            Le présent site est régi par le droit français.
          </p>
          <p className="text-white/90">
            Tout litige relatif à son utilisation sera soumis à la compétence exclusive des tribunaux français.
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Web Difference. Tous droits réservés.</p>
        </footer>
      </article>
    </div>
  );
}

