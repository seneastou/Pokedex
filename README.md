# Projet Pokédex

Ce projet est une application web construite avec React et Next.js, permettant aux utilisateurs
d'explorer et de découvrir des informations sur différents Pokémon. Chaque Pokémon est
représenté par une carte qui affiche son nom, son image, ses statistiques, et d'autres détails intéressants.

## Fonctionnalités principales

- Affichage des cartes Pokémon avec leurs images, noms et statistiques.
- Affichage des informations relatives à un pokémon lorsqu'on clique sur une carte.
- Filtrage des Pokémon par types.
- Support du mode sombre et mode clair via un bouton de bascule de thème.
- Système de pagination pour permettere à l'utilisateur de naviguer plus facilement entre les différentes pages.
- Application responsive sur les appareils mobiles et tablettes.
- Recherche d'un pokémon avec le nom et l'ID.

## Technologies utilisées

- **Next.js** : Framework React pour les applications web côté serveur et utilisation de l'app Router.
- **React** : Librairie JavaScript pour la création d'interfaces utilisateur.
- **Tailwind CSS** : framework CSS utilitaire qui permet de construire rapidement des interfaces utilisateur (UI) sans avoir à écrire du CSS personnalisé.

## Structure du projet

- **src/components/PokemonCard** : Composant de carte qui affiche les détails d'un Pokémon.
- **src/components/PokemonList** : Composant pour afficher la liste des pokémon.
- **src/components/Pagination**  : Composant pour gérer une plus grande liste de Pokémon.
- **src/context** : création d'un contexte pour le thème sombre et clair.
- **src/app/page** : Chaque page de l'application est représentée par un fichier `page.tsx`.


## Améliorations futures
- Affichage des évolutions et pré-évolutions pour chaque Pokémon.
- Implémentation des techniques d'optimisation, comme le lazy loading des images ou l'utilisation de React.memo pour éviter les re-rendu inutiles.
- Ajout d'animations lors des transitions entre les pages ou lors des interactions utilisateur.



## Auteur
- Astou SENE - Développeur
