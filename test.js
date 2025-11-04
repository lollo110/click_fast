const { count, initGame } = require("./assets/js/structure.js");

describe("... Nom du groupe de test (définissez-le !)", () => {
  beforeEach(() => {
    // Fonction pour lancer du code avant chaque test
    // Configurer l'environnement de test

    // 1. Notre "Faux DOM", qui sera recréé avant chaque test
    document.body.innerHTML = `
         <div id="main">
      <div id="container">
        <h1 class="flex">ClickFast</h1>
        <p class="catchphrase">Sois le plus rapide des clickers du game ⚡</p>
        <p id="temp">Time left: 5 seconds</p>
        <p id="counterClick">0</p>
        <button id="button-clicker">ClickMe</button>
        <p id="score"></p>
      </div>
      <button id="refresh">Retourn</button>
    </div>
   `;

    // 2. Appel de nos fonctions JS
    initGame();
  });
    // Test pour vérifier que le score s'incrémente lorsque le bouton est cliqué
  test("Vérifiez que le score s'incrémente correctement", () => {
    // Simuler un clic sur le bouton
    // Utilisez une méthode pour cliquer sur le bouton et vérifiez le score
  });

  // Test pour vérifier que le timer fonctionne correctement
 test("le timer décompte correctement", () => {
  jest.useFakeTimers();
  initGame();

  const button = document.getElementById("button-clicker");
  const temp = document.getElementById("temp");

  // déclenche le timer
  button.click();

  // avance le temps de 5 secondes
  jest.advanceTimersByTime(5000);

  expect(temp.textContent).toBe("Time left: 0 seconds");

  jest.useRealTimers();
});

  // Test pour vérifier que le jeu ne permet pas de cliquer après la fin du timer
test("le score ne s'incrémente pas après la fin du timer", () => {
  jest.useFakeTimers();
  initGame();

  const button = document.getElementById("button-clicker");
  const counter = document.getElementById("counterClick");

  // clic initial
  button.click();
  expect(counter.textContent).toBe("1"); // immédiatement après le clic

  // avance le temps pour finir le timer
  jest.advanceTimersByTime(5000);

  // clics après fin du jeu
  button.click();
  button.click();

  // le compteur ne doit pas augmenter après fin
  expect(counter.textContent).toBe("1");

  jest.useRealTimers();
});

  // Test pour vérifier que le bouton de réinitialisation fonctionne correctement
  test("Vérifiez que le bouton de réinitialisation remet le score à zéro", () => {
    // Simuler quelques clics pour augmenter le score
    // Vérifiez que le score est supérieur à zéro
    // Simuler un clic sur le bouton de réinitialisation
    // Vérifiez que le score a été remis à zéro
  });
});
