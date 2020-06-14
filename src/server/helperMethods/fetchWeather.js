const fetch = require("node-fetch");

const fetchWeather = async (coordinates, date, WETHERBIT_API_KEY) => {
  if (isDateInSixteenDays(date)) {
    const daysBetween = isDateInSixteenDays(date);
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinates.lat}&lon=-${coordinates.lng}&key=${WETHERBIT_API_KEY}`;
    const res = await fetch(URL);
    try {
      const json = await res.json();
      const {
        temp,
        max_temp,
        min_temp,
        snow_depth,
        wind_spd,
        weather,
        clouds,
      } = json.data[daysBetween];
      return {
        temp,
        max_temp,
        min_temp,
        snow_depth,
        wind_spd,
        weather,
        clouds,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  let travelDataArray = date.split("-");
  const validYear = new Date().getFullYear();
  travelDataArray = travelDataArray.map((dateElement) => parseInt(dateElement));
  const [year, month, day] = travelDataArray;
  const startDate = `${validYear - 1}-${month}-${day}`;
  const endDate = `${validYear - 1}-${month}-${day + 1}`;
  const URL = `https://api.weatherbit.io/v2.0/history/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&start_date=${startDate}&end_date=${endDate}&key=${WETHERBIT_API_KEY}`;
  const res = await fetch(URL);
  try {
    const json = await res.json();
    const {
      temp,
      max_temp,
      min_temp,
      snow_depth,
      wind_spd,
      clouds,
    } = json.data[0];
    return {
      temp,
      max_temp,
      min_temp,
      snow_depth,
      wind_spd,
      clouds,
      weather: { description: "The weather description is not available" },
    };
  } catch (error) {
    throw new Error(error);
  }
};

const isDateInSixteenDays = (futureDateString) => {
  const todayDate = new Date();
  const futureDate = new Date(futureDateString);
  if (todayDate.getFullYear() === futureDate.getFullYear()) {
    if (todayDate.getMonth() === futureDate.getMonth()) {
      const daysBetween = futureDate.getDate() - todayDate.getDate();
      return daysBetween <= 16 ? daysBetween : false;
    }
  }
};

module.exports = fetchWeather;
