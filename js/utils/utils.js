import { Eleve } from "../models/Eleve.js";
import { consoleView } from "../views/ConsoleView.js";

/**
 * Termine l'exécution du programme.
 * @throws {Error} Toujours, pour arrêter le script.
 */
export function quitter() {
    consoleView.afficherMessage("Au revoir !");
    throw new Error("Programme terminé par l'utilisateur.");
}

/**
 * Crée un nouvel élève en demandant les informations à l'utilisateur.
 * @param {number} indexEleve - L'index de l'élève pour l'affichage.
 * @return {Eleve} L'élève créé.
 */
export function creerEleveDepuisPrompt(indexEleve) {
    const eleveNom = consoleView.demanderTexte(`Entrez le nom de l'élève ${indexEleve} :`);
    const elevePrenom = consoleView.demanderTexte(`Entrez le prénom de l'élève ${indexEleve} :`);

    return new Eleve(eleveNom, elevePrenom);
}