"use strict";

//Initialisation de mes variables
let imagePrincipale = document.getElementById("imagePrincipale");
let btnSuivant = document.getElementById("suivant");
let btnPrecedent = document.getElementById("precedent");
let btnArret = document.getElementById("arret");
let indexImageEnCours = 0;

//Variable de mes vignettes
let vignette1 = document.getElementById("vignnetteUn");
let vignette2 = document.getElementById("vignnetteDeux");
let vignette3 = document.getElementById("vignnetteTrois");
let vignette4 = document.getElementById("vignnetteQuatre");
let vignette5 = document.getElementById("vignnetteCinq");
let vignette6 = document.getElementById("vignnetteSix");

//Array Path Images Principale
const pathImgPrincipale = ["images/foret.jpg", "images/lac.jpg", "images/montagne.png", "images/plage.png", "images/plaine.jpg", "images/urbbain.jpg"];

//Events
btnSuivant.addEventListener("click", ChangerImagePrincipaleManuelle, false);
btnPrecedent.addEventListener("click", ChangerImagePrincipaleManuelle, false);

//Fonctions
function ChangerImagePrincipaleManuelle(e)
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

function VignetteAfficher(indexImageEnCours)
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