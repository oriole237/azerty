let zoneProposition = document.querySelector(".zoneProposition");
let optionSource = document.querySelectorAll(".optionSource input");
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

btnEnvoyerMail.addEventListener("click", function(e){
	e.preventDefault();
	let email = document.getElementById("#email");
	let nom = document.getElementById("nom");

	if(email.value == "" || email.value == null || email.value == undefined){
		email.style.border = "1px solid black";
	}

	if(nom.value == "" || nom.value == null || nom.value == undefined){
		nom.style.border = "1px solid black";
	}

	if(nom != "" && email != ""){
		console.log("yes");
	}
});

share.addEventListener("click", function(){
	popupBackground.style.display = "block";
});


optionSource.forEach(function(elt, i){
	comptMots = 0;

	//mise à jour du jeux si changement de choix (mots ou phrase)
	elt.addEventListener("click", function(){
		resetAll();

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

reset.addEventListener("click", function(){
	resetAll();
	optionSource.forEach(function(elt, i){
		elt.checked = false;
	});
});

function launchGame(elt){
	playGame(elt, currentTab);
	if(comptMots == currentTab.length){
		if(score == currentTab.length){
			zoneScore.innerText = score + "/" + currentTab.length + " "+congratulations+flowers;

		}else{
			zoneProposition.innerText = "Game over !"
		}
		
	}
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
	nbr = 1;
	zoneProposition.innerText = "Let's start";
	zoneScore.innerText = score;
	inputEcriture.value = "";
}


function playGame(elt, dataTab){

	if(comptMots == 0){
		zoneProposition.innerText = dataTab[0];
	}

	if(elt.checked == true){
		if(comptMots != dataTab.length){

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


