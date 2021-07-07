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

// ===== Weather API =====
const logvn = 'f5514ef810f24c5db8b195300210607';

class NewBuddy {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  // ===== Joke Generator =====
  joke() {
    const addJoke = async () => {
      const aquiredJoke = await getJoke();
      buddyDialogue.innerText = aquiredJoke;
    };

    const getJoke = async () => {
      try {
        const config = { headers: { Accept: 'application/json' } };
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
      } catch (e) {
        console.log(e);
        const errorHandle =
          'Sorry, something is wrong right now. Try again later';
        return errorHandle;
      }
    };
    addJoke();
  }
  // ===== Weather Api
  weather(lat, long) {
    const addWeather = async () => {
      const aqW = await getWeather();
      buddyDialogue.innerText = `Ok in ${aqW.locName}, it is ${aqW.locCond} at ${aqW.tempF}F(${aqW.tempC}C), but it feels like ${aqW.tempFeelF}F(${aqW.tempFeelC}C). And the Humidity is at ${aqW.humd}%.`;
    };
    const getWeather = async () => {
      try {
        const config = { headers: { Accept: 'application/json' } };
        const res = await axios.get(
          'https://api.weatherapi.com/v1/current.json?key=f5514ef810f24c5db8b195300210607&q=8.559,-79.868',
          config
        );
        const returnedData = {
          locName: res.data.location.name,
          tempF: res.data.current.temp_f,
          tempC: res.data.current.temp_c,
          locCond: res.data.current.condition.text,
          tempFeelF: res.data.current.feelslike_f,
          tempFeelC: res.data.current.feelslike_c,
          humd: res.data.current.humidity,
        };
        return returnedData;
      } catch (e) {
        console.log(e);
        const errorHandle =
          'Sorry, something is wrong right now. Try again later';
        return errorHandle;
      }
    };
    addWeather();
  }
  // ==== Buddy Questions
  askQuestion() {
    if (buddyQuestions.value === 'NONE') {
      buddyDialogue.innerText = 'Ask Me A Question!';
    } else if (buddyQuestions.value === 'Q1') {
      buddyDialogue.innerText = "I'm doing alright, can't complain";
    } else if (buddyQuestions.value === 'Q2') {
      buddyDialogue.innerText = 'My Favorite Food Is Pizza!';
    } else if (buddyQuestions.value === 'Q3') {
      buddyDialogue.innerText = `My Favorite Color is ${this.color}!!!!`;
    } else {
      buddyDialogue.innerText = `My Name is ${this.name}... Dont You Remember? :(`;
    }
  }
}

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
