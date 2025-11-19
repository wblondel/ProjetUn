/**
 * Représente un devoir surveillé.
 */
export class DevoirSurveille {
    /**
     * Crée une nouvelle instance de DevoirSurveille.
     * @param {number} id - L'identifiant unique du devoir.
     * @param {number} numero - Le numéro du devoir dans la classe.
     * @param {string} date - La date du devoir (format "jj/mm/aaaa").
     * @param {number} coefficient - Le coefficient du devoir.
     * @param {Classe} classe - La classe associée au devoir.
     */
    constructor(id, numero, date, coefficient, classe) {
        this.id = id;
        this.numero = numero;
        this.date = date;
        this.coefficient = coefficient;
        this.classe = classe;
    }
}
