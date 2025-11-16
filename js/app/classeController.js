import {classes, devoirsSurveilles, notes} from "../data/data.js";
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

/**
 * Calcule la moyenne pondérée de toutes les notes d'une classe,
 * en tenant compte des coefficients des DS.
 */
function calculerMoyenneClasse(classeSelectionnee) {
    const notesDeLaClasse = notes.filter(
        (note) => note.devoir.classe === classeSelectionnee
    );

    if (notesDeLaClasse.length === 0) {
        return null;
    }

    let sommePonderee = 0;
    let sommeCoefficients = 0;

    notesDeLaClasse.forEach((note) => {
        const coeff = note.devoir.coefficient;
        sommePonderee += note.valeur * coeff;
        sommeCoefficients += coeff;
    });

    if (sommeCoefficients === 0) {
        return null;
    }

    return sommePonderee / sommeCoefficients;
}

/**
 * Affiche les DS d'une Classe avec une numérotation locale.
 *
 * Remplit le tableau `devoirClasse` avec les DevoirSurveille correspondants
 * dans le même ordre que l'affichage.
 */
function afficherDevoirsPourClasse(classeSelectionnee, devoirsClasse) {
    console.log(
        `Devoirs surveillés :`
    );

    devoirsSurveilles.forEach((devoir) => {
        if (devoir.classe === classeSelectionnee) {
            devoirsClasse.push(devoir);
            const numeroLocal = devoirsClasse.length;

            console.log(
                `${numeroLocal}. DS du ${devoir.date} ` +
                `(Coefficient: ${devoir.coefficient})`
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

        const moyenneClasse = calculerMoyenneClasse(classeSelectionnee);


        while (true) {
            console.log(`Classe ${classeSelectionnee.nom}`);
            if (moyenneClasse !== null) {
                console.log(`Moyenne : ${moyenneClasse.toFixed(2)}`);
            }

            const devoirsClasse = [];
            afficherDevoirsPourClasse(classeSelectionnee, devoirsClasse);

            const numeroDS = parseInt(
                prompt("Quel DS voulez-vous consulter ?")
            );
            if (numeroDS === 0) {
                break;
            }

            if (
                !Number.isInteger(numeroDS) ||
                numeroDS < 1 ||
                numeroDS > devoirsClasse.length
            ) {
                console.log("Choix invalide. Veuillez réessayer.");
                continue;
            }

            const devoirChoisi = devoirsClasse[numeroDS - 1];
            consulterNotesDS(devoirChoisi.id);
        }
    }
}