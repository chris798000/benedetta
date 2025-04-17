const letters = {
  "17 aprile 2025": "Oggi è un giorno speciale perché ti amo sempre di più!",
  // Aggiungi altre lettere qui con la data corrispondente
};

const letterContainer = document.querySelector(".letter-container");
const openButton = document.querySelector(".open-button");
const closeButton = document.querySelector(".close-button");
const saveButton = document.querySelector(".save-button");
const letterContent = document.querySelector(".letter-content");
const letterText = document.querySelector("#letter-text");

openButton.addEventListener("click", () => {
  letterContent.style.display = "block";
  letterText.textContent = getLetterText();
});

closeButton.addEventListener("click", () => {
  letterContent.style.display = "none";
});

saveButton.addEventListener("click", () => {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("it-IT", options);
  const letter = letterText.textContent;

  if (!isLetterAlreadyInHistory(formattedDate, letter)) {
    addToHistory(formattedDate, letter);
  } else {
    alert("La lettera è già stata salvata nella storia.");
  }
});

function getLetterText() {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("it-IT", options);

  const letter =
    letters[formattedDate] || "Non hai ancora ricevuto una lettera per oggi.";
  return letter;
}

function addToHistory(date, letter) {
  const historyList = document.getElementById("letter-history");
  const listItem = document.createElement("li");
  listItem.textContent = `${date}: ${letter}`;
  historyList.appendChild(listItem);

  saveHistory();
}

function isLetterAlreadyInHistory(date, letter) {
  const historyList = document.getElementById("letter-history");
  const historyItems = historyList.children;

  for (let i = 0; i < historyItems.length; i++) {
    const item = historyItems[i];
    const itemDate = item.textContent.split(":")[0];
    const itemLetter = item.textContent.split(":")[1].trim();

    if (itemDate === date && itemLetter === letter) {
      return true;
    }
  }

  return false;
}

function saveHistory() {
  const historyList = document.getElementById("letter-history");
  const historyItems = historyList.children;
  const historyArray = [];

  for (let i = 0; i < historyItems.length; i++) {
    const item = historyItems[i];
    const date = item.textContent.split(":")[0];
    const letter = item.textContent.split(":")[1].trim();
    historyArray.push({ date, letter });
  }

  localStorage.setItem("letterHistory", JSON.stringify(historyArray));
}

function loadHistory() {
  const storedHistory = localStorage.getItem("letterHistory");
  if (storedHistory) {
    const historyArray = JSON.parse(storedHistory);
    const historyList = document.getElementById("letter-history");

    for (let i = 0; i < historyArray.length; i++) {
      const item = historyArray[i];
      const listItem = document.createElement("li");
      listItem.textContent = `${item.date}: ${item.letter}`;
      historyList.appendChild(listItem);
    }
  }
}

// Carica la storia delle lettere al caricamento della pagina
loadHistory();
