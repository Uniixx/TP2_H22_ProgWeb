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

    if (verifierChampVide(champs.nom_utilisateur.value)) {
        erreurs.push("Le champ nom d'utilisateur ne doit pas être vide.");
        ajouterErreurChamp(champs.nom_utilisateur);
    }

    if (verifierChampVide(champs.mot_de_passe.value)) {
        erreurs.push("Le champ mot de passe ne doit pas être vide.");
        ajouterErreurChamp(champs.mot_de_passe);
    }

    if (!champs.mot_de_passe.value.match(regex_mdp)) {
        erreurs.push("Le champ mot de passe doit contenir au minimum un chiffre et un charactère spécial.");
        ajouterErreurChamp(champs.mot_de_passe);
    }

    if (verifierChampVide(champs.c_mot_de_passe.value)) {
        erreurs.push("Le champ de confirmation de mot de passe ne doit pas être vide.");
        ajouterErreurChamp(champs.c_mot_de_passe);
    }

    if (champs.c_mot_de_passe.value !== champs.mot_de_passe.value) {
        erreurs.push("Les champs mot de passe et confirmation de mot de passe doivent être identique.");
        ajouterErreurChamp(champs.c_mot_de_passe);
    }

    if (verifierChampVide(champs.prenom.value)) {
        erreurs.push("Le champ prénom ne doit pas être vide.");
        ajouterErreurChamp(champs.prenom);
    }

    if (verifierChampVide(champs.nom.value)) {
        erreurs.push("Le champ nom ne doit pas être vide.");
        ajouterErreurChamp(champs.nom);
    }

    if (!verifierChampVide(champs.email.value) && !champs.email.value.match(regex_email)) {
        erreurs.push("Le champ courriel doit être valide (abc@abc.com).");
        ajouterErreurChamp(champs.email);
    }

    if (verifierChampVide(champs.date_de_naissance.value)) {
        erreurs.push("Le champ date de naissance ne doit pas être vide.");
        ajouterErreurChamp(champs.date_de_naissance);
    }

    let date = new Date(champs.date_de_naissance.value.replace("-", " "));
    let dateAuj = new Date();
    dateAuj.setHours(0, 0, 0, 0);

    if (!isNaN(date) && !isNaN(dateAuj)) {
        if (date > dateAuj || date.toISOString() === dateAuj.toISOString()) {
            erreurs.push("La date de naissance doit être inférieur à aujourd'hui.");
            ajouterErreurChamp(champs.date_de_naissance);
        }
    }

    if (verifierChampVide(checkboxs) || checkboxs.length > 2) {
        erreurs.push("Le champ préférences doit avoir entre une et deux cases cochées");
        ajouterErreurChamp(champs.checkbox);
    }

    if (erreurs.length > 0) {
        boite_erreur.style.display = "block";
        erreurs.forEach(erreur => {
            champs.liste_erreur.innerHTML += `<li>${erreur}</li>`;
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