import { Classe } from "../models/Classe.js";
import { DevoirSurveille } from "../models/DevoirSurveille.js";
import { Note } from "../models/Note.js";
import { classes, devoirsSurveilles, notes } from "../data/data.js";
import { creerEleveDepuisPrompt, trouverClasseParNom } from "./utils.js";

export function ajouterDS() {
    const date = prompt("Entrez la date du devoir surveillé (jj/mm/aaaa) :");
    const coefficient = parseFloat(
        prompt("Entrez le coefficient du devoir surveillé :")
    );
    const nomClasse = prompt("Entrez la classe (ex: 3A, 2B, etc.) :");

    let classeDevoirSurveille = trouverClasseParNom(nomClasse);

    // Si la classe n'existe pas, on la créé vide tout de suite
    if (!classeDevoirSurveille) {
        classeDevoirSurveille = new Classe(nomClasse, []);
        classes.push(classeDevoirSurveille);
    }

    const nombreNotes = parseInt(
        prompt("Combien de notes voulez-vous entrer ?")
    );

    // On génère un ID unique pour le devoir surveillé
    const id = devoirsSurveilles.length + 1;

    // On crée le devoir surveillé immédiatement, pour pouvoir le lier aux Notes
    const nouveauDevoir = new DevoirSurveille(
        id,
        date,
        coefficient,
        classeDevoirSurveille
    );
    devoirsSurveilles.push(nouveauDevoir);

    // Un seul passage : on récupère / crée l'élève et on crée la Note
    for (let i = 0; i < nombreNotes; i++) {
        const numeroEleve = i + 1;

        const elevesClasse = classeDevoirSurveille.getEleves();
        let eleve = elevesClasse[i];

        if (!eleve) {
            eleve = creerEleveDepuisPrompt(numeroEleve);
            classeDevoirSurveille.ajouterEleve(eleve);
        }

        const noteSaisie = parseFloat(
            prompt(`Entrez la note ${numeroEleve} :`)
        );
        notes.push(new Note(eleve, nouveauDevoir, noteSaisie));
    }

    console.log(nouveauDevoir);

    const notesDuDevoir = notes.filter((note) => note.devoir === nouveauDevoir);
    nouveauDevoir.afficherStatsNotes(notesDuDevoir);

    alert(`Devoir surveillé n°${nouveauDevoir.id} créé.`)
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
    const notesDuDevoir = notes.filter((note) => note.devoir === devoir);

    if (!notesDuDevoir || notesDuDevoir.length === 0) {
        return;
    }

    console.log();
    console.log("Élèves et leurs notes :");

    notesDuDevoir.forEach((note) => {
        console.log(`${note.eleve.getNomComplet()} : ${note.valeur}`);
    });
}

function afficherDetailsDevoir(devoir) {
    const notesDuDevoir = notes.filter((note) => note.devoir === devoir);
    afficherEnteteDevoir(devoir);
    devoir.afficherStatsNotes(notesDuDevoir);
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