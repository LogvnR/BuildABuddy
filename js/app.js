// ===== User Submit Modal =====
const userInputModal = document.querySelector('.userInput');
const buddyPreview = document.querySelector('.buddyWelcome-Text');
const buddyNameInput = document.querySelector('#buddyName');
const mainForm = document.querySelector('.mainForm');
const favColor = document.querySelector('#buddyFavColor');
const mainSubmit = document.querySelector('#submitBtn');

// ===== Buddy Modal Selectors =====
const buddyModalContainer = document.querySelector('.buddyModal');
const buddyName = document.querySelector('.buddyNameInput');
const buddyFavColor = document.querySelector('.buddyColorInput');
const buddyDialogue = document.querySelector('.buddyDialogue');
const jokeBtn = document.querySelector('#joke');
const weatherBtn = document.querySelector('#weather');
const resetBtn = document.querySelector('#resetBtn');

// ===== Buddy Questions Form =====
const buddyForm = document.querySelector('.buddyQuestionForm');
const buddyQuestions = document.querySelector('#buddyQuestions');

// ===== Class Import =====
import NewBuddy from './class.js';

const buddyMode = function (objName, objColor) {
  userInputModal.style.display = 'none';
  buddyModalContainer.style.display = 'grid';
  buddyName.innerText = objName;
  buddyFavColor.innerText = objColor;
  const selectedColor = `var(--v${objColor})`;
  buddyFavColor.style.setProperty('color', selectedColor);
  buddyDialogue.style.setProperty('color', selectedColor);
};

const submitErr = () => {
  buddyNameInput.style.border = '1.5px solid #da1e37';
  favColor.style.border = '1.5px solid #da1e37';
  buddyPreview.innerText = 'Please Fill Out Options';
};

const submitClear = () => {
  buddyNameInput.style.border = 'none';
  buddyNameInput.style.borderBottom = '1.5px solid black';
  favColor.style.border = 'none';
  favColor.style.borderBottom = '1.5px solid black';
};

mainForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (buddyNameInput.value === '' || favColor.value === 'NONE') {
    submitErr();
  } else {
    const userNewBuddy = new NewBuddy(buddyNameInput.value, favColor.value);
    submitClear();
    buddyMode(userNewBuddy.name, userNewBuddy.color);
    jokeBtn.addEventListener('click', function (e) {
      userNewBuddy.joke();
    });
    weatherBtn.addEventListener('click', function (e) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const userLat = lat.toFixed(4);
        const userLong = long.toFixed(4);
        userNewBuddy.weather(userLat, userLong);
      });
    });
    buddyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      userNewBuddy.askQuestion();
    });
  }
});

// ===== Buddy Reset Button ====
resetBtn.addEventListener('click', function (e) {
  window.location.reload();
});

// ===== Buddy Name Previewer =====
buddyNameInput.addEventListener('input', function (e) {
  buddyPreview.innerText = this.value
    ? `Hello, my name is ${buddyNameInput.value}!`
    : 'Hey There!';
  submitClear();
});
