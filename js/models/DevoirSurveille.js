export class DevoirSurveille {
    /**
     * @param {number} id
     * @param {string} date // text "jj/mm/aaaa"
     * @param {number} coefficient
     * @param {Classe} classe
     */
    constructor(id, date, coefficient, classe) {
        this.id = id;
        this.date = date;
        this.coefficient = coefficient;
        this.classe = classe;
    }

    /**
     * Calcule les stats à partir d'une liste de notes (pour ce devoir).
     * @param {Note[]} notesDuDevoir
     */
    calculerStats(notesDuDevoir) {
        const valeurs = notesDuDevoir.map((note) => note.valeur);

        if (!valeurs || valeurs.length === 0) {
            return;
        }

        const noteMin = Math.min(...valeurs);
        const noteMax = Math.max(...valeurs);
        const sommeNotes = valeurs.reduce(
            (total, noteCourante) => total + noteCourante,
            0
        );
        const noteMoyenne = sommeNotes / valeurs.length;

        return { noteMin, noteMax, noteMoyenne };
    }

    afficherStatsNotes(notesDuDevoir) {
        const stats = this.calculerStats(notesDuDevoir);

        if (!stats) {
            console.log("Aucune note pour ce devoir surveillé.");
            return;
        }

        console.log("Note minimale :", stats.noteMin);
        console.log("Note maximale :", stats.noteMax);
        console.log("Note moyenne :", stats.noteMoyenne);
    }
}
