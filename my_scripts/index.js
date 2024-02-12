let zoneProposition = document.querySelector(".zoneProposition");
let optionSource = document.querySelectorAll(".optionSource input");
let optionSourceDiv = document.querySelector(".optionSource");
const listeMots = ["bonjour", "parler", "chanter"];
const listePhrases = ["Bienvenue aux Lions", "Chaque jour est idéal", "Toujours dire merci"];
let btnValiderMot = document.getElementById("btnValiderMot");
let inputEcriture = document.getElementById("inputEcriture");
let zoneScore = document.querySelector(".zoneScore span");
let comptMots = 0;
let score = 0;
let reset = document.querySelector(".reset");
let delayMots = 4000*listeMots.length;
let delayPhrases = 4000*listePhrases.length;
let currentDelayMot = 0;
let CurrentDelayPhrase = 0;
let nbr = 1;
let popupBackground = document.querySelector(".popupBackground");
// Unicode representation of emojis
const smileyFace = '\u{1F600}';
const heart = '\u{2764}';
const thumbsUp = '\u{1F44D}';
const congratulations = '\u{1F389}';
const flowers = '\u{1F490}';

let currentTab = [];
const share = document.querySelector(".share");
const btnEnvoyerMail = document.querySelector("#btnEnvoyerMail");
let email = document.getElementById("email");
let nom = document.getElementById("nom");
let emailError = document.getElementById("email-error");
let nbrNotChecked = 0;// si au moins un radio bouton est checked
let nbrParse = 0; //si on a déjà parcouru tous les boutons d'action pour inserer les event lors du reload page


nom.addEventListener('focus', function(e){
	nom.style.border = "";
});

email.addEventListener('focus', function(e){
	email.style.border = "";
	emailError.innerText = "";
});

//envoi du score par mail
btnEnvoyerMail.addEventListener("click", function(e){
	e.preventDefault();
	let isEmail = false;

	//test si le champ email est bien rempli
	if(email.value == "" || email.value == null || email.value == undefined){
		email.style.border = "2px solid #002D7F";

	}else{ //check si la valeur entrée est de type email
		isEmail = controlEmail(email.value);
		if(!isEmail){
			emailError.innerText = "L'email est invalide";
			email.style.border = "2px solid #002D7F";
		}
	}

	//check si le nom du destinataire est bien rempli
	if(nom.value == "" || nom.value == null || nom.value == undefined){
		nom.style.border = "2px solid #002D7F";
	}

	if(nom.value != "" && isEmail){
		// let link = document.createElement("a");
		window.location.href="mailto:"+email.value+ "?subject="+encodeURIComponent("Score obtenu au jeu AZERTYPE")+
		"&body="+encodeURIComponent("Cher "+nom.value+", je te partage mon niveau atteint aujourd'hui.");
		// popupBackground.appendChild(link);
		// link.click();
	}
});

// ouverture du modal d'envoi du score par mail
share.addEventListener("click", function(){
	popupBackground.style.display = "block";

});

// dans le cas où on click hors du modal d'envoi de mail, fermer ce dernier
popupBackground.addEventListener("click", function(e){
	if(e.target.classList.contains("popupBackground")){
		popupBackground.style.display = "none";
		email.value = "";
		nom.value = "";
		nom.style.border = "";
		email.style.border = "";
		emailError.innerText = "";
	}
});



optionSource.forEach(function(elt, i){
	
	comptMots = 0;
	nbrParse++;

	//mise à jour du jeux si changement de choix (mots ou phrase)
	elt.addEventListener("click", function(){
		resetAll();
		nbrNotChecked++;
		nbrParse = 2;

		if(elt.value == 1){
		// 	initializeGame(listeMots);
			zoneProposition.innerText = listeMots[0];
			currentTab = [...listeMots];

		}else{
		// 	initializeGame(listePhrases);
			zoneProposition.innerText = listePhrases[0];
			currentTab = [...listePhrases];
		}

	});

	btnValiderMot.addEventListener("click", function(event){
	   launchGame(elt);
	});	

	inputEcriture.addEventListener("keypress", function(event){
		if(event.keyCode == 13){
			launchGame(elt);
		}
		
	});
});

//reinitailisation du jeu
reset.addEventListener("click", function(){
	resetAll();
	optionSource.forEach(function(elt, i){
		elt.checked = false;
	});
});

// tester la validité de la syntaxe de l'email
function controlEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    return emailRegExp.test(email);
}

function launchGame(elt){

	if(elt.checked){
		nbrNotChecked++;
		playGame(elt, currentTab);
		if(comptMots == currentTab.length){
			if(score == currentTab.length){
				zoneScore.innerText = score + "/" + currentTab.length + " "+congratulations+flowers;

			}else{
				zoneProposition.innerText = "Game over !";
			}
			
		}
	}else{
		if(nbrParse == 2 && nbrNotChecked == 0){
			errorChoice();
		}
	}
	
}

function errorChoice(){
	setTimeout(() => {
		optionSourceDiv.style.borderTop = "2px solid white";
	}, 100);
	setTimeout(() => {
		optionSourceDiv.style.borderRight = "2px solid white";
	}, 200);
	setTimeout(() => {
		optionSourceDiv.style.borderBottom = "2px solid white";
	}, 300);
	setTimeout(() => {
		optionSourceDiv.style.borderLeft = "2px solid white";
	}, 400);

	
	setTimeout(() => {
		optionSourceDiv.style.borderTop = "2px solid #f68e5f";
	}, 450);
	setTimeout(() => {
		optionSourceDiv.style.borderRight = "2px solid #f68e5f";
	}, 500);
	setTimeout(() => {
		optionSourceDiv.style.borderBottom = "2px solid #f68e5f";
	}, 550);
	setTimeout(() => {
		optionSourceDiv.style.borderLeft = "2px solid #f68e5f";
	}, 600);

	
	setTimeout(() => {
		optionSourceDiv.style.borderTop = "2px solid white";
	}, 700);
	setTimeout(() => {
		optionSourceDiv.style.borderRight = "2px solid white";
	}, 800);
	setTimeout(() => {
		optionSourceDiv.style.borderBottom = "2px solid white";
	}, 900);
	setTimeout(() => {
		optionSourceDiv.style.borderLeft = "2px solid white";
	}, 1000);
	

	setTimeout(() => {
		optionSourceDiv.style.border = "2px solid #f68e5f";
	}, 1300);
}

function duplicateStringByTime(chaine, interval, tempsLimite) {
  const startTime = Date.now();
  let currentTime = startTime;
  let duplicatedString = chaine.repeat(10);

  while (currentTime - startTime < tempsLimite) {
    console.log(duplicatedString);
    
    currentTime = Date.now();
    if (currentTime - startTime + interval > tempsLimite) {
      break;
    }
    setTimeout(() => {}, interval);
  }
}

function danserChaine(chaine) {
  const frames = ["|", "/", "-", "\\"];
  let frameIndex = 0;

  const interval = setInterval(() => {
    // process.stdout.write(`\r${frames[frameIndex]} ${chaine}`);
    console.log(`\r${frames[frameIndex]} ${chaine}\n`)
    frameIndex = (frameIndex + 1) % frames.length;
  }, 10);

  setTimeout(() => {
    clearInterval(interval);
    // process.stdout.write(`\r${chaine}\n`);
    console.log(`\r${chaine}\n`)
  }, chaine.length * 10);
}


function initializeGame(tabs){
	currentDelayMot = 0;

	while(currentDelayMot <= delayMots){
		controlTime(tabs, currentDelayMot);
		currentDelayMot = 4000*nbr;
		nbr++; 
	}
}

function controlTime(tabs, del){
	
	setTimeout(function() {
		if(comptMots < tabs.length){
			zoneProposition.innerText = tabs[comptMots];
		}
		
		comptMots++;
	}, del);
	
}

function resetAll(){
	comptMots = 0;
	score = 0;
	currentDelayMot = 0;
	nbrNotChecked = 0;
	nbr = 1;
	zoneProposition.innerText = "Let's start";
	zoneScore.innerText = score;
	inputEcriture.value = "";
}


function playGame(elt, dataTab){

	if(comptMots == 0){
		zoneProposition.innerText = dataTab[0];
	}

	if(elt.checked){
		if(comptMots < dataTab.length){

			if(dataTab[comptMots] == inputEcriture.value.trim()){
				score++;
			}
		}

		//adjuster le chronometre pour le prochain mot
		// nbr++;
		// currentDelayMot = 4000*nbr;
		// controlTime(dataTab, currentDelayMot)
		comptMots++;
	
		//afficher le prochain mot selon le tableau deja parcouru
		if(comptMots < dataTab.length){
			zoneProposition.innerText = dataTab[comptMots];
		}else{
			zoneProposition.innerText = "End !!";
			elt.checked = false;
		}
		
		//mise à jour continue du score et du champ de remplissage
		inputEcriture.value = "";
		zoneScore.innerText = score + "/" + dataTab.length;
	}
	
}
