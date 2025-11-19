import { devoirsSurveilles } from "../data/data.js";

/**
 * Gère l'accès aux données des devoirs surveillés.
 */
export class DevoirRepository {
    /**
     * Récupère tous les devoirs surveillés.
     * @return {DevoirSurveille[]} La liste de tous les devoirs.
     */
    getAll() {
        return devoirsSurveilles;
    }

    /**
     * Récupère les devoirs d'une classe spécifique.
     * @param {Classe} classe - La classe concernée.
     * @return {DevoirSurveille[]} La liste des devoirs de cette classe.
     */
    getByClasse(classe) {
        return devoirsSurveilles.filter(d => d.classe === classe);
    }

    /**
     * Ajoute un nouveau devoir surveillé.
     * @param {DevoirSurveille} devoir - Le devoir à ajouter.
     */
    add(devoir) {
        devoirsSurveilles.push(devoir);
    }

    /**
     * Récupère un devoir par son identifiant.
     * @param {number} id - L'identifiant du devoir.
     * @return {DevoirSurveille|undefined} Le devoir correspondant ou undefined si non trouvé.
     */
    getById(id) {
        return devoirsSurveilles.find(d => d.id === id);
    }
}

export const devoirRepository = new DevoirRepository();
