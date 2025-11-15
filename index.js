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

function ajouterDS(){ 
    const date = prompt("Entrez la date du devoir surveillé (jj/mm/aaaa) :");
    const coefficient = parseFloat(prompt("Entrez le coefficient du devoir surveillé :"));
    const nomClasse = prompt("Entrez la classe (ex: 3A, 2B, etc.) :");

    // On récupère la classe si elle existe déjà (nomClasse = nom d'une classe dans la variable classes).
    let classeDevoirSurveille = null;
    for (const classe of classes) {
        if (classe.nom === nomClasse) {
            classeDevoirSurveille = classe;
            break;
        }
    }

    const nombreNotes = parseInt(prompt("Combien de notes voulez-vous entrer ?"));
    const notes = [];
    const eleves = [];

    // On demande les notes (et les élèves si la classe n'existe pas).
    for (let i = 0; i < nombreNotes; i++) {
        if (classeDevoirSurveille === null) {
            let eleveNom = prompt(`Entrez le nom de l'élève ${i + 1} :`);
            let elevePrenom = prompt(`Entrez le prénom de l'élève ${i + 1} :`);

            // On crée un nouvel élève et on l'ajoute à la liste des élèves
            eleves.push(new Eleve(eleveNom, elevePrenom));
        }

        // On demande la note
        let note = parseFloat(prompt(`Entrez la note ${i + 1} :`));
        notes.push(note);
    }

    // Si la classe n'existe pas, on la crée avec les élèves saisis
    if (!classeDevoirSurveille) {
        classeDevoirSurveille = new Classe(nomClasse, eleves);
        classes.push(classeDevoirSurveille);
    }

    // On génère un ID unique pour le devoir surveillé
    const id = devoirsSurveilles.length + 1;
    
    // On crée le devoir surveillé
    const ds = new DevoirSurveille(id, date, coefficient, notes, classeDevoirSurveille);
    devoirsSurveilles.push(ds);
    console.log("Devoir Surveillé créé : ", ds);
    ds.afficherStatsNotes();
}

function consulterNotesDS(num_ds = null) {
    if (devoirsSurveilles.length === 0) {
        console.log("Pas de devoirs surveillés.");
        return;
    }

    if (num_ds === null) {
        num_ds = parseInt(prompt("Quel DS voulez-vous afficher ?"));
    }

    if (num_ds < 1 || num_ds > devoirsSurveilles.length) {
        console.log("Numéro de DS invalide.");
        return;
    }

    const ds = devoirsSurveilles[num_ds - 1];

    console.log(`Devoir Surveillé n°${ds.id} du ${ds.date}`);
    console.log(`Coefficient: ${ds.coefficient}`);
    console.log(`Classe: ${ds.classe.nom}`);
    console.log("Élèves et leurs notes :");
    for (let i = 0; i < ds.notes.length; i++) {
        let eleve = ds.classe.eleves[i];
        let note = ds.notes[i];
        console.log(`${eleve.prenom} ${eleve.nom} : ${note}`);
    }
}

function consulterClasse() {
    while (true) {
        classes.forEach((classe, index) => {
        // classe est l'élément courant, index est son index dans le tableau
            console.log(`${index + 1}. ${classe.nom}`);
        });
        console.log("Q. Retour au menu principal");
        console.log("------------------------------");
        
        const numeroClasse = prompt("Votre choix : ");

        if (numeroClasse.toUpperCase() === "Q") {
            return;
        }

        const indexClasse = parseInt(numeroClasse) - 1;
        if (isNaN(indexClasse) || indexClasse < 0 || indexClasse >= classes.length) {
            console.log("Choix invalide. Veuillez réessayer.");
            return;
        }

        const classeTrouvee = classes[indexClasse];

        while (true) {
            console.log(`Devoirs surveillés pour la classe ${classeTrouvee.nom} :`);
            let choixPossibles = [];
            devoirsSurveilles.forEach((ds) => {
                if (ds.classe === classeTrouvee) {
                    choixPossibles.push(ds.id);
                    console.log(`DS n°${ds.id} du ${ds.date} (Coefficient: ${ds.coefficient})`);
                }
            });
            console.log("0. Retour à la sélection de classe");
            console.log("------------------------------");

            const num_ds = parseInt(prompt("Votre choix ? "));

            if (num_ds === 0) {
                break;
            }

            if (choixPossibles.includes(num_ds)) {
                consulterNotesDS(num_ds);
            }
        }
    }
}

while (true) {
    // START MENU
    console.log("Bienvenue dans le gestionnaire de devoirs surveillés.");
    console.log("1. Ajouter un devoir surveillé");
    console.log("2. Consulter un DS");
    console.log("3. Consulter une classe");
    console.log("4. Consulter les notes d'un élève");
    console.log("Q. Quitter");
    console.log("------------------------------");
    let choix = prompt("Entrez votre choix (1, 2 ou 3) :");

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