import { consoleView } from "../views/ConsoleView.js";

export function afficherMenuPrincipal() {
    consoleView.afficherTitre("Gestionnaire de devoirs surveillés");
    consoleView.afficherMessage("1. Ajouter un devoir surveillé");
    consoleView.afficherMessage("2. Consulter un DS");
    consoleView.afficherMessage("3. Consulter une classe");
    consoleView.afficherMessage("4. Consulter les notes d'un élève");
    consoleView.afficherMessage("0. Quitter");
    consoleView.afficherSeparateur();
}

export function demanderChoixUtilisateur() {
    return consoleView.demanderEntier("Entrez votre choix (1, 2, 3, 4 ou 0) :");
}