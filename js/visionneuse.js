"use strict";

/*                  Initialisation de mes variables                 */
let imagePrincipale = document.getElementById("imagePrincipale");
let btnSuivant = document.getElementById("suivant");
let btnPrecedent = document.getElementById("precedent");
let btnArret = document.getElementById("arret");
let lstDeroulanteVitesseVisionneuse = document.getElementById("vitesseVisionneuse");
let vitesseSelectionne = lstDeroulanteVitesseVisionneuse.value;
let changerImageAutomatiqueTrueFalse = true;
let indexImageEnCours = 0;

/*                  Variable de mes vignettes                   */
let vignette1 = document.getElementById("vignnetteUn");
let vignette2 = document.getElementById("vignnetteDeux");
let vignette3 = document.getElementById("vignnetteTrois");
let vignette4 = document.getElementById("vignnetteQuatre");
let vignette5 = document.getElementById("vignnetteCinq");
let vignette6 = document.getElementById("vignnetteSix");

/*                  Tableaux de variables                   */
const tabBtnSuivantPrecedent = [btnSuivant, btnPrecedent];
const tabVignettes = [vignette1, vignette2, vignette3, vignette4, vignette5, vignette6];
const pathImgPrincipale = ["images/foret.jpg", "images/lac.jpg", "images/montagne.png", "images/plage.png", "images/plaine.jpg", "images/urbbain.jpg"];

/*                         Minuterie                    */
const vitesseLente = 1500;
const vitesseMoyenne = 1000;
const vitesseRapide = 500;
let timer = setInterval(ChangerImageAutomatique, vitesseMoyenne);

/*                  Création de mes events                  */
btnArret.addEventListener("click", ActiverDesactiverChangementAutomatique, false);
lstDeroulanteVitesseVisionneuse.addEventListener("change", ChangerVitesseVisionneuse, false);

for (let indexTabBtn = 0; indexTabBtn < tabBtnSuivantPrecedent.length; indexTabBtn++) {
    tabBtnSuivantPrecedent[indexTabBtn].addEventListener("click", ChangerImgPrincipaleSuivantPrecedent, false);
    tabBtnSuivantPrecedent[indexTabBtn].addEventListener("click", DelaiTroisSecondesMinuterie, false);
}

for (let indexTabVignettes = 0; indexTabVignettes < tabVignettes.length; indexTabVignettes++) {
    tabVignettes[indexTabVignettes].addEventListener("click", CliqueVignetteChangeImgPrincipale, false);
    tabVignettes[indexTabVignettes].addEventListener("click", DelaiTroisSecondesMinuterie, false);
}

/*                  Fonctions                   */
function ChangerImgPrincipaleSuivantPrecedent(e) {
    RetirerClassesVignettes();

    let nouvelleImage = "";
    indexImageEnCours = IndexImagePrincipaleEnCours();

    if (e.target.id === "suivant") {
        if (indexImageEnCours == 5) {
            nouvelleImage = pathImgPrincipale[0];
            indexImageEnCours = 0;
        } else {
            nouvelleImage = pathImgPrincipale[++indexImageEnCours];
        }
    }

    if (e.target.id === "precedent") {
        if (indexImageEnCours == 0) {
            nouvelleImage = pathImgPrincipale[5];
            indexImageEnCours = 5;
        } else {
            nouvelleImage = pathImgPrincipale[--indexImageEnCours];
        }
    }

    AfficherBordureVignettes(indexImageEnCours);
    imagePrincipale.src = nouvelleImage;
}

//Retourne l'index du array de path [0] à [5]
function IndexImagePrincipaleEnCours() {
    for (let index = 0; index < pathImgPrincipale.length; index++) {
        if (imagePrincipale.src == pathImgPrincipale[index]) {
            indexImageEnCours = index;
        }
    }

    return indexImageEnCours;
}

//Affiche la bordure rouge autour de la vignette en cours
function AfficherBordureVignettes() {
    if (indexImageEnCours == 0) {
        vignette1.className = "imageEnCours";
    } else if (indexImageEnCours == 1) {
        vignette2.className = "imageEnCours";
    } else if (indexImageEnCours == 2) {
        vignette3.className = "imageEnCours";
    } else if (indexImageEnCours == 3) {
        vignette4.className = "imageEnCours";
    } else if (indexImageEnCours == 4) {
        vignette5.className = "imageEnCours";
    } else if (indexImageEnCours == 5) {
        vignette6.className = "imageEnCours";
    }
}

function RetirerClassesVignettes() {
    if (vignette1.className === "imageEnCours") {
        vignette1.className = "";
    } else if (vignette2.className === "imageEnCours") {
        vignette2.className = "";
    } else if (vignette3.className === "imageEnCours") {
        vignette3.className = "";
    } else if (vignette4.className === "imageEnCours") {
        vignette4.className = "";
    } else if (vignette5.className === "imageEnCours") {
        vignette5.className = "";
    } else {
        vignette6.className = "";
    }
}

function CliqueVignetteChangeImgPrincipale(e) {
    RetirerClassesVignettes();

    switch (e.target.id) {
        case ("vignnetteUn"):
            imagePrincipale.src = pathImgPrincipale[0];
            indexImageEnCours = 0;
            break;

        case ("vignnetteDeux"):
            imagePrincipale.src = pathImgPrincipale[1];
            indexImageEnCours = 1;
            break;

        case ("vignnetteTrois"):
            imagePrincipale.src = pathImgPrincipale[2];
            indexImageEnCours = 2;
            break;

        case ("vignnetteQuatre"):
            imagePrincipale.src = pathImgPrincipale[3];
            indexImageEnCours = 3;
            break;

        case ("vignnetteCinq"):
            imagePrincipale.src = pathImgPrincipale[4];
            indexImageEnCours = 4;
            break;

        case ("vignnetteSix"):
            imagePrincipale.src = pathImgPrincipale[5];
            indexImageEnCours = 5;
            break;

        default:
            break;
    }

    AfficherBordureVignettes(indexImageEnCours);

}

function ChangerImageAutomatique() {
    if (changerImageAutomatiqueTrueFalse == true) {
        indexImageEnCours = IndexImagePrincipaleEnCours();

        let nouvelleImage = "";

        if (indexImageEnCours == 5) {
            nouvelleImage = pathImgPrincipale[0];
            indexImageEnCours = 0;
        } else {
            nouvelleImage = pathImgPrincipale[++indexImageEnCours];
        }

        RetirerClassesVignettes();
        imagePrincipale.src = nouvelleImage;
        AfficherBordureVignettes();
    }
}

function ActiverDesactiverChangementAutomatique() {

    vitesseSelectionne = lstDeroulanteVitesseVisionneuse.value;

    if (btnArret.textContent == "Arrêt") {
        btnArret.textContent = "Activer";
        changerImageAutomatiqueTrueFalse = false;
        clearInterval(timer);
    } else {
        btnArret.textContent = "Arrêt";
        changerImageAutomatiqueTrueFalse = true;

        if (vitesseSelectionne == "lent") {
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseLente);
        } else if (vitesseSelectionne == "moyen") {
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseMoyenne);
        } else if (vitesseSelectionne == "rapide") {
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseRapide);
        }

    }
}

function ChangerVitesseVisionneuse(e) {
    if (e.target.value == "lent") {
        clearInterval(timer);
        timer = setInterval(ChangerImageAutomatique, vitesseLente);
    }

    if (e.target.value == "moyen") {
        clearInterval(timer);
        timer = setInterval(ChangerImageAutomatique, vitesseMoyenne);
    }

    if (e.target.value == "rapide") {
        clearInterval(timer);
        timer = setInterval(ChangerImageAutomatique, vitesseRapide);
    }
}

function DelaiTroisSecondesMinuterie() {
    if (btnArret.textContent == "Arrêt") {
        clearInterval(timer);

        if (lstDeroulanteVitesseVisionneuse.value === "lent") {
            timer = setTimeout(RelancerVisionneuse, 1500);
        } else if (lstDeroulanteVitesseVisionneuse.value === "moyen") {
            timer = setTimeout(RelancerVisionneuse, 2000);
        } else {
            timer = setTimeout(RelancerVisionneuse, 2500);
        }

    }
}

function RelancerVisionneuse() {
    if (lstDeroulanteVitesseVisionneuse.value === "lent") {
        timer = setInterval(ChangerImageAutomatique, vitesseLente);
    } else if (lstDeroulanteVitesseVisionneuse.value === "moyen") {
        timer = setInterval(ChangerImageAutomatique, vitesseMoyenne);
    } else {
        timer = setInterval(ChangerImageAutomatique, vitesseRapide);
    }
}