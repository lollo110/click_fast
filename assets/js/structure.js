let count = 0;
let countdownStarted = false;
let gameOver = false;
let timeLeft = 5;
let timer;


  const button = document.getElementById("button-clicker");
  const counter = document.getElementById("counterClick");
  const temp = document.getElementById("temp");
  const score = document.getElementById("score");
  const refresh = document.getElementById("refresh");
  const gif = document.getElementById("gif");

  function countDown() {
    if (!countdownStarted) {
      countdownStarted = true;
      timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(timer);
          gameOver = true;
          score.textContent = `Your final score is: ${count} clicks!`;
          button.disabled = true;
          temp.textContent = `Time left: 0 seconds`;
          refresh.style.display = "block";
        } else {
          temp.textContent = `Time left: ${timeLeft} seconds`;
        }
      }, 1000);
    }
  }

  button.addEventListener("click", () => {
    if (gameOver) return;
    if (!countdownStarted) countDown();
    count++;
    counter.textContent = count; // <--- mise à jour du DOM
  });

  refresh.addEventListener('click', function (){
    gif.style.display = 'block';
    setTimeout(function(){
        location.reload();
    }, 2800);
});

const form = document.getElementById("score-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const score = count; // ici ton score final de ClickFast
  const avatar = "https://i.ytimg.com/vi/0EpIWybDPfI/hqdefault.jpg";

  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  const data = {
    createdAt: new Date().toISOString(),
    username,
    avatar,
    score,
    website_url: "onyj.github.io/ClickFast",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    console.log("Score envoyé :", result);

    // Rafraîchir le scoreboard
    getScores();
  } catch (error) {
    console.error("Erreur lors de l'envoi du score :", error);
  }
});


const scoreList = document.getElementById("score-list");

const getScores = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // Trier les scores du plus grand au plus petit
    data.sort((a, b) => b.score - a.score);
    let conto = 0;

    // Afficher les scores
    scoreList.innerHTML = "";
    data.forEach((user) => {
        if (conto >= 10) return;
         // afficher seulement les 10 premiers
         conto++;
      const li = document.createElement("li");
      li.innerHTML = `<strong>${user.username}</strong>: ${user.score}`;
      scoreList.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur récupération des scores:", error);
  }
};

// Appel initial pour afficher les scores
getScores();

const updateScore = async (username, score) => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    // Récupérer tous les utilisateurs avec ce pseudo
    const response = await fetch(url);
    const users = await response.json();
    const usersToDelete = users.filter((u) => u.username === username);

    // Supprimer les anciens scores
    for (const user of usersToDelete) {
      await fetch(`${url}/${user.id}`, { method: "DELETE" });
    }

    // Ajouter le nouveau score
    const newData = {
      createdAt: new Date().toISOString(),
      username,
      avatar: "https://i.ytimg.com/vi/0EpIWybDPfI/hqdefault.jpg",
      score,
      website_url: "onyj.github.io/ClickFast",
    };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    // Rafraîchir le scoreboard
    getScores();
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
};

module.exports = { count, initGame };