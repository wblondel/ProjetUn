import { classes, devoirsSurveilles } from "../data/data.js";

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
    const nomComplet =
        typeof eleve.getNomComplet === "function"
            ? eleve.getNomComplet()
            : `${eleve.prenom} ${eleve.nom}`;

    console.log(`Notes pour ${nomComplet} :`);
    console.log("------------------------------");

    let aAuMoinsUneNote = false;

    devoirsSurveilles.forEach((devoir) => {
        devoir.notesEleves.forEach((noteEleve) => {
            if (noteEleve.eleve === eleve) {
                aAuMoinsUneNote = true;
                console.log(
                    `DS n°${devoir.id} du ${devoir.date} ` +
                    `(Classe: ${devoir.classe.nom}, Coefficient: ${devoir.coefficient})`
                );
                console.log(`  Note : ${noteEleve.valeur}`);
                console.log("------------------------------");
            }
        });
    });

    if (!aAuMoinsUneNote) {
        console.log("Aucune note trouvée pour cet élève.");
        console.log("------------------------------");
    }
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
        console.clear();
        afficherNotesPourEleve(eleve);

        const continuer = prompt(
            "Consulter les notes d'un autre élève ? (O/N) "
        ).toUpperCase();

        if (continuer !== "O") {
            return;
        }
    }
}