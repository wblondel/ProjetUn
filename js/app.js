import { ajouterDS, consulterNotesDSDepuisMenu } from "./controllers/DevoirSurveilleController.js";
import { consulterClasse } from "./controllers/ClasseController.js";
import { consulterNotesEleve } from "./controllers/EleveController.js";
import { afficherMenuPrincipal, demanderChoixUtilisateur } from "./views/MenuView.js";
import { quitter } from "./utils/utils.js";

export function runApplication() {
    while (true) {
        afficherMenuPrincipal();
        const choix = demanderChoixUtilisateur();

        if (choix === 1) {
            ajouterDS();
        } else if (choix === 2) {
            consulterNotesDSDepuisMenu();
        } else if (choix === 3) {
            consulterClasse();
        } else if (choix === 4) {
            consulterNotesEleve();
        } else if (choix === 0) {
            quitter();
        }
    }
}
