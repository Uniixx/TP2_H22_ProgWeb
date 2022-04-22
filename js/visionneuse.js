"use strict";

//Initialisation de mes variables
let imagePrincipale = document.getElementById("imagePrincipale");
let btnSuivant = document.getElementById("suivant");
let btnPrecedent = document.getElementById("precedent");
let btnArret = document.getElementById("arret");
let indexImageEnCours = 0;
let vitesseImageAutomatique = document.getElementById("vitesseVisionneuse");
let changerImageAutomatiqueTrueFalse = true;
let vitesseDeBase = vitesseImageAutomatique.value;
let vitesseSelectionne = vitesseImageAutomatique.value;

//Variable de mes vignettes
let vignette1 = document.getElementById("vignnetteUn");
let vignette2 = document.getElementById("vignnetteDeux");
let vignette3 = document.getElementById("vignnetteTrois");
let vignette4 = document.getElementById("vignnetteQuatre");
let vignette5 = document.getElementById("vignnetteCinq");
let vignette6 = document.getElementById("vignnetteSix");
const tabVignettes = [vignette1, vignette2, vignette3, vignette4, vignette5, vignette6];

const pathImgPrincipale = ["images/foret.jpg", "images/lac.jpg", "images/montagne.png", "images/plage.png", "images/plaine.jpg", "images/urbbain.jpg"];

//Minuterie
const vitesseLente = 1500;
const vitesseMoyenne = 1000;
const vitesseRapide = 500;
let timer = setInterval(ChangerImageAutomatique, vitesseMoyenne);

//Events
btnSuivant.addEventListener("click", ChangerImgPrincipaleSuivantPrecedent, false);
btnPrecedent.addEventListener("click", ChangerImgPrincipaleSuivantPrecedent, false);
btnArret.addEventListener("click", ActiverDesactiverChangementAutomatique, false);
vitesseImageAutomatique.addEventListener("change", ChangerVitesseVisionneuse, false);

for (let indexTabVignettes = 0; indexTabVignettes < tabVignettes.length; indexTabVignettes++) {
    tabVignettes[indexTabVignettes].addEventListener("click", CliqueVignetteChangeImgPrincipale, false);
}

//Fonctions
function ChangerImgPrincipaleSuivantPrecedent(e)
{
    RetirerClassVignettes();

    let nouvelleImage = "";
    indexImageEnCours = IndexImagePrincipaleEnCours();

    if(e.target.id === "suivant")
    {
        if(indexImageEnCours == 5)
        {
            nouvelleImage = pathImgPrincipale[0];
            indexImageEnCours = 0;
        }
        else
        {
            nouvelleImage = pathImgPrincipale[++indexImageEnCours];
        }
    }

    if (e.target.id === "precedent")
    {
        if (indexImageEnCours == 0)
        {
            nouvelleImage = pathImgPrincipale[5];
            indexImageEnCours = 5;
        }
        else
        {
            nouvelleImage = pathImgPrincipale[--indexImageEnCours];
        }
    }

    VignetteAfficher(indexImageEnCours);
    imagePrincipale.src = nouvelleImage;
}

//Retourne l'index du array de path [0] à [5]
function IndexImagePrincipaleEnCours()
{
    for (let index = 0; index < pathImgPrincipale.length; index++)
    {
        if (imagePrincipale.src == pathImgPrincipale[index])
        {
            indexImageEnCours = index;
        }
    }

    return indexImageEnCours;
}

//Affiche la bordure rouge autour de la vignette en cours
function VignetteAfficher()
{
    if (indexImageEnCours == 0)
    {
        vignette1.className = "imageEnCours";
    }
    else if (indexImageEnCours == 1)
    {
        vignette2.className = "imageEnCours";
    }
    else if (indexImageEnCours == 2)
    {
        vignette3.className = "imageEnCours";
    }
    else if (indexImageEnCours == 3)
    {
        vignette4.className = "imageEnCours";
    }
    else if (indexImageEnCours == 4)
    {
        vignette5.className = "imageEnCours";
    }
    else if (indexImageEnCours == 5)
    {
        vignette6.className = "imageEnCours";
    }
}

function RetirerClassVignettes()
{
    vignette1.className = "";
    vignette2.className = "";
    vignette3.className = "";
    vignette4.className = "";
    vignette5.className = "";
    vignette6.className = "";
}

function CliqueVignetteChangeImgPrincipale(e)
{
    RetirerClassVignettes();

    switch (e.target.id) 
    {
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

    VignetteAfficher(indexImageEnCours);

}

function ChangerImageAutomatique()
{
    if(changerImageAutomatiqueTrueFalse == true)
    {
        indexImageEnCours = IndexImagePrincipaleEnCours();

        let nouvelleImage = "";

        if (indexImageEnCours == 5)
        {
            nouvelleImage = pathImgPrincipale[0];
            indexImageEnCours = 0;
        }
        else
        {
            nouvelleImage = pathImgPrincipale[++indexImageEnCours];
        }
        
        RetirerClassVignettes();
        imagePrincipale.src = nouvelleImage;
        VignetteAfficher();
    }
}

function ActiverDesactiverChangementAutomatique(e)
{
    if(e.target.textContent == "Arrêt")
    {
        console.log(vitesseSelectionne);
        e.target.textContent = "Activer";
        changerImageAutomatiqueTrueFalse = false;
        clearInterval(timer);
    }
    else
    {
        console.log(vitesseSelectionne);
        e.target.textContent = "Arrêt";
        changerImageAutomatiqueTrueFalse = true;

        if(vitesseSelectionne == "moyen")
        {
            vitesseSelectionne = vitesseMoyenne;
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseSelectionne);
        }
        else
        {
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseSelectionne);
        }
        
    }
}

function ChangerVitesseVisionneuse(e)
{
        if(e.target.value == "lent")
        {
            vitesseSelectionne = vitesseLente;
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseSelectionne);
        }

        if(e.target.value == "moyen")
        {
            vitesseSelectionne = vitesseMoyenne;
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseSelectionne);
        }

        if(e.target.value == "rapide")
        {
            vitesseSelectionne = vitesseRapide;
            clearInterval(timer);
            timer = setInterval(ChangerImageAutomatique, vitesseSelectionne);
        }
}