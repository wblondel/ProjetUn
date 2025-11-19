import { Eleve } from "../models/Eleve.js";
import { consoleView } from "../views/ConsoleView.js";

export function quitter() {
    consoleView.afficherMessage("Au revoir !");
    throw new Error("Programme terminé par l'utilisateur.");
}

export function creerEleveDepuisPrompt(indexEleve) {
    const eleveNom = consoleView.demanderTexte(`Entrez le nom de l'élève ${indexEleve} :`);
    const elevePrenom = consoleView.demanderTexte(`Entrez le prénom de l'élève ${indexEleve} :`);

    return new Eleve(eleveNom, elevePrenom);
}