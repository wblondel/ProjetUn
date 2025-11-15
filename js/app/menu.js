export function afficherMenuPrincipal() {
    console.log("Bienvenue dans le gestionnaire de devoirs surveillés.");
    console.log("1. Ajouter un devoir surveillé");
    console.log("2. Consulter un DS");
    console.log("3. Consulter une classe");
    console.log("4. Consulter les notes d'un élève");
    console.log("0. Quitter");
    console.log("------------------------------");
}

export function demanderChoixUtilisateur() {
    const saisie = prompt("Entrez votre choix (1, 2, 3, 4 ou 0) :");
    return parseInt(saisie);
}