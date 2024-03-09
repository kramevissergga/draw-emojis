document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-game");
  const timerDisplay = document.querySelector(".game__timer");
  const gameField = document.querySelector(".game__field");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const minutes = parseInt(document.getElementById("min").value);
    const seconds = parseInt(document.getElementById("sec").value);

    startTimer(minutes, seconds);
    form.style.display = "none";
    gameField.style.display = "grid";
    getRandomEmojis();
  });

  function startTimer(minutes, seconds) {
    let totalSeconds = minutes * 60 + seconds;
    let countdown = setInterval(updateTimer, 1000);

    function updateTimer() {
      if (totalSeconds <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "Час вийшов!";
        return;
      }

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerDisplay.textContent = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      if (totalSeconds <= 10) {
        timerDisplay.style.color = "#ff444d";
      } else {
        timerDisplay.style.color = "#1a1818";
      }

      totalSeconds--;
    }
  }
  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "json/emojis.json", true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == 200) {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  function getRandomEmoji(emojis) {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  function getRandomEmojis() {
    loadJSON(function (response) {
      var emojis = JSON.parse(response);
      var emojiList = document.querySelector(".game__task");
      emojiList.innerHTML = "";
      for (var i = 0; i < 4; i++) {
        var randomEmoji = getRandomEmoji(emojis);
        var emojiElement = document.createElement("span");
        emojiElement.innerHTML = randomEmoji;
        emojiList.appendChild(emojiElement);
      }
    });
  }
});
