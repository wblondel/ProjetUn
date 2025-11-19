export class Eleve {
    /**
     * @param {string} nom
     * @param {string} prenom
     */
    constructor(nom, prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    /**
     * Retourne le nom complet de l'Eleve en combinant le prénom et le nom.
     *
     * @return {string} Le nom complet composé du prénom et du nom.
     */
    getNomComplet() {
        return `${this.prenom} ${this.nom}`;
    }
}
