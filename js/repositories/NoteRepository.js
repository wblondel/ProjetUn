import { notes } from "../data/data.js";

/**
 * Gère l'accès aux données des notes.
 */
export class NoteRepository {
    /**
     * Récupère toutes les notes.
     * @return {Note[]} La liste de toutes les notes.
     */
    getAll() {
        return notes;
    }

    /**
     * Récupère les notes d'un élève spécifique.
     * @param {Eleve} eleve - L'élève concerné.
     * @return {Note[]} La liste des notes de cet élève.
     */
    getByEleve(eleve) {
        return notes.filter(n => n.eleve === eleve);
    }

    /**
     * Récupère les notes d'un devoir spécifique.
     * @param {DevoirSurveille} devoir - Le devoir concerné.
     * @return {Note[]} La liste des notes de ce devoir.
     */
    getByDevoir(devoir) {
        return notes.filter(n => n.devoir === devoir);
    }

    /**
     * Ajoute une nouvelle note.
     * @param {Note} note - La note à ajouter.
     */
    add(note) {
        notes.push(note);
    }
}

export const noteRepository = new NoteRepository();
