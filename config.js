let listMots = shuffleArray(["bonjour", "bonsoir",
	"bonne nuit"]);
let listPhrases = shuffleArray(["pas de panique", "garder la foi",
"la bienveillance en tout"]);
let proposition = document.getElementById("proposition");







function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}