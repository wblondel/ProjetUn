/**
 * Représente une note obtenue par un élève à un devoir.
 */
export class Note {
    /**
     * Crée une nouvelle instance de Note.
     * @param {Eleve} eleve - L'élève ayant obtenu la note.
     * @param {DevoirSurveille} devoir - Le devoir concerné.
     * @param {number} valeur - La valeur de la note.
     */
    constructor(eleve, devoir, valeur) {
        this.eleve = eleve;
        this.devoir = devoir;
        this.valeur = valeur;
    }
}