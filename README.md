# AssurMoi - Plateforme de Gestion de Sinistres 🚗📄

Ce projet comprend l'ensemble de l'écosystème numérique pour l'entreprise **AssurMoi**, visant à fluidifier la déclaration, la gestion et le suivi des sinistres automobiles. Le système est composé d'une API Backend complète et d'une application Frontend Web/Mobile.

---

## 🏗️ Architecture Technique

- **Backend (API)** : Node.js avec le framework Express. Il gère l'authentification (Tokens JWT + Double Facteur/MFA via Mailhog), la base de données via l'ORM Sequelize, et le traitement des fichiers joints avec multer.
- **Base de Données** : MariaDB (relationnelle).
- **Frontend (Web/Mobile)** : React Native fonctionnant sous l'écosystème Expo (Expo Router). Le design complet est propulsé par React Native Paper (Material Design 3).
- **Orchestration** : Outils gérés au travers de conteneurs isolés via Docker et Docker Compose.

---

## 🚀 Démarrage Rapide (Mode Docker)

L'intégralité du projet peut être lancée simultanément grâce à Docker Compose.

1.  Ouvrez un terminal WSL / Linux et placez-vous à la racine du projet (`/RenforcementBackend`).
2.  Assurez-vous qu'aucun autre service n'utilise les ports **3000** (Node), **8081** (Expo), ou **3306** (MariaDB).
3.  Exécutez la commande suivante :

```bash
docker compose up --build
```

Vos services seront disponibles :
- **Application Front-End** : http://127.0.0.1:8081
- **API (Back-End)** : http://127.0.0.1:3000
- **Adminer (Client DB)** : http://127.0.0.1:8080
- **MailHog (Boîte de réception pour le MFA)** : http://127.0.0.1:8025

---

## ⚠️ TRÈS IMPORTANT : Configuration Réseau et Résolution d'URLs

L'écosystème de développement moderne, particulièrement avec Google Chrome sous Windows / WSL, est très capricieux sur la gestion du mode "hors-ligne". S'il vous arrive de tester le projet sans connexion WiFi active, vous devez impérativement configurer le projet selon ces meilleures pratiques.

### 🛑 Le piège du mot-clé `localhost` et de ngrok
Beaucoup de nouveaux déploiements lient initialement Expo vers un tunnel `ngrok`, ou utilisent l'URL `http://localhost:3000`. 
Or, lorsque votre ordinateur subit une micro-coupure internet, ou que le réseau local se désactive :
- Un tunnel externe (ngrok) s'effondrera totalement.
- En interne, le navigateur Chrome sous Windows lance une alarme de réseau inactif. Ce blocage brutal empêche le navigateur de résoudre le traditionnel mot magique `localhost`, entraînant une erreur `net::ERR_INTERNET_DISCONNECTED` immédiate.

### ✅ La solution ultime : L'adresse IP native de boucle locale (`127.0.0.1`)
Tous les problèmes ci-dessus peuvent être évités si votre machine fonctionne avec ses adresses IPv4 brutes. Lorsque votre Docker Compose tourne, **vous n'avez absolument pas besoin de Ngrok**. Les services se parlent en local.

1. Ne tapez jamais `http://localhost:8081` dans votre navigateur Web, mais **`http://127.0.0.1:8081`**.
2. Dans le code applicatif (Frontend), toutes les configurations de fetching d'API (Fichier utilitaire `hooks/fetchData.tsx` notamment) doivent cibler cette forme numérique :
```typescript
const API_BASE_URL_CONST = 'http://127.0.0.1:3000';
```

En forçant la route sur `127.0.0.1`, le mécanisme de réseau n'essaye pas d'interroger la carte WiFi. Vous garantissez ainsi une totale stabilité de l'application React Native/Node, que vous soyez avec de la fibre optique locale, sur un hotspot de téléphone instable, voire confiné dans un avion.

---

## 🛠️ Fonctionnalités implémentées du côté Front/App

Le front-end inclut :
1. **Connexion sécurisée** avec transmission JWT et conservation des sessions.
2. Écran hybride listant distinctement les **sinistres créés ou fermés** du client connecté (via StatusBadge stylisés).
3. **Déclaration de sinistre autonome** (Création) : un espace optimisé et validé en format SPA gérant directement les requêtes aux schémas de la base (`assure_id, contrat_id, ...`).
4. **Parcours Détail avec Pièces Jointes** : visualisation d'un sinistre, téléchargement granulaire de documents avec gestion du Formulaire binaire non altéré (`Multipart`, sans conflit de `Content-Type`), et listes instantanément mises à jour au succès des requêtes sans re-chargement du composant principal.
