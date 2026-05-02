# 🔧 Guide de Correction des BUGS

**Important**: Ces bugs sont dans **Sanity CMS** (base de données), pas dans le code.

---

## 🚨 5 BUGS À CORRIGER

### BUG #1: ❌ Photo coupée du saut (Accueil - format portrait)

**Où**: Sanity Studio → 🏠 Accueil → Section "2️⃣ CARROUSEL"

**Action**:
```
1. Allez à: https://www.sanity.io/@oejb8sQtX/studio/tcxrb4ex9dnrfdj02clylmsn/cie-horme/structure
2. Cliquez 🏠 Accueil
3. Cherchez l'onglet "2️⃣ CARROUSEL - Photos de groupe"
4. Trouvez la photo de saut en format PORTRAIT qui est coupée
5. Cliquez le ❌ à droite pour la SUPPRIMER
6. Cliquez "Publier" en haut à droite
7. Attendez que ça dise "Publié ✅"
```

---

### BUG #2: ❌ Photo coupée "qui rigole au sol" (Présentation)

**Où**: Sanity Studio → 👥 Présentation → Section "👥 Portraits"

**Action**:
```
1. Allez à Sanity Studio
2. Cliquez 👥 Présentation
3. Allez à la section "👥 Portraits des danseuses"
4. Trouvez la photo où on rigole au sol qui est coupée
5. Supprimez cette photo (❌)
6. Cliquez "Publier"
```

---

### BUG #3: 📸 Retirer photos de personnes SEULES de l'Accueil

**Où**: Sanity Studio → 🏠 Accueil

**Action**:
```
1. Allez à Sanity Studio
2. Cliquez 🏠 Accueil
3. Section "2️⃣ CARROUSEL - Photos de groupe"
4. ⭐ IMPORTANT: Ce section doit avoir UNIQUEMENT des photos DE GROUPE
5. Cherchez les photos de personnes seules
6. Supprimez-les (❌)
7. Ces photos PEUVENT aller en 👥 Présentation → Portraits
8. Cliquez "Publier"
```

**Règle d'or**:
- ✅ Accueil = Photos de GROUPE uniquement
- ✅ Présentation = Photos de PERSONNES SEULES
- ❌ Pas de mélange!

---

### BUG #4: 📅 Corriger date Théâtre Douze (2024 → 2025)

**Où**: Sanity Studio → 🎭 CRÉATIONS

**Action**:
```
1. Allez à Sanity Studio
2. Cliquez 🎭 CRÉATIONS
3. Trouvez dans la liste: "Théâtre Douze"
4. Cliquez pour l'ouvrir
5. Trouvez le champ "📅 Année"
6. Changez: 2024 → 2025
7. Cliquez "Publier"
```

**Vérification**: Après publication, le site devrait afficher 2025 pour Théâtre Douze.

---

### BUG #5: 🗑️ Retirer section "Du studio à la scène"

**Où**: À identifier

**Action**:
```
1. Allez à Sanity Studio
2. CHERCHEZ "Du studio à la scène" (Ctrl+F)
3. Trouvez le document/section contenant ce texte
4. Supprimez-le ou enlevez le texte
5. Cliquez "Publier"
```

**Note**: Si vous ne trouvez pas, ça peut être:
- Un titre dans une page
- Un projet complet
- Une section texte quelque part

Cherchez bien!

---

## ✅ CHECKLIST CORRECTIONS

Mets une ✅ quand tu as corrigé:

- [ ] **BUG #1**: Photo coupée du saut supprimée (accueil)
- [ ] **BUG #2**: Photo coupée "qui rigole" supprimée (présentation)
- [ ] **BUG #3**: Photos de personnes seules retirées de l'accueil
- [ ] **BUG #4**: Date Théâtre Douze corrigée: 2025
- [ ] **BUG #5**: Section "Du studio à la scène" supprimée

---

## 🎯 APRÈS CHAQUE CORRECTION

**IMPORTANT**: Après CHAQUE modification, tu DOIS faire:

1. Cliquer le bouton bleu **"Publier"** en haut à droite
2. Attendre que ça dise **"Publié ✅"**
3. Attendre 30 secondes
4. Rafraîchir le site (Ctrl+F5) pour vérifier

**Si tu ne publies pas**, tes changements restent en brouillon et personne ne les verra!

---

## 🔍 VÉRIFICATION FINALE

Une fois tous les bugs corrigés, vérifie sur le site:

✅ **Accueil**: 
- Carrousel a que des photos de GROUPE
- Pas de photo de personne seule visible

✅ **Présentation**:
- Portraits sont affichés
- Pas la photo coupée "qui rigole"

✅ **Créations**:
- Théâtre Douze dit "2025" (pas 2024)
- Section "Du studio à la scène" n'existe pas

✅ **Général**:
- Tout s'affiche correctement
- Pas d'erreurs dans la console

---

## 💡 BESOIN D'AIDE?

Si tu ne trouves pas un bug:
1. Relis VISUAL_GUIDE.md (montre où tout va)
2. Utilise Ctrl+F pour chercher le texte
3. Demande au développeur si vraiment bloqué

---

**BONNE CORRECTION! 🎉**
