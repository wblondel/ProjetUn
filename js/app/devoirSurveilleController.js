import { Classe } from "../models/Classe.js";
import { DevoirSurveille } from "../models/DevoirSurveille.js";
import { NoteEleve } from "../models/NoteEleve.js";
import { classes, devoirsSurveilles } from "../data/data.js";
import { creerEleveDepuisPrompt, trouverClasseParNom } from "./utils.js";

export function ajouterDS() {
    const date = prompt("Entrez la date du devoir surveillé (jj/mm/aaaa) :");
    const coefficient = parseFloat(
        prompt("Entrez le coefficient du devoir surveillé :")
    );
    const nomClasse = prompt("Entrez la classe (ex: 3A, 2B, etc.) :");

    let classeDevoirSurveille = trouverClasseParNom(nomClasse);

    const nombreNotes = parseInt(
        prompt("Combien de notes voulez-vous entrer ?")
    );
    const notesEleves = [];
    const elevesPourNouvelleClasse = [];

    // On demande les notes (et les élèves si la classe n'existe pas).
    for (let i = 0; i < nombreNotes; i++) {
        const numeroEleve = i + 1;
        let eleve;

        if (classeDevoirSurveille === null) {
            eleve = creerEleveDepuisPrompt(numeroEleve);
            elevesPourNouvelleClasse.push(eleve);
        } else {
            // Si la classe existe déjà, on prend l'élève à la même position,
            // ou on en créé un nouveau si la liste est trop courte.
            const elevesClasse = classeDevoirSurveille.getEleves();

            if (elevesClasse[i]) {
                eleve = elevesClasse[i];
            } else {
                eleve = creerEleveDepuisPrompt(numeroEleve);
                classeDevoirSurveille.ajouterEleve(eleve);
            }
        }

        const noteSaisie = parseFloat(
            prompt(`Entrez la note ${numeroEleve} :`)
        );
        notesEleves.push(new NoteEleve(eleve, noteSaisie));
    }

    // Si la classe n'existe pas, on la crée avec les élèves saisis
    if (!classeDevoirSurveille) {
        classeDevoirSurveille = new Classe(nomClasse, elevesPourNouvelleClasse);
        classes.push(classeDevoirSurveille);
    }

    // On génère un ID unique pour le devoir surveillé
    const id = devoirsSurveilles.length + 1;

    // On crée le devoir surveillé
    const nouveauDevoir = new DevoirSurveille(
        id,
        date,
        coefficient,
        notesEleves,
        classeDevoirSurveille
    );
    devoirsSurveilles.push(nouveauDevoir);

    console.log("Devoir Surveillé créé : ", nouveauDevoir);
    nouveauDevoir.afficherStatsNotes();
}

// --------- Helpers for DS consultation ---------

function hasDevoirsSurveilles() {
    return devoirsSurveilles.length > 0;
}

function afficherListeDevoirs() {
    console.log("Liste des devoirs surveillés :");
    devoirsSurveilles.forEach((devoir) => {
        console.log(
            `DS n°${devoir.id} du ${devoir.date} ` +
            `(Classe: ${devoir.classe.nom}, Coefficient: ${devoir.coefficient})`
        );
    });
    console.log("0. Retour au menu principal");
    console.log("------------------------------");
}

function demanderNumeroDSDepuisListe() {
    const saisie = prompt("Votre choix ? ");
    return parseInt(saisie);
}

function estNumeroDSValide(numeroDS) {
    return (
        Number.isInteger(numeroDS) &&
        numeroDS >= 1 &&
        numeroDS <= devoirsSurveilles.length
    );
}

function trouverDevoirParNumero(numeroDS) {
    return devoirsSurveilles[numeroDS - 1];
}

function afficherEnteteDevoir(devoir) {
    const classe = devoir.classe;
    console.log(`Devoir Surveillé n°${devoir.id} du ${devoir.date}`);
    console.log(`Coefficient: ${devoir.coefficient}`);
    console.log(`Classe: ${classe.nom}`);
}

function afficherNotesEleves(devoir) {
    if (!devoir.notesEleves || devoir.notesEleves.length === 0) {
        return;
    }

    console.log();
    console.log("Élèves et leurs notes :");

    devoir.notesEleves.forEach((noteEleve) => {
        console.log(`${noteEleve.eleve.getNomComplet()} : ${noteEleve.valeur}`);
    });
}

function afficherDetailsDevoir(devoir) {
    afficherEnteteDevoir(devoir);
    devoir.afficherStatsNotes();
    afficherNotesEleves(devoir);
    console.log("------------------------------");
}

// --------- Public API ---------
/**
 * Affiche les détails d'un DS identifié par son numéro.
 */
export function consulterNotesDS(numeroDS) {
    if (!hasDevoirsSurveilles()) {
        alert("Pas de devoirs surveillés.");
        return;
    }

    if (!estNumeroDSValide(numeroDS)) {
        alert("Numéro de DS invalide.");
        return;
    }

    const devoir = trouverDevoirParNumero(numeroDS);
    afficherDetailsDevoir(devoir);
}

/**
 * liste les DS, demande un choix, affiche le détail,
 * et redemande tant que l'utilisateur le souhaite.
 */
export function consulterNotesDSDepuisMenu() {
    if (!hasDevoirsSurveilles()) {
        alert("Pas de devoirs surveillés.");
        return;
    }

    while (true) {
        afficherListeDevoirs();
        const numeroDemande = demanderNumeroDSDepuisListe();

        if (numeroDemande === 0 || Number.isNaN(numeroDemande)) {
            return;
        }

        if (!estNumeroDSValide(numeroDemande)) {
            alert("Numéro de DS invalide.");
            continue;
        }

        consulterNotesDS(numeroDemande);
    }
}