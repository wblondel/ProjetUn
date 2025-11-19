import { noteRepository } from "../repositories/NoteRepository.js";

export class StatistiquesService {
    calculerMoyenneClasse(classe) {
        // We need to get all notes for this class.
        // Since notes are linked to Devoir, and Devoir is linked to Classe,
        // we can iterate over all notes and check if note.devoir.classe === classe.
        // Or better, use the repository.

        // However, NoteRepository currently has getByDevoir and getByEleve.
        // Let's fetch all notes and filter, or add a method to NoteRepository.
        // For now, let's filter here or assume we can get them.

        // Actually, the original logic was:
        // const notesDeLaClasse = notes.filter(note => note.devoir.classe === classeSelectionnee);

        const allNotes = noteRepository.getAll();
        const notesDeLaClasse = allNotes.filter(note => note.devoir.classe === classe);

        if (notesDeLaClasse.length === 0) {
            return null;
        }

        let sommePonderee = 0;
        let sommeCoefficients = 0;

        notesDeLaClasse.forEach((note) => {
            const coeff = note.devoir.coefficient;
            sommePonderee += note.valeur * coeff;
            sommeCoefficients += coeff;
        });

        if (sommeCoefficients === 0) {
            return null;
        }

        return sommePonderee / sommeCoefficients;
    }

    calculerMoyenneEleve(eleve) {
        const notesEleve = noteRepository.getByEleve(eleve);

        if (notesEleve.length === 0) {
            return null;
        }

        let sommePonderee = 0;
        let sommeCoefficients = 0;

        notesEleve.forEach((note) => {
            const coeff = note.devoir.coefficient;
            sommePonderee += note.valeur * coeff;
            sommeCoefficients += coeff;
        });

        if (sommeCoefficients === 0) {
            return null;
        }

        return sommePonderee / sommeCoefficients;
    }

    calculerStatsDevoir(devoir) {
        const notesDevoir = noteRepository.getByDevoir(devoir);

        if (notesDevoir.length === 0) {
            return null;
        }

        const valeurs = notesDevoir.map(n => n.valeur);
        const min = Math.min(...valeurs);
        const max = Math.max(...valeurs);
        const somme = valeurs.reduce((a, b) => a + b, 0);
        const moyenne = somme / valeurs.length;

        return { min, max, moyenne };
    }
}

export const statsService = new StatistiquesService();
