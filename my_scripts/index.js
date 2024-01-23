var zoneProposition = document.querySelector(".zoneProposition");
var optionSource = document.querySelectorAll(".optionSource input");
const listeMots = ["bonjour", "parler", "chanter"];
const listePhrases = ["Bienvenue aux Lions", "Chaque jour est idéal", "Toujours dire merci"];
var btnValiderMot = document.getElementById("btnValiderMot");
var inputEcriture = document.getElementById("inputEcriture");
var zoneScore = document.querySelector(".zoneScore span");
var comptMots = 0;
var score = 0;
var reset = document.querySelector(".reset");
var delayMots = 4000*listeMots.length;
var delayPhrases = 4000*listePhrases.length;
var currentDelayMot = 0;
var CurrentDelayPhrase = 0;
var nbr = 1;



optionSource.forEach(function(elt, i){
	comptMots = 0;

	//mise à jour du jeux si changement de choix (mots ou phrase)
	elt.addEventListener("click", function(){
		resetAll();

		if(elt.value == 1){
			initializeGame(listeMots);

		}else{
			initializeGame(listePhrases);
		}

	});

	btnValiderMot.addEventListener("click", function(event){
		
	    if(elt.checked && elt.value == 1){

	        playGame(elt, listeMots);

	    } else if(elt.checked && elt.value == 2){
	    	
	        playGame(elt, listePhrases);
	    }
	});	
	
});

reset.addEventListener("click", function(){
	resetAll();
	optionSource.forEach(function(elt, i){
		elt.checked = false;
	});
});

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
		
			if(dataTab[comptMots] == inputEcriture.value){
				score++;
			}
		}

		//adjuster le chronometre pour le prochain mot
		nbr++;
		console.log("nbr", nbr)
		currentDelayMot = 4000*nbr;
		controlTime(dataTab, currentDelayMot)
	
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

	if(comptMots == dataTab.length){
		comptMots = 0;
	}
	
}
