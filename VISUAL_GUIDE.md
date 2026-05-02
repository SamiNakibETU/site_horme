# 🎬 VISUAL GUIDE - OÙ VONT TOUTES LES DONNÉES

Ce document montre **EXACTEMENT** où chaque bloc Sanity s'affiche sur le site.

---

## 🏠 PAGE D'ACCUEIL

```
┌─────────────────────────────────────────┐
│  [VIDÉO DE FOND] + GRAND TITRE          │ ← SECTION 1: HÉRO
│  "Cie. Horme"                           │   - heroTitle
│  "Louise Melli et..."                   │   - heroLine1
│                                         │   - heroLine2
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  [PHOTO 1]  [PHOTO 2]  [PHOTO 3]        │ ← SECTION 2: CARROUSEL
│  Photos défilantes (glissez pour voir)  │   - photos DE GROUPE uniquement!
│         ⭐ PAS DE PHOTOS SEULES ICI      │   - homeSlide.image
│                                         │   - objectFit, objectPosition
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   Le corps comme                        │ ← SECTION 3: MANIFESTO
│   💙 LANGAGE PREMIER 💙                 │   - manifestoLine1
│                                         │   - manifestoAccent (en bleu)
│   → Voir les créations                  │   - manifestoCtaLabel (lien)
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  LA COMPAGNIE                           │ ← SECTION 4: PRÉSENTATION
│                                         │   - introKicker
│  Louise Melli et Joséphine portent...   │   - introParagraph1
│  (texte long)                           │   - introParagraph2
│                                         │   - introCtaLabel (lien Présentation)
│  → Découvrir la compagnie               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  LA COMPAGNIE EN IMAGES                 │ ← SECTION 5: ENCART PHOTOS
│                                         │   - imagesSectionKicker
│  Portraits et regards: retrouvez...     │   - imagesSectionBody
│  → Présentation                         │   - imagesSectionCtaLabel
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  CRÉATIONS                              │ ← SECTION 6: CRÉATIONS
│                                         │   - creationsKicker
│  ┌──────────┐ ┌──────────┐              │
│  │ Création │ │ Création │              │
│  └──────────┘ └──────────┘              │
│                                         │
│  → Toutes les créations                 │   - creationsFooterCtaLabel
└─────────────────────────────────────────┘
```

---

## 👥 PAGE PRÉSENTATION

```
┌─────────────────────────────────────────┐
│  LA COMPAGNIE                           │ ← Titre intro
│  Cie. Horme                             │   - kicker
│                                         │   - title
│  (Texte riche avec gras, italique...)   │   - intro (blockContent)
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  LES DANSEUSES                          │ ← Titre section
│  (dancersSectionTitle)                  │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ PHOTO   │  │ PHOTO   │              │ ← PHOTOS SEULES vont ICI!
│  │ Louise  │  │ Joséphine│              │   (pas en accueil!)
│  │         │  │         │              │
│  │ Chorégr │  │ Chorégr │              │   - portrait (image)
│  │         │  │         │              │   - name
│  │ Bios... │  │ Bios... │              │   - role
│  │         │  │ Formation               │   - bio1, bio2
│  │         │  │ ...     │              │   - formationTitle, formationText
│  └─────────┘  └─────────┘              │
│                                         │
│  (Glissez pour changer l'ordre)         │
│                                         │
└─────────────────────────────────────────┘

                    ↓

│  → Voir les projets (projectsCtaLabel)  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎭 PAGE CRÉATIONS (Spectacle détaillé)

```
┌─────────────────────────────────────────┐
│  TOUT CE QUI TREMBLE                    │ ← Title, year, location
│  Performance · 2025 · Théâtre Douze     │   - type
│                                         │   - year (📅 CORRIGÉE: 2025!)
│  ┌──────────────────────────────┐       │   - location
│  │      PHOTO COUVERTURE        │       │   - coverImage
│  │   (visible aussi en liste)   │       │
│  └──────────────────────────────┘       │
│                                         │
│  Présentation du spectacle...           │   - description
│  (Texte long)                           │
│                                         │
│  Photographes: Ysé, Arthur              │   - photographer
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  GALERIE COMPLÈTE                       │ ← gallery (array of galleryItem)
│                                         │
│  [PHOTO 1] [PHOTO 2] [PHOTO 3]          │   - photo (image)
│  [PHOTO 4] [PHOTO 5] [PHOTO 6]          │   - credit (photographe)
│  [PHOTO 7] [PHOTO 8] [PHOTO 9]          │   - alt (description)
│                                         │
│  (Glissez pour changer l'ordre)         │   (Ordre = ordre d'affichage)
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           VIDÉO (optionnel)             │ ← video (file)
│        [Lecteur vidéo embedded]         │
└─────────────────────────────────────────┘
```

---

## 🔗 PAGE NAVIGATION

```
Menu en haut à droite:

    Création ▼
    ├─ Tout ce qui tremble
    │  ├─ Jardiniers Montrouge       ← trembleLinks (3 sous-liens)
    │  ├─ Regard du Cygne
    │  └─ Théâtre Douze
    ├─ Rann                            ← directLinks (3 liens sans groupe)
    ├─ Khorrmos
    └─ Bastille Design Center

Sanity champs:
- creationButtonLabel = "Création"
- trembleGroupTitle = "Tout ce qui tremble"
- trembleLinks = [Jardiniers, Regard, Théâtre]
- directLinks = [Rann, Khorrmos, Bastille]
```

---

## 📊 RÉSUMÉ: QUI VA OÙ

| Bloc Sanity | Page | Position | Important |
|-------------|------|----------|-----------|
| **heroVideo, heroTitle, heroLine1/2** | Accueil | En haut | |
| **slides** | Accueil | Carrousel | ⭐ GROUPE SEULEMENT |
| **manifestoLine1/Accent/CtaLabel** | Accueil | Bandeau bleu | |
| **introKicker/Paragraph1/2/CtaLabel** | Accueil | Section "La compagnie" | |
| **imagesSectionKicker/Body/CtaLabel** | Accueil | Petit encart | Renvoie à Présentation |
| **creationsKicker/FooterCtaLabel** | Accueil | Section spectacles | |
| **kicker, title, intro** | Présentation | Haut | |
| **dancersSectionTitle, dancers** | Présentation | Section portraits | ⭐ PHOTOS SEULES VAS ICI |
| **projectsCtaLabel** | Présentation | Bas | |
| **title, slug, type, year, location** | Création detail | Header | |
| **subtitle, photographer, description** | Création detail | Info bloc | |
| **coverImage** | Création detail + liste | Grande image | Important pour visibilité |
| **gallery** | Création detail | Galerie | ⭐ ORDRE = ordre affichage |
| **video** | Création detail | Bas | Optionnel |
| **Navigation fields** | Menu haut | Coins | Donne structure menu |

---

## ✅ CHECKLIST INTUITIVITÉ

- ✅ Chaque section de la page accueil est numérotée (1️⃣ 2️⃣ 3️⃣...)
- ✅ Descriptions disent EXACTEMENT ce qui s'affiche et où
- ✅ Photos de groupe = accueil carrousel
- ✅ Photos de personnes seules = présentation portraits
- ✅ Galeries = ordre qu'on voit sur le site
- ✅ Liens clairs sur où ça renvoie
- ✅ Formats photos spécifiés (taille, format)
- ✅ Crédit photos partout où nécessaire

---

**C'est beaucoup plus clair maintenant! 🎉**
