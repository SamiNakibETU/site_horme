# Site Cie. Horme (Next.js + Sanity)

## Développement local

```bash
npm install
cp .env.example .env.local
# Renseigner .env.local (sans commiter ce fichier)
npm run dev
```

Studio Sanity :

```bash
cd studio && npm install && npm run dev
```

## Déploiement Vercel

1. Importer ce dépôt sur [Vercel](https://vercel.com) — **racine du projet = la racine de ce repo** (pas de sous-dossier).
2. Variables d’environnement (Production) : reprendre les clés de `.env.example` (valeurs dans le dashboard Vercel, pas dans Git).
3. Webhook Sanity : `POST https://<ton-domaine>/api/revalidate` avec le secret `SANITY_REVALIDATE_SECRET`.

## Secrets

Ne pas committer `.env.local`, `studio/.env`, ni aucun fichier contenant des tokens.
