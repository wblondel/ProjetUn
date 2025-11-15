import {Classe} from "../models/Classe.js";
import {Eleve} from "../models/Eleve.js";
import {DevoirSurveille} from "../models/DevoirSurveille.js";
import {NoteEleve} from "../models/NoteEleve.js";

export let classes = [
    new Classe("3A", [new Eleve("Dupont", "Jean"), new Eleve("Martin", "Claire")]),
    new Classe("2B", [new Eleve("Durand", "Paul"), new Eleve("Leroy", "Sophie")])
];

// Pour simplifier, on suppose que l'ordre des élèves dans la classe
// correspond à l'ordre des notes définies ci-dessous
export let devoirsSurveilles = [
    new DevoirSurveille(
        1,
        "15/09/2023",
        2,
        [
            new NoteEleve(classes[0].eleves[0], 12),
            new NoteEleve(classes[0].eleves[1], 15)
        ],
        classes[0]
    ),
    new DevoirSurveille(
        2,
        "20/09/2023",
        3,
        [
            new NoteEleve(classes[1].eleves[0], 14),
            new NoteEleve(classes[1].eleves[1], 18)
        ],
        classes[1]
    ),
    new DevoirSurveille(
        3,
        "25/09/2023",
        1.5,
        [
            new NoteEleve(classes[0].eleves[0], 10),
            new NoteEleve(classes[0].eleves[1], 13)
        ],
        classes[0]
    ),
    new DevoirSurveille(
        4,
        "30/09/2023",
        2.5,
        [
            new NoteEleve(classes[1].eleves[0], 16),
            new NoteEleve(classes[1].eleves[1], 19)
        ],
        classes[1]
    )
];