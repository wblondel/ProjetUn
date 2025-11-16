export class Classe {
    /**
     * @param {string} nom
     * @param {Eleve[]} eleves
     */
    constructor(nom, eleves = []) {
        this.nom = nom;
        this.eleves = eleves;
    }

    /**
     * @param {Eleve} eleve
     */
    ajouterEleve(eleve) {
        this.eleves.push(eleve);
    }

    /**
     * Retourne une copie des références aux élèves pour éviter les modifications externes non contrôlées.
     *
     * @return {Eleve[]} La liste des références copiées.
     */
    getEleves() {
        return [...this.eleves];
    }
}
