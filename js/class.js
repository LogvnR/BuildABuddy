// ===== Weather API =====
const logvn = 'f5514ef810f24c5db8b195300210607';
const buddyDialogue = document.querySelector('.buddyDialogue');

const buddyQuestions = document.querySelector('#buddyQuestions');
const mainSubmit = document.querySelector('#submitBtn');

export default class NewBuddy {
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
          `https://api.weatherapi.com/v1/current.json?key=${logvn}&q=${lat},${long}`,
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
