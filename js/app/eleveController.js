import { classes, notes } from "../data/data.js";

// --------- Helpers ---------

function construireListeElevesAvecClasse() {
    const elevesAvecClasse = [];

    classes.forEach((classe) => {
        classe.eleves.forEach((eleve) => {
            elevesAvecClasse.push({ eleve, classe });
        });
    });

    return elevesAvecClasse;
}

function afficherListeEleves(elevesAvecClasse) {
    console.log("Liste des élèves :");
    elevesAvecClasse.forEach(({eleve, classe}, index) => {
        const numero = index + 1;
        const nomComplet = eleve.getNomComplet();
        console.log(`${numero}. ${nomComplet} (Classe: ${classe.nom})`);
    });
    console.log("0. Retour au menu principal");
    console.log("------------------------------");
}

function demanderIndexEleve(maxIndex) {
    const saisie = parseInt(prompt("Quel élève voulez-vous consulter ? "));

    if (saisie === 0 || Number.isNaN(saisie)) {
        return null;
    }

    const index = saisie - 1;
    if (index < 0 || index >= maxIndex) {
        return undefined; // invalide
    }

    return index;
}

function afficherNotesPourEleve(eleve) {
    const nomComplet = eleve.getNomComplet();

    console.log(`Notes pour ${nomComplet} :`);
    console.log("------------------------------");

    const notesDeCetEleve = notes.filter((note) => note.eleve === eleve);

    if (notesDeCetEleve.length === 0) {
        console.log("Aucune note trouvée pour cet élève.");
        console.log("------------------------------");
        return;
    }

    notesDeCetEleve.forEach((note) => {
        const devoir = note.devoir;
        console.log(
            `DS n°${devoir.id} du ${devoir.date} ` +
            `(Classe: ${devoir.classe.nom}, Coefficient: ${devoir.coefficient}) : ` +
            `${note.valeur}`
        );
    });

    const moyenne = eleve.calculerMoyennePonderee(notesDeCetEleve);
    console.log("------------------------------");
    if (moyenne === null) {
        console.log(
            `Impossible de calculer une moyenne pour ${nomComplet} (aucune note ou coefficients nuls).`
        );
    } else {
        console.log(
            `Moyenne pondérée de ${nomComplet} : ${moyenne.toFixed(2)}`
        );
    }
    console.log("------------------------------");
}

// --------- Public API ---------

export function consulterNotesEleve() {
    const elevesAvecClasse = construireListeElevesAvecClasse();

    if (elevesAvecClasse.length === 0) {
        alert("Aucun élève enregistré.");
        return;
    }

    while (true) {
        afficherListeEleves(elevesAvecClasse);

        const indexEleve = demanderIndexEleve(elevesAvecClasse.length);

        if (indexEleve === null) {
            return;
        }

        if (indexEleve === undefined) {
            alert("Choix invalide. Veuillez réessayer.");
            continue;
        }

        const { eleve } = elevesAvecClasse[indexEleve];
        afficherNotesPourEleve(eleve);

        const continuer = prompt(
            "Consulter les notes d'un autre élève ? (O/N) "
        ).toUpperCase();

        if (continuer !== "O") {
            return;
        }
    }
}