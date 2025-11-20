# Gestionnaire de Devoirs Surveillés

Ce projet est une application JavaScript permettant de gérer des devoirs surveillés (DS), des classes et des élèves. Il a été conçu pour démontrer une architecture logicielle structurée suivant le modèle MVC (Modèle-Vue-Contrôleur).

## Fonctionnalités

L'application permet d'effectuer les actions suivantes via un menu interactif :

1.  **Ajouter un devoir surveillé** : Créer un nouveau DS pour une classe donnée.
2.  **Consulter un DS** : Afficher les détails d'un devoir, y compris les statistiques (note minimale, maximale et moyenne).
3.  **Consulter une classe** : Lister les élèves d'une classe et afficher la moyenne générale de la classe.
4.  **Consulter les notes d'un élève** : Voir toutes les notes obtenues par un élève spécifique ainsi que sa moyenne.

## Architecture Technique

Le projet est structuré de manière modulaire en utilisant les **ES Modules** et suit les principes du **MVC** et du **Repository Pattern** :

*   **Modèles (`js/models`)** : Définissent les entités principales (Classe, Eleve, DevoirSurveille, Note).
*   **Vues (`js/views`)** : Gèrent l'affichage et les interactions avec l'utilisateur. L'interface actuelle utilise la console du navigateur pour l'affichage et des boîtes de dialogue (`prompt`) pour la saisie.
*   **Contrôleurs (`js/controllers`)** : Font le lien entre les modèles, les vues et les dépôts. Ils contiennent la logique de l'application.
*   **Dépôts (`js/repositories`)** : Gèrent l'accès aux données (simulé en mémoire ou via des fichiers JSON statiques).
*   **Services (`js/services`)** : Contiennent la logique métier complexe si nécessaire.

## Structure du Projet

```
/
├── index.html          # Point d'entrée de l'application
├── js/
│   ├── app.js          # Logique principale de la boucle de l'application
│   ├── main.js         # Script de démarrage
│   ├── controllers/    # Contrôleurs (DevoirSurveilleController, etc.)
│   ├── models/         # Classes du modèle de données
│   ├── views/          # Gestion de l'affichage (ConsoleView, MenuView)
│   ├── repositories/   # Gestion des données
│   ├── services/       # Services métier
│   ├── utils/          # Fonctions utilitaires
│   └── data/           # Données initiales (si applicable)
```

## Comment lancer le projet

1.  Clonez ce dépôt sur votre machine locale.
2.  **Lancer un serveur local** :
    *   À cause des restrictions de sécurité des navigateurs (CORS) liées aux modules ES, vous ne pouvez pas simplement ouvrir le fichier `index.html`.
    *   Vous devez utiliser un serveur HTTP local. Voici quelques options :
        *   **Extension VS Code "Live Server"** : Si vous utilisez VS Code, installez l'extension et cliquez sur "Go Live".
        *   **Python** : Ouvrez un terminal dans le dossier du projet et lancez `python -m http.server` (ou `python3 -m http.server`).
        *   **Node.js** : Si Node.js est installé, vous pouvez utiliser `npx http-server`.
3.  Accédez à l'URL indiquée par votre serveur (généralement `http://localhost:5500` ou `http://localhost:8000`).
4.  **Important** : Ouvrez la console de développement du navigateur (touche `F12` ou `Clic droit > Inspecter > Console`) pour voir les affichages du menu et des résultats.
5.  Suivez les instructions affichées via les boîtes de dialogue (`prompt`) pour naviguer dans l'application.

## Auteurs

Projet réalisé dans le cadre d'un exercice de développement web et d'architecture logicielle.
