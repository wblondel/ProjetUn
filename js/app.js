import { devoirSurveilleController } from "./controllers/DevoirSurveilleController.js";
import { classeController } from "./controllers/ClasseController.js";
import { eleveController } from "./controllers/EleveController.js";
import { afficherMenuPrincipal, demanderChoixUtilisateur } from "./views/MenuView.js";
import { quitter } from "./utils/utils.js";

export function runApplication() {
    while (true) {
        afficherMenuPrincipal();
        const choix = demanderChoixUtilisateur();

        if (choix === 1) {
            devoirSurveilleController.ajouterDS();
        } else if (choix === 2) {
            devoirSurveilleController.consulterNotesDSDepuisMenu();
        } else if (choix === 3) {
            classeController.consulterClasse();
        } else if (choix === 4) {
            eleveController.consulterNotesEleve();
        } else if (choix === 0) {
            quitter();
        }
    }
}
