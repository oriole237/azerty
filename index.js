let score = 0;
let choix = "";

// 1. demander à l'utilisateur le choix du jeu
choix = waitUserChoice();

// 2. calcul du score et affichage resultat final
if(choix == "mots"){
	score = findScore(listMots);
	decision(score, listMots.length);

}else if(choix == "phrases"){
	score = findScore(listPhrases);
	decision(score, listPhrases.length);
}

//liste des fonctions utiles
function findScore(tab){
	let score = 0;

	for(let i=0; i<tab.length; i++){
		let resp = prompt("Veillez saisir : "+ tab[i]);
		if(tab.indexOf(resp) == i){
			score++;
		}
	}
	return score;
}

function decision(score, totalScore){
	if(score == totalScore){
		console.log("🥳Bravo ! Vous avez gagné");
	}else if(score != 0){
		console.log("Désolé ! Vous avez trouvé "+ score + "/"+ totalScore);
	}else{
		console.log("Aucun mot trouvé, veillez réessayer")
	}

}

function waitUserChoice(){
	while(choix != "mots" && choix != "phrases"){
		choix = prompt("Faites un choix : mots ou phrases ?");
	}
	return choix;
}

