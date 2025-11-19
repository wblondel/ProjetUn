import { classeRepository } from "../repositories/ClasseRepository.js";
import { Eleve } from "../models/Eleve.js";
import { consoleView } from "../views/ConsoleView.js";

export function quitter() {
    consoleView.afficherMessage("Au revoir !");
    throw new Error("Programme terminé par l'utilisateur.");
}

export function trouverClasseParNom(nomClasse) {
    const classes = classeRepository.getAll();
    return classes.find((classe) => classe.nom === nomClasse) || null;
}

export function creerEleveDepuisPrompt(indexEleve) {
    const eleveNom = consoleView.demanderTexte(`Entrez le nom de l'élève ${indexEleve} :`);
    const elevePrenom = consoleView.demanderTexte(`Entrez le prénom de l'élève ${indexEleve} :`);

    return new Eleve(eleveNom, elevePrenom);
}