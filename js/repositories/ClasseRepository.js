import { classes } from "../data/data.js";

export class ClasseRepository {
    getAll() {
        return classes;
    }

    getById(id) {
        // Assuming ID is index + 1 for now, or we can add IDs to classes later.
        // For now, we rely on object reference or index.
        // This method might need adjustment based on how we identify classes.
        return classes[id - 1];
    }

    add(classe) {
        classes.push(classe);
    }

    getByName(nom) {
        return classes.find(c => c.nom === nom);
    }
}

export const classeRepository = new ClasseRepository();
