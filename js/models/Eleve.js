export class Eleve {
    /**
     * @param {string} nom
     * @param {string} prenom
     */
    constructor(nom, prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    /**
     * Retourne le nom complet de l'Eleve en combinant le prénom et le nom.
     *
     * @return {string} Le nom complet composé du prénom et du nom.
     */
    getNomComplet() {
        return `${this.prenom} ${this.nom}`;
    }

    /**
     * Calcule la moyenne pondérée de l'élève à partir de ses notes.
     * @param {Note[]} notesDeCetEleve
     * @returns {number | null} moyenne pondérée ou null si aucune note
     */
    calculerMoyennePonderee(notesDeCetEleve) {
        if (!notesDeCetEleve || notesDeCetEleve.length === 0) {
            return null;
        }

        let sommePonderee = 0;
        let sommeCoefficients = 0;

        notesDeCetEleve.forEach((note) => {
            const coeff = note.devoir.coefficient;
            sommePonderee += note.valeur * coeff;
            sommeCoefficients += coeff;
        });

        if (sommeCoefficients === 0) {
            return null;
        }

        return sommePonderee / sommeCoefficients;
    }
}
