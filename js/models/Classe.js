export class Classe {
    constructor(nom, eleves = []) {
        this.nom = nom;
        this.eleves = eleves;
    }

    ajouterEleve(eleve) {
        this.eleves.push(eleve);
    }

    getEleves() {
        // on renvoie une copie pour éviter les modifications externes non contrôlées
        return [...this.eleves];
    }
}
