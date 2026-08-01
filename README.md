# Site Cie. Horme

Next.js 14 (App Router) + Sanity. Le CMS est **embarqué dans le site**, sur la
route `/studio` — il n’y a qu’une application et qu’un déploiement.

Guide destiné à l’équipe de la compagnie : [GUIDE-CMS.md](./GUIDE-CMS.md).

## Développement local

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev
```

- Site : http://localhost:3000
- CMS : http://localhost:3000/studio

## Structure

```
app/(site)/     Pages publiques. Le route group porte Navbar, Footer,
                animations et globals.css.
app/studio/     Le CMS. Hors du route group, donc sans le chrome du site.
app/layout.tsx  Layout racine, volontairement minimal (html/body).
sanity/         Schémas et structure du Studio — source de vérité unique.
sanity.config.ts, sanity.cli.ts   Config du Studio, à la racine.
lib/            Requêtes GROQ, types, valeurs par défaut.
```

Les valeurs de `lib/cms.defaults.ts` s’affichent quand un champ Sanity est vide :
le site ne présente donc jamais de trou, même sur un dataset neuf.

## Aperçu en direct (Presentation / Visual Editing)

Le Studio affiche le site dans une iframe et rend chaque texte cliquable pour
ouvrir le champ correspondant. Deux conditions techniques :

1. `SANITY_API_READ_TOKEN` doit être défini — sans lui, pas de lecture des
   brouillons, donc pas d’aperçu.
2. `lib/sanity.fetch.ts` active `stega`, qui encode l’identifiant du champ dans
   le texte via des caractères invisibles. C’est ce qui permet aux surcouches
   cliquables de savoir quel texte vient de quel champ.

L’URL d’aperçu n’est pas configurée : Sanity utilise `location.origin`, et comme
le Studio est embarqué, l’aperçu vise automatiquement le bon domaine en local
comme en production.

`STEGA_EXCLUDED`, dans le même fichier, liste les champs à ne jamais encoder
(slugs, URLs, e-mails) : un caractère invisible y casserait la valeur.

## Déploiement

Vercel, racine du repo. Variables d’environnement à définir en Production :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `sv32cak7` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | Lecture des brouillons (aperçu) |
| `SANITY_API_WRITE_TOKEN` | Scripts de seed uniquement |
| `SANITY_REVALIDATE_SECRET` | Partagé avec le webhook Sanity |

Webhook Sanity : `POST https://<domaine>/api/revalidate` avec ce secret, pour
purger le cache Next après publication.

**Attention** aux URLs de déploiement Vercel du type
`site-horme-<hash>-<org>.vercel.app` : elles sont protégées par
l’authentification Vercel et inaccessibles à la compagnie. L’URL à communiquer
est le domaine de production, `site-horme.vercel.app`.

## Points connus

- La perspective `previewDrafts` est dépréciée au profit de `drafts`. La bascule
  demande de monter `apiVersion` dans `lib/sanity.fetch.ts`.
- `sanity-plugin-media` a été retiré : sa distribution ESM est incompatible avec
  le bundler de Next 14. Le sélecteur d’assets natif de Sanity le remplace.
- Les documents singletons ne peuvent être ni supprimés ni dupliqués depuis le
  Studio (voir `SINGLETON_TYPES` dans `sanity.config.ts`) : leurs IDs sont
  codés en dur dans les requêtes.

## Secrets

Ne jamais committer `.env.local` ni aucun fichier contenant des tokens.
