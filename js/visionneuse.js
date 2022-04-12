"use strict";

//Initialisation de mes variables
let imagePrincipale = document.getElementById("imagePrincipale")
let btnSuivant = document.getElementById("suivant");
let btnPrecedent = document.getElementById("precedent");
let btnArret = document.getElementById("arret");

//Variable de mes vignettes
let vignette1 = document.getElementById("vignetteUn");
let vignette2 = document.getElementById("vignetteDeux");
let vignette3 = document.getElementById("vignetteTrois");
let vignette4 = document.getElementById("vignetteQuatre");
let vignette5 = document.getElementById("vignetteCinq");
let vignette6 = document.getElementById("vignetteSix");

//Events

//Fonctions
function changerImagePrincipale()
{

    imagePrincipale.src="images/lac.jpg";
    if(e.target.id == "suivant")
    {
        imagePrincipale.src="images/lac.jpg";
    }
}