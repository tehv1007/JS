const messageElement = document.getElementById("message");

// get random number 1~100
const randomNumber = getRandomNumber();
console.log(randomNumber);
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
recognition.continuous = false; //default
// recognition.lang = "en-US";
recognition.lang = "ko-KR";
recognition.interimResults = false; //default
recognition.maxAlternatives = 1;

recognition.start();
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => {
  recognition.start();
});

function onSpeak(event) {
  console.log(event);
  const message = event.results[0][0].transcript;
  console.log(message);
  writeMessage(message);
  checkNumber(message);
}

function writeMessage(message) {
  messageElement.innerHTML = `
      <div>You said:</div>
      <span class="box">${message}</span>
      <div></div>
    `;
}

function checkNumber(message) {
  const number = Number(message);
  if (Number.isNaN(number)) {
    messageElement.innerHTML = `
    <div>That is not a number</div>
    `;
  } else {
    if (number > 100 || number < 1) {
      messageElement.innerHTML = `
      <div>Number must be betweeen 1 ~ 100</div>
      `;
    }

    if (randomNumber > number) {
      messageElement.innerHTML += `
      <div>Go higher!</div>
      `;
    } else if (randomNumber < number) {
      messageElement.innerHTML += `
      <div>Go lower!</div>
      `;
    } else {
      messageElement.innerHTML += `<h2>
    You have guessed the number
    <br />
    <br />
    It was ${number}
    </h2>
    <button class="button" id="button">Play Again</button>`;
    }
  }
}

document.body.addEventListener("click", (event) => {
  if (event.target.id === "button") {
    window.location.reload(true);
  }
});
