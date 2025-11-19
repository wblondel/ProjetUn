/**
 * Représente un élève.
 */
export class Eleve {
    /**
     * Crée une nouvelle instance d'Eleve.
     * @param {string} nom - Le nom de l'élève.
     * @param {string} prenom - Le prénom de l'élève.
     */
    constructor(nom, prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    /**
     * Retourne le nom complet de l'élève.
     * @return {string} Le nom complet (Prénom Nom).
     */
    getNomComplet() {
        return `${this.prenom} ${this.nom}`;
    }
}
