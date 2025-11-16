import {Classe} from "../models/Classe.js";
import {Eleve} from "../models/Eleve.js";
import {DevoirSurveille} from "../models/DevoirSurveille.js";
import {Note} from "../models/Note.js";

export let classes = [
    new Classe("3A", [
        new Eleve("Dupont", "Jean"),
        new Eleve("Martin", "Claire")
    ]),
    new Classe("2B", [
        new Eleve("Durand", "Paul"),
        new Eleve("Leroy", "Sophie")
    ])
];

export let devoirsSurveilles = [
    new DevoirSurveille(1, "15/09/2023", 2, classes[0]),
    new DevoirSurveille(2, "20/09/2023", 3, classes[1]),
    new DevoirSurveille(3, "25/09/2023", 1.5, classes[0]),
    new DevoirSurveille(4, "30/09/2023", 2.5, classes[1])
];

export let notes = [
    new Note(classes[0].eleves[0], devoirsSurveilles[0], 12),
    new Note(classes[0].eleves[1], devoirsSurveilles[0], 15),

    new Note(classes[1].eleves[0], devoirsSurveilles[1], 14),
    new Note(classes[1].eleves[1], devoirsSurveilles[1], 18),

    new Note(classes[0].eleves[0], devoirsSurveilles[2], 10),
    new Note(classes[0].eleves[1], devoirsSurveilles[2], 13),

    new Note(classes[1].eleves[0], devoirsSurveilles[3], 16),
    new Note(classes[1].eleves[1], devoirsSurveilles[3], 19)
];