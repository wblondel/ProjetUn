import { Classe } from "../models/Classe.js";
import { DevoirSurveille } from "../models/DevoirSurveille.js";
import { Note } from "../models/Note.js";
import { classeRepository } from "../repositories/ClasseRepository.js";
import { devoirRepository } from "../repositories/DevoirRepository.js";
import { noteRepository } from "../repositories/NoteRepository.js";
import { statsService } from "../services/StatistiquesService.js";
import { consoleView } from "../views/ConsoleView.js";
import { creerEleveDepuisPrompt } from "../utils/utils.js";

export function ajouterDS() {
    const date = consoleView.demanderTexte("Entrez la date du devoir surveillé (jj/mm/aaaa) :");
    const coefficient = parseFloat(consoleView.demanderTexte("Entrez le coefficient du devoir surveillé :"));
    const nomClasse = consoleView.demanderTexte("Entrez la classe (ex: 3A, 2B, etc.) :");

    let classeDevoirSurveille = classeRepository.getByName(nomClasse);

    // Si la classe n'existe pas, on la créé vide tout de suite
    if (!classeDevoirSurveille) {
        classeDevoirSurveille = new Classe(nomClasse, []);
        classeRepository.add(classeDevoirSurveille);
    }

    const nombreNotes = consoleView.demanderEntier("Combien de notes voulez-vous entrer ?");

    // ID global unique pour le devoir surveillé
    const id = devoirRepository.getAll().length + 1;

    // Numéro du DS dans cette classe
    const numeroDansClasse = devoirRepository.getByClasse(classeDevoirSurveille).length + 1;

    // On crée le devoir surveillé immédiatement
    const nouveauDevoir = new DevoirSurveille(
        id,
        numeroDansClasse,
        date,
        coefficient,
        classeDevoirSurveille
    );
    devoirRepository.add(nouveauDevoir);

    // On récupère / crée l'élève et on crée la Note
    for (let i = 0; i < nombreNotes; i++) {
        const numeroEleve = i + 1;

        const elevesClasse = classeDevoirSurveille.getEleves();
        let eleve = elevesClasse[i];

        if (!eleve) {
            eleve = creerEleveDepuisPrompt(numeroEleve);
            classeDevoirSurveille.ajouterEleve(eleve);
        }

        const noteSaisie = parseFloat(consoleView.demanderTexte(`Entrez la note ${numeroEleve} :`));
        noteRepository.add(new Note(eleve, nouveauDevoir, noteSaisie));
    }

    consoleView.afficherMessage(nouveauDevoir);

    const stats = statsService.calculerStatsDevoir(nouveauDevoir);
    consoleView.afficherStatsDevoir(stats);

    alert(
        `Devoir surveillé n°${nouveauDevoir.numero} pour la classe ${classeDevoirSurveille.nom} créé.`
    );
}

export function consulterNotesDS(numeroDS) {
    const devoirs = devoirRepository.getAll();
    if (devoirs.length === 0) {
        alert("Pas de devoirs surveillés.");
        return;
    }

    // Note: The original code expected numeroDS to be the ID directly or index+1.
    // The original estNumeroDSValide checked against devoirsSurveilles.length.
    // trouverDevoirParNumero used devoirsSurveilles[numeroDS - 1].
    // So numeroDS is effectively the index + 1.

    if (isNaN(numeroDS) || numeroDS < 1 || numeroDS > devoirs.length) {
        alert("Numéro de DS invalide.");
        return;
    }

    const devoir = devoirs[numeroDS - 1];

    consoleView.afficherTitre(`Devoir Surveillé n°${devoir.id} du ${devoir.date}`);
    consoleView.afficherMessage(`Coefficient: ${devoir.coefficient}`);
    consoleView.afficherMessage(`Classe: ${devoir.classe.nom}`);

    const stats = statsService.calculerStatsDevoir(devoir);
    consoleView.afficherStatsDevoir(stats);

    const notesDuDevoir = noteRepository.getByDevoir(devoir);
    if (notesDuDevoir.length > 0) {
        consoleView.afficherMessage("\nÉlèves et leurs notes :");
        consoleView.afficherListe(notesDuDevoir, (n) => `${n.eleve.getNomComplet()} : ${n.valeur}`);
    }
    consoleView.afficherSeparateur();
}

export function consulterNotesDSDepuisMenu() {
    const devoirs = devoirRepository.getAll();
    if (devoirs.length === 0) {
        alert("Pas de devoirs surveillés.");
        return;
    }

    while (true) {
        consoleView.afficherTitre("Liste des devoirs surveillés");
        consoleView.afficherListe(devoirs, (d) => `DS n°${d.numero} du ${d.date} (Classe: ${d.classe.nom}, Coefficient: ${d.coefficient})`);
        consoleView.afficherMessage("0. Retour au menu principal");
        consoleView.afficherSeparateur();

        const numeroDemande = consoleView.demanderEntier("Votre choix ? ");

        if (numeroDemande === 0 || isNaN(numeroDemande)) {
            return;
        }

        if (numeroDemande < 1 || numeroDemande > devoirs.length) {
            alert("Numéro de DS invalide.");
            continue;
        }

        consulterNotesDS(numeroDemande);
    }
}