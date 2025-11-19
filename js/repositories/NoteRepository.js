import { notes } from "../data/data.js";

export class NoteRepository {
    getAll() {
        return notes;
    }

    getByEleve(eleve) {
        return notes.filter(n => n.eleve === eleve);
    }

    getByDevoir(devoir) {
        return notes.filter(n => n.devoir === devoir);
    }

    add(note) {
        notes.push(note);
    }
}

export const noteRepository = new NoteRepository();
