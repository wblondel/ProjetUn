class DevoirSurveille {
    constructor(id, date, coefficient, notes, classe) {
        this.id = id;
        this.date = date;
        this.coefficient = coefficient;
        this.notes = notes;
        this.classe = classe;
    }

    afficherStatsNotes() {
        const NotesMin = Math.min(...this.notes);
        const NotesMax = Math.max(...this.notes);
        const NotesMoy = this.notes.reduce((a, b) => a + b, 0) / this.notes.length;

        console.log("Note minimale :", NotesMin);
        console.log("Note maximale :", NotesMax);
        console.log("Note moyenne :", NotesMoy);
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
let classes = [];
let devoirsSurveilles = [];

function quitter() {
    console.log("Au revoir !");
    throw new Error("Programme terminé par l'utilisateur.");
}

function ajouterDS(){ 
    const date = prompt("Entrez la date du devoir surveillé (jj/mm/aaaa) :");
    const coefficient = parseFloat(prompt("Entrez le coefficient du devoir surveillé :"));
    const nomClasse = prompt("Entrez la classe (ex: 3A, 2B, etc.) :");

    // On récupère la classe si elle existe déjà (nomClasse = nom d'une classe dans classes)
    let classeDevoirSurveille = null;
    for (const classe of classes) {
        if (classe.nom == nomClasse) {
            classeDevoirSurveille = classe;
            break;
        }
    }

    const nombreNotes = parseInt(prompt("Combien de notes voulez-vous entrer ?"));
    const notes = [];
    const eleves = [];

    // On demande les notes (et les élèves si la classe n'existe pas)
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

function consulterNotesDS() {
    if (devoirsSurveilles.length === 0) {
        console.log("Pas de devoirs surveillés.");
        return;
    }

    const num_ds = parseInt(prompt("Quel DS voulez-vous afficher ?"));
    
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

while (true) {
    // START MENU
    console.log("Bienvenue dans le gestionnaire de devoirs surveillés.");
    console.log("1. Ajouter un devoir surveillé");
    console.log("2. Consulter notes du DS");
    console.log("3. Quitter");
    let choix = prompt("Entrez votre choix (1, 2 ou 3) :");

    if (choix == "1") {
        ajouterDS();
    } else if (choix == "2"){
        consulterNotesDS();
    } else if (choix == "3") {
        quitter();
    }
}