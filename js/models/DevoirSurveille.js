export class DevoirSurveille {
    /**
     * @param {number} id           // identifiant global unique
     * @param {number} numero       // numéro du DS dans la classe
     * @param {string} date         // texte "jj/mm/aaaa"
     * @param {number} coefficient
     * @param {Classe} classe
     */
    constructor(id, numero, date, coefficient, classe) {
        this.id = id;
        this.numero = numero;
        this.date = date;
        this.coefficient = coefficient;
        this.classe = classe;
    }
}
