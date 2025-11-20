import { Classe } from "../models/Classe.js";
import { DevoirSurveille } from "../models/DevoirSurveille.js";
import { Note } from "../models/Note.js";
import { classeRepository } from "../repositories/ClasseRepository.js";
import { devoirRepository } from "../repositories/DevoirRepository.js";
import { noteRepository } from "../repositories/NoteRepository.js";
import { statsService } from "../services/StatistiquesService.js";
import { consoleView } from "../views/ConsoleView.js";
import { creerEleveDepuisPrompt } from "../utils/utils.js";

/**
 * Contrôleur gérant les opérations liées aux devoirs surveillés.
 */
export class DevoirSurveilleController {
    /**
     * Ajoute un nouveau devoir surveillé avec saisie des notes.
     */
    ajouterDS() {
        let dateParsed;

        while (true) {
            const dateString = consoleView.demanderTexte("Entrez la date du devoir surveillé (aaaa/mm/jj) :");

            // Validation stricte du format aaaa/mm/jj
            if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateString)) {
                consoleView.afficherMessage("Format invalide. Veuillez utiliser aaaa/mm/jj (ex: 2023/10/27).");
                continue;
            }

            dateParsed = new Date(dateString);

            if (!isNaN(dateParsed.getTime())) {
                break;
            }
            consoleView.afficherMessage("Date invalide. Veuillez réessayer.");
        }

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
            dateParsed,
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

            let noteSaisie;
            do {
                noteSaisie = parseFloat(consoleView.demanderTexte(`Entrez la note ${numeroEleve} :`));
            } while (isNaN(noteSaisie) || noteSaisie < 0 || noteSaisie > 20);

            noteRepository.add(new Note(eleve, nouveauDevoir, noteSaisie));
        }

        consoleView.afficherMessage(nouveauDevoir);

        const stats = statsService.calculerStatsDevoir(nouveauDevoir);
        consoleView.afficherStatsDevoir(stats);

        alert(
            `Devoir surveillé n°${nouveauDevoir.numero} pour la classe ${classeDevoirSurveille.nom} créé.`
        );
    }

    /**
     * Consulte les notes et statistiques d'un devoir surveillé spécifique.
     * @param {number} numeroDS - L'index (1-based) du devoir dans la liste globale.
     */
    consulterNotesDS(numeroDS) {
        const devoirs = devoirRepository.getAll();
        if (devoirs.length === 0) {
            alert("Pas de devoirs surveillés.");
            return;
        }

        if (isNaN(numeroDS) || numeroDS < 1 || numeroDS > devoirs.length) {
            alert("Numéro de DS invalide.");
            return;
        }

        const devoir = devoirs[numeroDS - 1];

        consoleView.afficherTitre(`Devoir Surveillé n°${devoir.id} du ${devoir.getDateFormatted()}`);
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

    /**
     * Affiche la liste des devoirs surveillés et permet d'en sélectionner un pour consultation.
     */
    consulterNotesDSDepuisMenu() {
        const devoirs = devoirRepository.getAll();
        if (devoirs.length === 0) {
            alert("Pas de devoirs surveillés.");
            return;
        }

        while (true) {
            consoleView.afficherTitre("Liste des devoirs surveillés");
            consoleView.afficherListe(devoirs, (d) => `DS n°${d.numero} du ${d.getDateFormatted()} (Classe: ${d.classe.nom}, Coefficient: ${d.coefficient})`);
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

            this.consulterNotesDS(numeroDemande);
        }
    }
}

export const devoirSurveilleController = new DevoirSurveilleController();