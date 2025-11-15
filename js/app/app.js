import { ajouterDS, consulterNotesDSDepuisMenu } from "./devoirSurveilleController.js";
import { consulterClasse } from "./classeController.js";
import { consulterNotesEleve } from "./eleveController.js";
import { afficherMenuPrincipal, demanderChoixUtilisateur } from "./menu.js";
import { quitter } from "./utils.js";

export function runApplication() {
    while (true) {
        console.clear();
        afficherMenuPrincipal();
        const choix = demanderChoixUtilisateur();

        console.clear();
        if (choix === 1) {
            ajouterDS();
        } else if (choix === 2){
            consulterNotesDSDepuisMenu();
        } else if (choix === 3) {
            consulterClasse();
        } else if (choix === 4) {
            consulterNotesEleve();
        }
        else if (choix === 0) {
            quitter();
        }
    }
}
