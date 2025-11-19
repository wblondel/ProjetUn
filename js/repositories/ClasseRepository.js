import { classes } from "../data/data.js";

/**
 * Gère l'accès aux données des classes.
 */
export class ClasseRepository {
    /**
     * Récupère toutes les classes.
     * @return {Classe[]} La liste de toutes les classes.
     */
    getAll() {
        return classes;
    }

    /**
     * Récupère une classe par son identifiant.
     * @param {number} id - L'identifiant de la classe.
     * @return {Classe} La classe correspondante.
     */
    getById(id) {
        // On suppose que l'ID est l'index + 1 pour le moment.
        return classes[id - 1];
    }

    /**
     * Ajoute une nouvelle classe.
     * @param {Classe} classe - La classe à ajouter.
     */
    add(classe) {
        classes.push(classe);
    }

    /**
     * Récupère une classe par son nom.
     * @param {string} nom - Le nom de la classe.
     * @return {Classe|undefined} La classe correspondante ou undefined si non trouvée.
     */
    getByName(nom) {
        return classes.find(c => c.nom === nom);
    }
}

export const classeRepository = new ClasseRepository();
