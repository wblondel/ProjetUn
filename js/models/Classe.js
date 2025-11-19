/**
 * Représente une classe d'élèves.
 */
export class Classe {
    /**
     * Crée une nouvelle instance de Classe.
     * @param {string} nom - Le nom de la classe (ex: "3A").
     * @param {Eleve[]} eleves - La liste initiale des élèves (optionnel).
     */
    constructor(nom, eleves = []) {
        this.nom = nom;
        this.eleves = eleves;
    }

    /**
     * Ajoute un élève à la classe.
     * @param {Eleve} eleve - L'élève à ajouter.
     */
    ajouterEleve(eleve) {
        this.eleves.push(eleve);
    }

    /**
     * Retourne une copie de la liste des élèves.
     * @return {Eleve[]} Une copie du tableau des élèves.
     */
    getEleves() {
        return [...this.eleves];
    }
}
