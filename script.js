const letters = {
  "17 aprile 2025": "Oggi è un giorno speciale perché ti amo sempre di più!",
  // Aggiungi altre lettere qui con la data corrispondente
};

function showLetter() {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("it-IT", options);

  const letter =
    letters[formattedDate] || "Non hai ancora ricevuto una lettera per oggi.";
  alert(letter);

  // Aggiungi la lettera alla storia
  addToHistory(formattedDate, letter);
}

function addToHistory(date, letter) {
  const historyList = document.getElementById("letter-history");
  const listItem = document.createElement("li");
  listItem.textContent = `${date}: ${letter}`;
  historyList.appendChild(listItem);
}
