/**
 * Gère les interactions avec la console (affichage et saisie).
 */
export class ConsoleView {
    /**
     * Affiche un message simple.
     * @param {string} message - Le message à afficher.
     */
    afficherMessage(message) {
        console.log(message);
    }

    /**
     * Affiche un titre formaté.
     * @param {string} titre - Le titre à afficher.
     */
    afficherTitre(titre) {
        console.log(`\n=== ${titre} ===`);
    }

    /**
     * Affiche un séparateur visuel.
     */
    afficherSeparateur() {
        console.log("------------------------------");
    }

    /**
     * Affiche une liste d'éléments numérotés.
     * @param {Array} items - La liste des éléments.
     * @param {Function} formatter - Une fonction pour formater chaque élément.
     */
    afficherListe(items, formatter) {
        items.forEach((item, index) => {
            console.log(`${index + 1}. ${formatter(item)}`);
        });
    }

    /**
     * Demande à l'utilisateur de saisir un entier.
     * @param {string} question - La question à poser.
     * @return {number} L'entier saisi.
     */
    demanderEntier(question) {
        return parseInt(prompt(question));
    }

    /**
     * Demande à l'utilisateur de saisir du texte.
     * @param {string} question - La question à poser.
     * @return {string} Le texte saisi.
     */
    demanderTexte(question) {
        return prompt(question);
    }

    /**
     * Affiche un message d'erreur.
     * @param {string} message - Le message d'erreur.
     */
    afficherErreur(message) {
        console.log(`[ERREUR] ${message}`);
    }

    /**
     * Affiche une moyenne formatée.
     * @param {number|null} moyenne - La moyenne à afficher.
     * @param {string} label - Le libellé (par défaut "Moyenne").
     */
    afficherMoyenne(moyenne, label = "Moyenne") {
        if (moyenne !== null) {
            console.log(`${label} : ${moyenne.toFixed(2)}`);
        } else {
            console.log(`${label} : N/A`);
        }
    }

    /**
     * Affiche les statistiques d'un devoir.
     * @param {{min: number, max: number, moyenne: number}|null} stats - Les statistiques.
     */
    afficherStatsDevoir(stats) {
        if (!stats) {
            console.log("Aucune note pour ce devoir surveillé.");
            return;
        }
        console.log(`Note minimale : ${stats.min}`);
        console.log(`Note maximale : ${stats.max}`);
        console.log(`Note moyenne : ${stats.moyenne.toFixed(2)}`);
    }
}

export const consoleView = new ConsoleView();
