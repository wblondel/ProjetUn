import { classeRepository } from "../repositories/ClasseRepository.js";
import { noteRepository } from "../repositories/NoteRepository.js";
import { statsService } from "../services/StatistiquesService.js";
import { consoleView } from "../views/ConsoleView.js";

function construireListeElevesAvecClasse() {
    const elevesAvecClasse = [];
    const classes = classeRepository.getAll();

    classes.forEach((classe) => {
        classe.eleves.forEach((eleve) => {
            elevesAvecClasse.push({ eleve, classe });
        });
    });

    return elevesAvecClasse;
}

export function consulterNotesEleve() {
    const elevesAvecClasse = construireListeElevesAvecClasse();

    if (elevesAvecClasse.length === 0) {
        alert("Aucun élève enregistré.");
        return;
    }

    while (true) {
        consoleView.afficherTitre("Liste des élèves");
        consoleView.afficherListe(elevesAvecClasse, ({ eleve, classe }) => `${eleve.getNomComplet()} (Classe: ${classe.nom})`);
        consoleView.afficherMessage("0. Retour au menu principal");
        consoleView.afficherSeparateur();

        const indexEleve = consoleView.demanderEntier("Quel élève voulez-vous consulter ? ");

        if (indexEleve === 0 || isNaN(indexEleve)) {
            return;
        }

        if (indexEleve < 1 || indexEleve > elevesAvecClasse.length) {
            alert("Choix invalide. Veuillez réessayer.");
            continue;
        }

        const { eleve } = elevesAvecClasse[indexEleve - 1];

        consoleView.afficherTitre(`Notes pour ${eleve.getNomComplet()}`);

        const notesDeCetEleve = noteRepository.getByEleve(eleve);

        if (notesDeCetEleve.length === 0) {
            consoleView.afficherMessage("Aucune note trouvée pour cet élève.");
        } else {
            notesDeCetEleve.forEach((note) => {
                const devoir = note.devoir;
                consoleView.afficherMessage(
                    `${devoir.numero}. DS du ${devoir.date} ` +
                    `(Classe: ${devoir.classe.nom}, Coefficient: ${devoir.coefficient}) : ` +
                    `${note.valeur}`
                );
            });

            const moyenne = statsService.calculerMoyenneEleve(eleve);
            consoleView.afficherSeparateur();
            consoleView.afficherMoyenne(moyenne);
        }
        consoleView.afficherSeparateur();

        const continuer = consoleView.demanderTexte("Consulter les notes d'un autre élève ? (O/N) ").toUpperCase();

        if (continuer !== "O") {
            return;
        }
    }
}