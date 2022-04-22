"use strict";

/*                  Initialisation de mes variables                 */
let imagePrincipale = document.getElementById("imagePrincipale");
let btnSuivant = document.getElementById("suivant");
let btnPrecedent = document.getElementById("precedent");
let btnArret = document.getElementById("arret");
let lstDeroulanteVitesseVisionneuse = document.getElementById("vitesseVisionneuse");
let vitesseSelectionne = lstDeroulanteVitesseVisionneuse.value;
let spanStatut = document.getElementById("spStatut");
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
    switch (indexImageEnCours) {
        case 0:
            vignette1.className = "imageEnCours";
            break;
        case 1:
            vignette2.className = "imageEnCours";
            break;

        case 2:
            vignette3.className = "imageEnCours";
            break;

        case 3:
            vignette4.className = "imageEnCours";
            break;

        case 4:
            vignette5.className = "imageEnCours";
            break;

        case 5:
            vignette6.className = "imageEnCours";
            break;
        default:
            break;
    }
}

function RetirerClassesVignettes() {
    if (vignette1.className === "imageEnCours") 
    {
        vignette1.className = "";
    } else if (vignette2.className === "imageEnCours") 
    {
        vignette2.className = "";
    } else if (vignette3.className === "imageEnCours") 
    {
        vignette3.className = "";
    } else if (vignette4.className === "imageEnCours") 
    {
        vignette4.className = "";
    } else if (vignette5.className === "imageEnCours") 
    {
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
        spanStatut.className = "chgAutoDesactivé";
        spanStatut.textContent = "Inactif"
        changerImageAutomatiqueTrueFalse = false;
        clearInterval(timer);
    } else {
        btnArret.textContent = "Arrêt";
        spanStatut.textContent = "Actif"
        spanStatut.className = "chgAutoActif";
        changerImageAutomatiqueTrueFalse = true;

        switch (vitesseSelectionne) {
            case "lent":
                clearInterval(timer);
                timer = setInterval(ChangerImageAutomatique, vitesseLente);
                break;

            case "moyen":
                clearInterval(timer);
                timer = setInterval(ChangerImageAutomatique, vitesseMoyenne);
                break;

            case "rapide":
                clearInterval(timer);
                timer = setInterval(ChangerImageAutomatique, vitesseRapide);
                break;
        
            default:
                break;
        }
    }
}

function ChangerVitesseVisionneuse(e) {

    switch (e.target.value) {
        case "lent":
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseLente);
            break;

        case "moyen":
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseMoyenne);
            break;

        case "rapide":
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseRapide);
            break;

        default:
            break;
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