"use strict";

//Initialisation de mes variables
let imagePrincipale = document.getElementById("imagePrincipale");
let btnSuivant = document.getElementById("suivant");
let btnPrecedent = document.getElementById("precedent");
let btnArret = document.getElementById("arret");
let indexImageEnCours = 0;

//Variable de mes vignettes
let vignette1 = document.getElementById("vignetteUn");
let vignette2 = document.getElementById("vignetteDeux");
let vignette3 = document.getElementById("vignetteTrois");
let vignette4 = document.getElementById("vignetteQuatre");
let vignette5 = document.getElementById("vignetteCinq");
let vignette6 = document.getElementById("vignetteSix");

//Array Path Images Principale
const un = "images/foret.jpg";
const deux = "images/lac.jpg";
const trois = "images/montagne.png";
const quatre = "images/plage.png";
const cinq = "images/plaine.jpg";
const six = "images/urbbain.jpg";
const pathImgPrincipale = [un, deux, trois, quatre, cinq, six];

//Events
btnSuivant.addEventListener("click", ChangerImagePrincipaleManuelle, false);
btnPrecedent.addEventListener("click", ChangerImagePrincipaleManuelle, false);

//Fonctions
function ChangerImagePrincipaleManuelle(e)
{
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
