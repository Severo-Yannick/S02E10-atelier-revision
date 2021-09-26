/**
 *
 * Code fourni
 */
const app = {
  // just a utility var to remember all the colors
  colors: ["red", "green", "blue", "yellow"],

  // this var will contain the sequence said by Simon
  sequence: [],

  indice: 0,

  isMyTurn : false,

  drawCells: function () {
    const playground = document.getElementById("playground");
    for (const color of app.colors) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = color;
      cell.style.backgroundColor = color;
      cell.addEventListener("click", app.handleColorClick);
      playground.appendChild(cell);
    }
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = "45px";
    // and reset the same style, after a small pause (150 ms)
    setTimeout(() => {
      document.getElementById(color).style.borderWidth = "0";
    }, 150);
  },

  newGame: function () {
    // start by reseting the sequence
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      app.sequence.push(app.getRandomColor());
    }
    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
  },

  simonSays: function (sequence) {
    app.showMessage("Mémorisez la séquence");
    app.isMyTurn = false;

    //Il y a encore au moins une case a faire clognoter
    if (sequence != null && sequence.length > 0) {

      // after 500ms, bump the first cell
      setTimeout(app.bumpCell, 500, sequence[0]);
      // plays the rest of the sequence after a longer pause
      setTimeout(app.simonSays, 850, sequence.slice(1));

    } else {
      // s'il n'y a plus de case a faire clignoter , simon a fini de parler ALORS c'est au tour du joueur de répéter la séquence
      app.showMessage("Reproduisez la séquence");

      // lorsque simon parle le user doit recommencer à cliquer sur les couleur de la sequence à partir du début
      app.indice = 0;
      app.isMyTurn = true;
    }
  },

  init: function () {
    console.log("init");
    app.drawCells();

    // listen click on the "go" button
    document.getElementById("go").addEventListener("click", app.newGame);
  },

  /** Fin du code fourni. Après, c'est à toi de jouer! */

  // Afficher un message
  showMessage: function (message) {
    const messageElement = document.querySelector("#message");
    messageElement.innerHTML = message;
    messageElement.classList.remove("hide");

    const buttonElement = document.querySelector("#go");
    buttonElement.classList.add("hide");
  },
  // Cacher la zone du message et ré-affiche le bouton "Démarrer"
  hideMessage: () => {
    const messageElement = document.querySelector("#message");
    messageElement.classList.add("hide");

    const buttonElement = document.querySelector("#go");
    buttonElement.classList.remove("hide");
  },
  // Fin de la partie
  gameover: () => {
    let score = app.sequence.length;

    alert(`Partie terminée. Votre score : ${score}`);
    // Cacher le message et afficher le bouton 
    app.hideMessage();

    // Vider la séquence
    app.sequence = [];
  },
  //
  handleColorClick: (event) => {
    // Controle le tour de jouer
    if(!app.isMyTurn) {
      return;
    }

    const clickedColor = event.target.id;
    app.bumpCell(clickedColor);

    const expectedColor = app.sequence[app.indice];

    if(clickedColor === expectedColor) {
        app.indice++;
      if(app.indice === app.sequence.length) {
        app.nextMove();
      } else {
        app.gameover();
      }
    };
  },
  // Nouvelle couleur aléatoire
  getRandomColor: () => {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = app.colors[randomNumber];

    return randomColor;
  },
  // 
  nextMove: () => {
    // ajouter une nouvelle couleur aléatoire à la sequence
    app.sequence.push(app.getRandomColor());
    // demander à Simon de "parler" 
    app.simonSays(app.sequence);
  }
};

document.addEventListener("DOMContentLoaded", app.init);
