import { devoirsSurveilles } from "../data/data.js";

export class DevoirRepository {
    getAll() {
        return devoirsSurveilles;
    }

    getByClasse(classe) {
        return devoirsSurveilles.filter(d => d.classe === classe);
    }

    add(devoir) {
        devoirsSurveilles.push(devoir);
    }

    getById(id) {
        return devoirsSurveilles.find(d => d.id === id);
    }
}

export const devoirRepository = new DevoirRepository();
