export class DevoirSurveille {
    constructor(id, date, coefficient, notesEleves, classe) {
        this.id = id;
        this.date = date;
        this.coefficient = coefficient;
        this.notesEleves = notesEleves;
        this.classe = classe;
    }

    getNotes() {
        return this.notesEleves.map((noteEleve) => noteEleve.valeur);
    }

    calculerStats() {
        const notes = this.getNotes();

        if (!notes || notes.length === 0) {
            return;
        }

        const noteMin = Math.min(...notes);
        const noteMax = Math.max(...notes);
        const sommeNotes = notes.reduce(
            (total, noteCourante) => total + noteCourante,
            0
        );
        const noteMoyenne = sommeNotes / notes.length;

        return { noteMin, noteMax, noteMoyenne };
    }

    afficherStatsNotes() {
        const stats = this.calculerStats();

        if (!stats) {
            console.log("Aucune note pour ce devoir surveillé.");
            return;
        }

        console.log("Note minimale :", stats.noteMin);
        console.log("Note maximale :", stats.noteMax);
        console.log("Note moyenne :", stats.noteMoyenne);
    }
}
