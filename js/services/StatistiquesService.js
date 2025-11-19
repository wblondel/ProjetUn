import { noteRepository } from "../repositories/NoteRepository.js";

/**
 * Service responsable des calculs statistiques.
 */
export class StatistiquesService {
    /**
     * Calcule la moyenne pondérée d'une classe.
     * @param {Classe} classe - La classe dont on veut la moyenne.
     * @return {number|null} La moyenne de la classe ou null si aucune note/coefficient.
     */
    calculerMoyenneClasse(classe) {
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

    /**
     * Calcule la moyenne pondérée d'un élève.
     * @param {Eleve} eleve - L'élève dont on veut la moyenne.
     * @return {number|null} La moyenne de l'élève ou null si aucune note/coefficient.
     */
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

    /**
     * Calcule les statistiques (min, max, moyenne) d'un devoir.
     * @param {DevoirSurveille} devoir - Le devoir concerné.
     * @return {{min: number, max: number, moyenne: number}|null} Les statistiques ou null si aucune note.
     */
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
