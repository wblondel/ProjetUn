import {classes} from "../data/data.js";
import {Eleve} from "../models/Eleve.js";

export function quitter() {
    console.log("Au revoir !");
    throw new Error("Programme terminé par l'utilisateur.");
}

export function trouverClasseParNom(nomClasse) {
    return classes.find((classe) => classe.nom === nomClasse) || null;
}

export function creerEleveDepuisPrompt(indexEleve) {
    const eleveNom = prompt(`Entrez le nom de l'élève ${indexEleve} :`);
    const elevePrenom = prompt(`Entrez le prénom de l'élève ${indexEleve} :`);

    return new Eleve(eleveNom, elevePrenom);
}