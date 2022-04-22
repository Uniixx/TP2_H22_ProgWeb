const formulaire = document.getElementById('formulaire');
const boite_erreur = document.getElementById('boite_erreurs');

const regex_mdp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #=+\(\)\^?&])[A-Za-z\d$@$!%* #=+\(\)\^?&]{3,}$/;

// regex src: https://stackoverflow.com/a/46181/18457167
const regex_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const champs = {
    nom_utilisateur: document.getElementById('nom_utilisateur'),
    mot_de_passe: document.getElementById('mot_de_passe'),
    c_mot_de_passe: document.getElementById('c_mot_de_passe'),
    prenom: document.getElementById('prenom'),
    nom: document.getElementById('nom'),
    email: document.getElementById('email'),
    date_de_naissance: document.getElementById('date_de_naissance'),
    liste_erreur: document.getElementById('liste_erreur'),
    checkbox: document.getElementById('exclus')
}

formulaire.addEventListener('submit', envoyerFormulaire);

function envoyerFormulaire(evt) {
    if (validation()) {
        evt.preventDefault();
    }
}

function validation() {
    let checkboxs = document.querySelectorAll('input[type=checkbox]');
    let erreurs = [];

    checkboxs = filtrerCheckboxs(checkboxs);

    champs.liste_erreur.innerHTML = "";
    boite_erreur.style.display = "none";

    enleverErreurChamps();

    const champsObligatoires = [
        champs.nom_utilisateur,
        champs.mot_de_passe,
        champs.c_mot_de_passe,
        champs.prenom,
        champs.nom,
        champs.date_de_naissance
    ];

    for (let i = 0; i < champsObligatoires.length; i++) {
        let value = champsObligatoires[i].value;
        let id = champsObligatoires[i].id;
        let order = 0;
        let nom_champ = id.replaceAll("_", " ");

        if (nom_champ === "c mot de passe") {
            nom_champ = "confirmation du mot de passe";
        }
        if (verifierChampVide(value)) {
            order = orderId(id);
            erreurs.push({
                message: `Le champ ${nom_champ} ne doit pas être vide.`,
                order: order
            });
            ajouterErreurChamp(champsObligatoires[i]);
        }
    }

    // //1
    // if (verifierChampVide(champs.nom_utilisateur.value)) {
    //     erreurs.push("Le champ nom d'utilisateur ne doit pas être vide.");
    //     ajouterErreurChamp(champs.nom_utilisateur);
    // }

    // //2
    // if (verifierChampVide(champs.mot_de_passe.value)) {
    //     erreurs.push("Le champ mot de passe ne doit pas être vide.");
    //     ajouterErreurChamp(champs.mot_de_passe);
    // }

    //3
    if (!champs.mot_de_passe.value.match(regex_mdp)) {
        erreurs.push({ message: "Le champ mot de passe doit contenir au minimum un chiffre et un charactère spécial.", order: 3 });
        ajouterErreurChamp(champs.mot_de_passe);
    }

    //4
    if (verifierChampVide(champs.c_mot_de_passe.value)) {
        erreurs.push({ message: "Le champ de confirmation de mot de passe ne doit pas être vide.", order: 4 });
        ajouterErreurChamp(champs.c_mot_de_passe);
    }

    //5
    if (champs.c_mot_de_passe.value !== champs.mot_de_passe.value) {
        erreurs.push({ message: "Les champs mot de passe et confirmation de mot de passe doivent être identique.", order: 5 });
        ajouterErreurChamp(champs.c_mot_de_passe);
    }

    //6
    // if (verifierChampVide(champs.prenom.value)) {
    //     erreurs.push("Le champ prénom ne doit pas être vide.");
    //     ajouterErreurChamp(champs.prenom);
    // }

    //7
    // if (verifierChampVide(champs.nom.value)) {
    //     erreurs.push("Le champ nom ne doit pas être vide.");
    //     ajouterErreurChamp(champs.nom);
    // }
    //8
    if (!verifierChampVide(champs.email.value) && !champs.email.value.match(regex_email)) {
        erreurs.push({ message: "Le champ courriel doit être valide (abc@abc.com).", order: 8 });
        ajouterErreurChamp(champs.email);
    }

    // //9
    // if (verifierChampVide(champs.date_de_naissance.value)) {
    //     erreurs.push("Le champ date de naissance ne doit pas être vide.");
    //     ajouterErreurChamp(champs.date_de_naissance);
    // }

    let date = new Date(champs.date_de_naissance.value.replace("-", " "));
    let dateAuj = new Date();
    dateAuj.setHours(0, 0, 0, 0);

    // 10
    if (!isNaN(date) && !isNaN(dateAuj)) {
        if (date > dateAuj || date.toISOString() === dateAuj.toISOString()) {
            erreurs.push({ message: "La date de naissance doit être inférieur à aujourd'hui.", order: 10 });
            ajouterErreurChamp(champs.date_de_naissance);
        }
    }

    // 11
    if (verifierChampVide(checkboxs) || checkboxs.length > 2) {
        erreurs.push({ message: "Le champ préférences doit avoir entre une et deux cases cochées", order: 11 });
        ajouterErreurChamp(champs.checkbox);
    }

    if (erreurs.length > 0) {
        erreurs.sort((a, b) => a.order > b.order);
        boite_erreur.style.display = "block";
        erreurs.forEach(erreur => {
            champs.liste_erreur.innerHTML += `<li>${erreur.message}</li>`;
        });
    }

    return erreurs.length > 0;
}

function verifierChampVide(champ) {
    return champ.length === 0;
}

function filtrerCheckboxs(checks) {
    let resultat = [];
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            resultat.push(checks[i]);
        }
    }

    return resultat;
}

function ajouterErreurChamp(champ) {
    champ.classList.add('error');
}

function enleverErreurChamps() {
    for (const prop in champs) {
        let classes = champs[prop].classList;
        if (classes.contains('error')) {
            classes.remove('error');
        }
    }
}

function orderId(id) {
    let order = 0;
    switch (id) {
        case "nom_utilisateur":
            order = 1;
            break;
        case "mot_de_passe":
            order = 2;
            break;
        case "c_mot_de_passe":
            order = 4;
            break;
        case "prenom":
            order = 6;
            break;
        case "nom":
            order = 7;
            break;
        case "date_de_naissance":
            order = 9;
            break;
    }
    return order;
}