class DevoirSurveille {
    constructor(id, date, coefficient, notes, classe) {
        this.id = id;
        this.date = date;
        this.coefficient = coefficient;
        this.notes = notes;
        this.classe = classe;
    }

    afficherStatsNotes() {
        if (!this.notes || this.notes.length === 0) {
            console.log("Aucune note pour ce devoir surveillé.");
            return;
        }

        const noteMin = Math.min(...this.notes);
        const noteMax = Math.max(...this.notes);
        const sommeNotes = this.notes.reduce((total, noteCourante) => total + noteCourante, 0);
        const noteMoyenne = sommeNotes / this.notes.length;

        console.log("Note minimale :", noteMin);
        console.log("Note maximale :", noteMax);
        console.log("Note moyenne :", noteMoyenne);
    }
}

class Classe {
    constructor(nom, eleves) {
        this.nom = nom;
        this.eleves = eleves;
    }
}

class Eleve {
    constructor(nom, prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }
}

// -----------

// Initialisation de la BDD
let classes = [
    new Classe("3A", [new Eleve("Dupont", "Jean"), new Eleve("Martin", "Claire")]),
    new Classe("2B", [new Eleve("Durand", "Paul"), new Eleve("Leroy", "Sophie")])
];
let devoirsSurveilles = [
    new DevoirSurveille(1, "15/09/2023", 2, [12, 15], classes[0]),
    new DevoirSurveille(2, "20/09/2023", 3, [14, 18], classes[1]),
    new DevoirSurveille(3, "25/09/2023", 1.5, [10, 13], classes[0]),
    new DevoirSurveille(4, "30/09/2023", 2.5, [16, 19], classes[1])
];

function quitter() {
    console.log("Au revoir !");
    throw new Error("Programme terminé par l'utilisateur.");
}

function trouverClasseParNom(nomClasse) {
    return classes.find((classe) => classe.nom === nomClasse) || null;
}

function creerEleveDepuisPrompt(indexEleve) {
    const eleveNom = prompt(`Entrez le nom de l'élève ${indexEleve} :`);
    const elevePrenom = prompt(`Entrez le prénom de l'élève ${indexEleve} :`);

    return new Eleve(eleveNom, elevePrenom);
}

function ajouterDS(){ 
    const date = prompt("Entrez la date du devoir surveillé (jj/mm/aaaa) :");
    const coefficient = parseFloat(prompt("Entrez le coefficient du devoir surveillé :"));
    const nomClasse = prompt("Entrez la classe (ex: 3A, 2B, etc.) :");

    let classeDevoirSurveille = trouverClasseParNom(nomClasse);

    const nombreNotes = parseInt(prompt("Combien de notes voulez-vous entrer ?"));
    const notes = [];
    const eleves = [];

    // On demande les notes (et les élèves si la classe n'existe pas).
    for (let i = 0; i < nombreNotes; i++) {
        const numeroEleve = i + 1;

        if (classeDevoirSurveille === null) {
            const nouvelEleve = creerEleveDepuisPrompt(numeroEleve);
            eleves.push(nouvelEleve);
        }

        const noteSaisie = parseFloat(prompt(`Entrez la note ${numeroEleve} :`));
        notes.push(noteSaisie);
    }

    // Si la classe n'existe pas, on la crée avec les élèves saisis
    if (!classeDevoirSurveille) {
        classeDevoirSurveille = new Classe(nomClasse, eleves);
        classes.push(classeDevoirSurveille);
    }

    // On génère un ID unique pour le devoir surveillé
    const id = devoirsSurveilles.length + 1;
    
    // On crée le devoir surveillé
    const nouveauDevoir = new DevoirSurveille(id, date, coefficient, notes, classeDevoirSurveille);
    devoirsSurveilles.push(nouveauDevoir);

    console.log("Devoir Surveillé créé : ", nouveauDevoir);
    nouveauDevoir.afficherStatsNotes();
}

function consulterNotesDS(numeroDS = null) {
    if (devoirsSurveilles.length === 0) {
        console.log("Pas de devoirs surveillés.");
        return;
    }

    if (numeroDS === null) {
        numeroDS = parseInt(prompt("Quel DS voulez-vous afficher ?"));
    }

    if (numeroDS < 1 || numeroDS > devoirsSurveilles.length) {
        console.log("Numéro de DS invalide.");
        return;
    }

    const devoir = devoirsSurveilles[numeroDS - 1];
    const classe = devoir.classe;

    console.log(`Devoir Surveillé n°${devoir.id} du ${devoir.date}`);
    console.log(`Coefficient: ${devoir.coefficient}`);
    console.log(`Classe: ${classe.nom}`);
    devoir.afficherStatsNotes();

    if (devoir.notes.length !== 0) {
        console.log();
        console.log("Élèves et leurs notes :");

        for (let i = 0; i < devoir.notes.length; i++) {
            const eleve = classe.eleves[i];
            const note = devoir.notes[i];
            console.log(`${eleve.prenom} ${eleve.nom} : ${note}`);
        }
    }

    console.log("------------------------------")
}

function consulterClasse() {
    while (true) {
        console.log("Liste des classes :")
        classes.forEach((classe, index) => {
            console.log(`${index + 1}. ${classe.nom}`);
        });
        console.log("Q. Retour au menu principal");
        console.log("------------------------------");
        
        const numeroClasseSaisi = prompt("Votre choix : ");
        if (numeroClasseSaisi.toUpperCase() === "Q") {
            return;
        }

        const indexClasse = parseInt(numeroClasseSaisi) - 1;
        if (isNaN(indexClasse) || indexClasse < 0 || indexClasse >= classes.length) {
            console.log("Choix invalide. Veuillez réessayer.");
            return;
        }

        const classeSelectionnee = classes[indexClasse];

        while (true) {
            console.log(`Devoirs surveillés pour la classe ${classeSelectionnee.nom} :`);
            const choixPossibles = [];

            devoirsSurveilles.forEach((devoir) => {
                if (devoir.classe === classeSelectionnee) {
                    choixPossibles.push(devoir.id);
                    console.log(`DS n°${devoir.id} du ${devoir.date} (Coefficient: ${devoir.coefficient})`);
                }
            });

            console.log("0. Retour à la sélection de classe");
            console.log("------------------------------");

            const numeroDS = parseInt(prompt("Votre choix ? "));
            if (numeroDS === 0) {
                break;
            }

            if (choixPossibles.includes(numeroDS)) {
                consulterNotesDS(numeroDS);
            }
        }
    }
}

function afficherMenuPrincipal() {
    console.log("Bienvenue dans le gestionnaire de devoirs surveillés.");
    console.log("1. Ajouter un devoir surveillé");
    console.log("2. Consulter un DS");
    console.log("3. Consulter une classe");
    console.log("4. Consulter les notes d'un élève");
    console.log("Q. Quitter");
    console.log("------------------------------");
}

while (true) {
    afficherMenuPrincipal();
    const choix = prompt("Entrez votre choix (1, 2, 3, 4 ou Q) :");

    if (choix === "1") {
        ajouterDS();
    } else if (choix === "2"){
        consulterNotesDS();
    } else if (choix === "3") {
        consulterClasse();
    } else if (choix === "4") {
        //consulterNotesEleve();
    } 
    else if (choix === "Q") {
        quitter();
    } 
}