import { classeRepository } from "../repositories/ClasseRepository.js";
import { devoirRepository } from "../repositories/DevoirRepository.js";
import { statsService } from "../services/StatistiquesService.js";
import { consoleView } from "../views/ConsoleView.js";
import { consulterNotesDS } from "./devoirSurveilleController.js";

export function consulterClasse() {
    while (true) {
        const classes = classeRepository.getAll();

        consoleView.afficherTitre("Liste des classes");
        consoleView.afficherListe(classes, (c) => c.nom);
        consoleView.afficherSeparateur();
        consoleView.afficherMessage("0. Retour au menu principal");

        const indexClasse = consoleView.demanderEntier("Votre choix : ");

        if (indexClasse === 0) {
            return;
        }

        if (isNaN(indexClasse) || indexClasse < 1 || indexClasse > classes.length) {
            consoleView.afficherErreur("Choix invalide. Veuillez réessayer.");
            continue;
        }

        const classeSelectionnee = classes[indexClasse - 1];
        const moyenneClasse = statsService.calculerMoyenneClasse(classeSelectionnee);

        while (true) {
            consoleView.afficherTitre(`Classe ${classeSelectionnee.nom}`);
            consoleView.afficherMoyenne(moyenneClasse);

            const devoirsClasse = devoirRepository.getByClasse(classeSelectionnee);

            consoleView.afficherMessage("Devoirs surveillés :");
            consoleView.afficherListe(devoirsClasse, (d) => `DS du ${d.date} (Coefficient: ${d.coefficient})`);
            consoleView.afficherSeparateur();
            consoleView.afficherMessage("0. Retour à la sélection de classe");

            const numeroDS = consoleView.demanderEntier("Quel DS voulez-vous consulter ?");

            if (numeroDS === 0) {
                break;
            }

            if (isNaN(numeroDS) || numeroDS < 1 || numeroDS > devoirsClasse.length) {
                consoleView.afficherErreur("Choix invalide. Veuillez réessayer.");
                continue;
            }

            const devoirChoisi = devoirsClasse[numeroDS - 1];
            consulterNotesDS(devoirChoisi.id);
        }
    }
}