export class Note {
    /**
     * @param {Eleve} eleve
     * @param {DevoirSurveille} devoir
     * @param {number} valeur
     */
    constructor(eleve, devoir, valeur) {
        this.eleve = eleve;
        this.devoir = devoir;
        this.valeur = valeur;
    }
}