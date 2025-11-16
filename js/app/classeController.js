import {classes, devoirsSurveilles} from "../data/data.js";
import {consulterNotesDS} from "./devoirSurveilleController.js";

// --------- Helpers for classe consultation ---------

function afficherListeClasses() {
    console.log("Liste des classes :");
    classes.forEach((classe, index) => {
        console.log(`${index + 1}. ${classe.nom}`);
    });
    console.log("0. Retour au menu principal");
    console.log("------------------------------");
}

function demanderIndexClasse() {
    const numeroClasseSaisi = parseInt(prompt("Votre choix : "));

    if (numeroClasseSaisi === 0) {
        return null;
    }

    return numeroClasseSaisi - 1;
}

function validerIndexClasse(indexClasse) {
    return (
        indexClasse !== null &&
        Number.isInteger(indexClasse) &&
        indexClasse >= 0 &&
        indexClasse < classes.length
    );
}

function selectionnerClasseParIndex(indexClasse) {
    return classes[indexClasse];
}

function afficherDevoirsPourClasse(classeSelectionnee, choixPossibles) {
    console.log(
        `Devoirs surveillés pour la classe ${classeSelectionnee.nom} :`
    );
    devoirsSurveilles.forEach((devoir) => {
        if (devoir.classe === classeSelectionnee) {
            choixPossibles.push(devoir.id);
            console.log(
                `DS n°${devoir.id} du ${devoir.date} (Coefficient: ${devoir.coefficient})`
            );
        }
    });
    console.log("0. Retour à la sélection de classe");
    console.log("------------------------------");
}

// --------- Public API ---------

export function consulterClasse() {
    while (true) {
        afficherListeClasses();

        const indexClasse = demanderIndexClasse();
        if (indexClasse === null) {
            return;
        }

        if (!validerIndexClasse(indexClasse)) {
            console.log("Choix invalide. Veuillez réessayer.");
            continue;
        }

        const classeSelectionnee = selectionnerClasseParIndex(indexClasse);

        while (true) {
            const choixPossibles = [];
            afficherDevoirsPourClasse(classeSelectionnee, choixPossibles);

            const numeroDS = parseInt(prompt("Quel DS voulez-vous consulter ?"));
            if (numeroDS === 0) {
                break;
            }

            if (choixPossibles.includes(numeroDS)) {
                consulterNotesDS(numeroDS);
            }
        }
    }
}