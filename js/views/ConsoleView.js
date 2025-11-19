export class ConsoleView {
    afficherMessage(message) {
        console.log(message);
    }

    afficherTitre(titre) {
        console.log(`\n=== ${titre} ===`);
    }

    afficherSeparateur() {
        console.log("------------------------------");
    }

    afficherListe(items, formatter) {
        items.forEach((item, index) => {
            console.log(`${index + 1}. ${formatter(item)}`);
        });
    }

    demanderEntier(question) {
        return parseInt(prompt(question));
    }

    demanderTexte(question) {
        return prompt(question);
    }

    afficherErreur(message) {
        console.log(`[ERREUR] ${message}`);
    }

    afficherMoyenne(moyenne, label = "Moyenne") {
        if (moyenne !== null) {
            console.log(`${label} : ${moyenne.toFixed(2)}`);
        } else {
            console.log(`${label} : N/A`);
        }
    }

    afficherStatsDevoir(stats) {
        if (!stats) {
            console.log("Aucune note pour ce devoir surveillé.");
            return;
        }
        console.log(`Note minimale : ${stats.min}`);
        console.log(`Note maximale : ${stats.max}`);
        console.log(`Note moyenne : ${stats.moyenne.toFixed(2)}`);
    }
}

export const consoleView = new ConsoleView();
