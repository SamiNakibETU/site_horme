# Modifier le site — mode d’emploi

Ce guide s’adresse à l’équipe de la Cie. Horme. Aucune connaissance technique
n’est nécessaire : tout se fait en cliquant, comme dans un document partagé.

---

## Se connecter

Adresse du CMS : **https://site-horme.vercel.app/studio**

Connectez-vous avec l’adresse e-mail invitée sur le projet. Mettez cette page
en favori : c’est le seul lien à retenir pour tout modifier.

Le site public, celui que voient les visiteurs, est à l’adresse
**https://site-horme.vercel.app**.

---

## La règle la plus importante

Une modification n’apparaît sur le site **qu’après avoir cliqué sur `Publier`**,
en bas de l’écran.

Tant que vous n’avez pas publié, votre travail est enregistré comme *brouillon* :
vous pouvez fermer l’onglet, revenir demain, rien n’est perdu, et **rien n’est
visible par les visiteurs**. Vous ne risquez donc jamais de « casser » le site
en tapant du texte, en essayant un réglage, ou en explorant les menus.

---

## Voir ses modifications en direct

C’est la fonction la plus utile du CMS — elle répond à « où est-ce que ça
modifie sur le site ? ».

1. Dans le menu de gauche, cliquez sur **Presentation** (icône œil).
2. Le site s’affiche à droite, votre contenu à gauche.
3. **Cliquez directement sur un texte dans le site affiché à droite** : le
   champ correspondant s’ouvre à gauche, en surbrillance.

Au lieu de chercher le bon champ dans un menu, vous cliquez sur ce que vous
voulez changer, et le CMS vous y emmène.

Cet aperçu montre vos brouillons non publiés — ce que vous y voyez n’est donc
pas encore visible par les autres tant que vous n’avez pas cliqué sur
`Publier`.

---

## Ajouter une nouvelle création

C’est l’action la plus fréquente : un nouveau spectacle, une résidence, un
événement.

1. Dans le menu de gauche, ouvrez **🎭 Créations**.
2. Cliquez sur `+` en haut à droite.
3. Remplissez, dans l’ordre :
   - **Titre** — obligatoire. Ex. « Rann », « Khormo(s) ».
   - **Type** — Festival, Performance, Événement ou Résidence. Obligatoire.
   - **Année** — obligatoire.
   - **Sous-titre**, **lieu** — facultatifs, précisent le titre.
   - **Photographes** — un nom par ligne. Sert au crédit affiché sur le site.
   - **Description** — le texte qui présente la création sur sa page.
   - **Image de couverture** — la photo affichée en aperçu partout ailleurs
     sur le site (accueil, liste des créations).
   - **Galerie complète** — les photos détaillées de la page de la création
     (voir *Ajouter des photos* ci-dessous).
   - **Vidéo** — facultative, voir *Formats de vidéo* plus bas.
4. Cliquez sur **Publier**.

**Une création sans photo reste visible**, dans une section « Sans visuel » à
part, en bas de la liste des créations — ce n’est pas une erreur, c’est voulu :
mieux vaut publier le titre et la date tout de suite, et ajouter les photos
dès qu’elles sont prêtes.

L’URL de la page (ex. `/projets/rann`) se génère automatiquement depuis le
titre. Vous pouvez la modifier si besoin, en minuscules et avec des tirets.

---

## Ajouter et organiser des photos

**Ajouter** — dans le champ « Galerie » ou « Photos du carrousel », cliquez
sur `Ajouter`, puis sélectionnez une image sur votre ordinateur.

**Réordonner** — attrapez la poignée `⋮⋮` à gauche d’une photo et glissez-la.
L’ordre dans la liste est l’ordre affiché sur le site.

**Recadrage (hotspot)** — après avoir envoyé une image, cliquez dessus puis
sur l’onglet de recadrage, et placez le point sur le sujet le plus important
de la photo (un visage, le centre d’un mouvement). Le site affiche la même
photo à des tailles différentes selon l’écran du visiteur ; ce point garantit
que le sujet reste toujours visible, quel que soit le cadrage automatique.

**Description de la photo** — sert aux personnes malvoyantes qui utilisent un
lecteur d’écran, et à Google. Une phrase courte suffit : *« Les cinq danseuses
en cercle »*. Si vous l’oubliez, le CMS affiche un avertissement orange mais
vous laisse publier quand même.

**Crédit photo** — le nom du photographe, affiché sous la photo sur le site.

**Formats conseillés** — carrousel d’accueil : format paysage, 1920 px de
large minimum. Galerie d’une création : 1200 px minimum. Portraits de la page
Présentation : format carré, 800 px minimum.

---

## Changer la vidéo de l’accueil

Le champ se trouve dans **🏠 Accueil**, onglet **1️⃣ HÉRO**.

⚠️ **Un seul point technique à connaître, important** : la vidéo doit être
exportée en **MP4 / H.264**. Une vidéo filmée directement à l’iPhone ou
exportée depuis iMovie/Final Cut est souvent dans un autre format (HEVC), qui
s’affiche très bien sur un iPhone ou un Mac mais **reste invisible pour la
plupart des visiteurs** — ceux sur Windows, sur Android, ou sur Chrome et
Firefox. Le piège est qu’on ne remarque jamais le problème en testant depuis
son propre téléphone.

Dans le doute, envoyez la vidéo à Sami pour conversion avant de l’envoyer, ou
vérifiez le format d’export de votre logiciel de montage. Poids conseillé :
moins de 5 Mo.

**Image de chargement** — juste au-dessus, remplissez aussi « Image affichée
pendant le chargement de la vidéo ». Une vidéo met quelques secondes à
arriver ; sans cette image, les visiteurs voient un écran vide en ouvrant le
site.

---

## Ce que vous pouvez modifier, page par page

### 📄 Pages principales

| Page | Contenu |
|---|---|
| 🏠 **Accueil** | Vidéo et image de chargement, grand titre, carrousel de photos, texte de présentation, phrase manifeste |
| 👥 **Présentation** | Texte d’introduction et fiches des danseuses (portrait, biographie, formation) |
| ✉️ **Contact** | E-mail, lieu, libellés des boutons |

La page Accueil est découpée en 6 onglets numérotés, dans l’ordre où les
sections apparaissent sur le site : Héro, Carrousel, Manifesto, Présentation,
Encart photos, Créations.

### 🎭 Créations

Voir *Ajouter une nouvelle création* ci-dessus. Cliquez sur une fiche
existante pour la modifier.

### ⚙️ Configuration du site

- **Menu de navigation** — un seul champ : le libellé du bouton qui mène aux
  créations (par défaut « Création »).
- **Pied de page** — les liens, le compte Instagram, l’e-mail de contact.
- **Référencement & SEO** — le titre et la description qui apparaissent dans
  Google et quand le site est partagé sur les réseaux. Voir la section
  *Référencement* ci-dessous.

---

## Référencement (SEO) et partage

Ouvrez **⚙️ Référencement & SEO** pour définir :

- **Titre** et **description** — ce que Google affiche dans ses résultats.
- **Image de partage** (« ogImage ») — la photo qui apparaît quand quelqu’un
  colle le lien du site sur Instagram, WhatsApp ou dans un e-mail. Si ce champ
  est vide, aucune image ne s’affiche : à remplir en priorité.

**Chaque création partage automatiquement sa propre photo de couverture**
quand son lien est envoyé — pas besoin de configurer quoi que ce soit pour
ça, c’est déjà fait.

---

## Messages du CMS

| Couleur | Sens |
|---|---|
| 🔴 Rouge | Champ obligatoire manquant. La publication est bloquée tant qu’il n’est pas rempli. |
| 🟠 Orange | Recommandation. Vous pouvez publier quand même. |

---

## En cas de doute

**« J’ai fait une bêtise »** — chaque document a un historique. Ouvrez le menu
`⋯` en haut à droite du document, puis l’historique des révisions, et
restaurez une version antérieure. Rien n’est jamais définitivement perdu.

**« Ma modification n’apparaît pas sur le site »** — vérifiez d’abord que vous
avez cliqué sur `Publier` (pas seulement enregistré le brouillon). Le site se
met ensuite à jour en une minute environ ; actualisez la page avec
`Ctrl + F5` (ou `Cmd + Shift + R` sur Mac) pour forcer le rechargement.

**« Je ne peux pas supprimer la page d’Accueil, de Présentation ou de
Contact »** — c’est volontaire. Ces pages existent en un seul exemplaire ; les
supprimer casserait le site sans qu’il soit possible de les recréer depuis le
Studio. Vous pouvez en revanche vider entièrement leur contenu si besoin.

**« Une création affiche une image générique »** — ça ne devrait jamais
arriver : une création sans photo n’affiche aucune image plutôt qu’une image
empruntée à une autre création. Si vous voyez ça, prévenez Sami.
