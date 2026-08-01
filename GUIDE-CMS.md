# Modifier le site — mode d’emploi

Ce guide s’adresse à l’équipe de la Cie. Horme. Aucune connaissance technique
n’est nécessaire.

---

## Se connecter

Adresse du CMS : **https://site-horme.vercel.app/studio**

Connectez-vous avec l’adresse e-mail invitée sur le projet Sanity. Mettez cette
page en favori : c’est le seul lien à retenir.

Le site public, celui que voient les visiteurs, est à l’adresse
**https://site-horme.vercel.app**.

---

## La règle la plus importante

Une modification n’apparaît sur le site **qu’après avoir cliqué sur `Publier`**,
en bas de l’écran.

Tant que vous n’avez pas publié, votre travail est enregistré comme *brouillon* :
vous pouvez fermer l’onglet, revenir demain, rien n’est perdu, et **rien n’est
visible par les visiteurs**. Vous ne risquez donc jamais de « casser » le site en
tapant du texte.

---

## Voir ses modifications en direct

C’est la fonction la plus utile du CMS.

1. Dans le menu de gauche, cliquez sur **Presentation** (icône œil).
2. Le site s’affiche à droite, votre contenu à gauche.
3. **Cliquez directement sur un texte dans le site** : le champ correspondant
   s’ouvre à gauche, en surbrillance.

C’est la réponse à « où est-ce que ça modifie sur le site ? » : au lieu de
chercher le bon champ, vous cliquez sur ce que vous voulez changer.

L’aperçu affiche vos brouillons non publiés. Ce que vous y voyez n’est donc pas
encore en ligne.

---

## Ce que vous pouvez modifier

Le menu de gauche suit la structure du site.

### 📄 Pages principales

| Page | Contenu |
|---|---|
| 🏠 **Accueil** | Vidéo de fond, grand titre, carrousel de photos, texte de présentation |
| 👥 **Présentation** | Texte d’intro et fiches des danseuses (portrait, bio, formation) |
| ✉️ **Contact** | E-mail, lieu, libellés |

La page Accueil est découpée en 6 onglets numérotés, dans l’ordre où les
sections apparaissent sur le site : Héro, Carrousel, Manifesto, Présentation,
Encart photos, Créations.

### 🎭 Créations

Une fiche par spectacle. Bouton `+` pour en créer une, clic sur une fiche
existante pour la modifier.

Pour qu’une création apparaisse correctement, remplissez au minimum : titre,
type, année et image de couverture.

### ⚙️ Configuration du site

Le menu de navigation, le pied de page, et le référencement (titre et
description affichés dans Google).

---

## Les photos

**Réordonner** — attrapez la poignée `⋮⋮` à gauche d’une photo et glissez-la.
L’ordre dans la liste est l’ordre sur le site.

**Recadrage** — après avoir envoyé une image, cliquez dessus puis sur l’onglet
de recadrage, et placez le point du *hotspot* sur le sujet important. Le site
affiche la même photo à des formats différents selon l’écran ; ce point garantit
que le sujet reste visible partout.

**Description** — le champ « Description de la photo » sert aux personnes
malvoyantes et à Google. Une phrase courte suffit : *« Les cinq danseuses en
cercle »*. Si vous l’oubliez, le CMS affiche un avertissement orange, mais vous
laisse publier.

**Formats conseillés** — carrousel d’accueil : paysage, 1920 px de large
minimum. Galeries de créations : 1200 px minimum. Portraits : carré, 800 px
minimum.

---

## Messages du CMS

| Couleur | Sens |
|---|---|
| 🔴 Rouge | Champ obligatoire manquant. La publication est bloquée. |
| 🟠 Orange | Recommandation. Vous pouvez publier quand même. |

---

## En cas de doute

**« J’ai fait une bêtise »** — chaque document possède un historique. Ouvrez le
menu `⋯` en haut à droite, puis l’historique des révisions, et restaurez une
version antérieure. Rien n’est jamais définitivement perdu.

**« Ma modification n’apparaît pas sur le site »** — vérifiez d’abord que vous
avez cliqué sur `Publier`. Le site se met ensuite à jour en une minute environ ;
actualisez la page avec `Ctrl + F5`.

**« Je ne peux pas supprimer la page d’accueil »** — c’est volontaire. Les pages
uniques (Accueil, Présentation, Contact, Navigation, Pied de page, SEO) ne
peuvent être ni supprimées ni dupliquées, pour éviter un accident irréversible.
Vous pouvez en revanche vider leur contenu.
