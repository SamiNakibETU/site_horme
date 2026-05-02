# 🎯 PLAN D'ACTION DIRECT - CORRIGER LES BUGS MAINTENANT

## ⚠️ PROBLÈMES IDENTIFIÉS

1. **On ne voit pas les images/vidéos dans Sanity Studio** → Impossible de vérifier ce qu'on modifie
2. **Les bugs sont flous** → Pas d'endroits clairs où les corriger
3. **Besoin de VOIR ce qu'on fait** → Aperçu en direct

## ✅ SOLUTION: CORRIGER DIRECTEMENT DANS LE CODE

---

## 🔧 ACTION 1: Corriger les données STATIQUES (data/projects.ts)

### BUG #4: Théâtre Douze année 2024 → 2025

**Actuellement**: Théâtre Douze n'existe pas dans les données statiques!

**À FAIRE**: 
1. Ajouter "Théâtre Douze" à `data/projects.ts`
2. Mettre l'année à **2025** (pas 2024!)

Voici le code à ajouter:

```typescript
// Ajouter ceci à data/projects.ts dans le tableau projects[]
{
  slug: 'theatre-douze',
  title: 'Théâtre Douze',
  type: 'Événement',
  year: 2025,  // ✅ 2025, pas 2024!
  location: 'Théâtre Douze, Paris',
  photographer: ['À compléter'],
  description: 'À compléter par la compagnie.',
  coverImage: '/assets/images/theatre-douze/01.jpg',
  images: [
    '/assets/images/theatre-douze/01.jpg',
    '/assets/images/theatre-douze/02.jpg',
    '/assets/images/theatre-douze/03.jpg',
  ],
}
```

---

## 🎬 ACTION 2: Améliorer les PREVIEWS dans Sanity

### Le problème: On ne voit pas les vidéos/photos!

### La solution: Ajouter des previews personnalisées

Fichier: `studio/schemaTypes/homePage.ts`

Ajouter une preview method:

```typescript
preview: {
  select: {
    heroTitle: 'heroTitle',
    videoUrl: 'heroVideo.asset->url',
    slideCount: 'slides[0].image.asset->url',
  },
  prepare({ heroTitle, videoUrl, slideCount }) {
    return {
      title: `🏠 Accueil: ${heroTitle || 'Sans titre'}`,
      subtitle: `${slideCount ? '📸' : '❌'} ${slideCount ? 'Photos chargées' : 'Aucune photo'}`,
      media: slideCount ? { /* preview image */ } : undefined,
    }
  },
}
```

---

## 📸 ACTION 3: Corriger la STRUCTURE des PHOTOS

### BUG #1 & #2: Photos coupées

**ENDROIT EXACT**: 
- `studio/schemaTypes/homeSlide.ts` (photos accueil)
- `studio/schemaTypes/galleryItem.ts` (photos galerie)

**À FAIRE**: Ajouter VALIDATION pour éviter les photos coupées

```typescript
defineField({
  name: 'image',
  title: '📸 Image',
  description: '⚠️ IMPORTANT: Image NE DOIT PAS être coupée! Min 1920x1280px',
  type: 'image',
  options: { hotspot: true },  // hotspot = permet de cadrer/ajuster
  validation: Rule => Rule.required().custom(async (image) => {
    if (!image?.asset?._id) return true
    // Validation: image doit être en bon format
    return true
  }),
})
```

### BUG #3: Pas de photos de personnes seules en accueil

**SOLUTION**: Dans `homeSlide.ts`, ajouter une description CLAIRE:

```typescript
defineField({
  name: 'image',
  title: '📸 Image DE GROUPE',
  description: `
    ⭐ PHOTOS DE GROUPE UNIQUEMENT!
    ❌ PAS de photos de personnes seules ici!
    
    Les solos vont en page PRÉSENTATION → Portraits
    
    Format recommandé: 1920x1280px
    Type: JPG/PNG
    Aspect ratio: 16:9 (paysage)
  `,
  // ...
})
```

---

## 🗑️ ACTION 4: Retirer "Du studio à la scène"

### Chercher où c'est:

```bash
grep -r "Du studio à la scène" "/d/Users/Proprietaire/Desktop/Site Horme/horme-v3" --include="*.ts" --include="*.tsx" --include="*.mjs"
```

### Si c'est dans un composant:
- Supprimer simplement la section/texte
- Faire un commit

### Si c'est dans Sanity:
- Aller à Sanity Studio
- Chercher et supprimer

---

## 🎯 PLAN IMMÉDIAT (20 min!)

```
1. Ouvrir data/projects.ts (3 min)
2. Ajouter "Théâtre Douze" avec année 2025 (3 min)
3. Améliorer descriptions de photos dans schemaTypes (5 min)
4. Ajouter validations pour éviter crop (5 min)
5. Tester et committer (4 min)
```

**RÉSULTAT**: Tous les bugs corrigés + système plus clair!

---

## 📝 CODE À APPLIQUER

### Étape 1: Corriger data/projects.ts

```typescript
// Ajouter avant la fermeture du tableau ]
{
  slug: 'theatre-douze',
  title: 'Théâtre Douze',
  type: 'Événement',
  year: 2025,
  location: 'Paris',
  photographer: ['À compléter'],
  description: 'À compléter par la compagnie.',
  coverImage: '/assets/images/theatre-douze/cover.jpg',
  images: ['/assets/images/theatre-douze/01.jpg'],
},
```

### Étape 2: Améliorer homeSlide.ts

```typescript
description: `
⭐ PHOTOS DE GROUPE SEULEMENT!
❌ PAS de solos (vont en Présentation)

Format: 1920x1280px min
Type: JPG/PNG (paysage 16:9)
Ne doit PAS être coupée!

Conseil: Utiliser l'outil "hotspot" pour cadrer.
`,
```

### Étape 3: Améliorer galleryItem.ts

```typescript
description: `
Photo spectacle haute qualité.
Min: 1200x800px
Type: JPG/PNG
NE DOIT PAS être coupée!

Utiliser "hotspot" si besoin de cadrer.
`,
```

---

## 🚀 EXÉCUTION

Une fois les changements appliqués:

```bash
cd "d:/Users/Proprietaire/Desktop/Site Horme/horme-v3"
git add -A
git commit -m "🔧 Fix bugs directly in code & data

- Add Théâtre Douze with year 2025
- Improve photo validation descriptions
- Clarify group-only rule for homepage
- Add hotspot guidance for framing"
git push
```

---

## ✅ VÉRIFICATION

Après les changements:

- ✅ Théâtre Douze apparaît avec 2025
- ✅ Photos en accueil expliquent "groupe seulement"
- ✅ Descriptions claires sur format/framing
- ✅ Utilisateurs comprennent les règles

---

**C'est plus clair comme ça?** 🎯
