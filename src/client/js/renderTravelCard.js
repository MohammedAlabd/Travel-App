const mockData = {
  image: {
    largeImageURL:
      "https://pixabay.com/get/54e6d24b4a5aae14f6da8c7dda793679153cd9e154576c48702679d59444c25cb8_1280.jpg",
    tags: "istanbul, girl, tower",
    user: "BarisKerimCesur",
  },
  weatherData: {
    temp: 18.9,
    max_temp: 19.4,
    min_temp: 18.5,
    snow_depth: 0,
    wind_spd: 5.99646,
    weather: { icon: "c04d", code: 804, description: "Overcast clouds" },
    clouds: 81,
  },
};

const renderTravelCard = (cityData, TravelDate, city) => {
  const cardsContainer = document.querySelector("#cards-container");
  const {
    image: { largeImageURL, tags },
    weatherData: {
      temp,
      max_temp,
      min_temp,
      snow_depth,
      wind_spd,
      weather: { description },
      clouds,
    },
  } = cityData;

  const cardHTMLString = `
    <div class="card mb-2" style="width: 18rem;">
                    <img class="card-img-top" src="${largeImageURL}" alt="${tags}">
                    <div class="card-body">
                        <h3>${city} City</h3>
                        <p>Travel Date: ${TravelDate}</p>
                        <p>Temperature: ${temp}<span>&#8451;</span></p>
                        <p>Max Temperature: ${max_temp}<span>&#8451;</span></p>
                        <p>Min Temperature: ${min_temp}<span>&#8451;</span></p>
                        <p>Snow Depth: ${snow_depth} mm</p>
                        <p>Wind Speed: ${wind_spd} m/s</p>
                        <p>Cloud Percentage: ${clouds}%</p>
                        <p class="border">Weather Description:${description}</p>
                    </div>
                </div>
    `;
  document
    .querySelector("#cards-container")
    .insertAdjacentHTML("beforeend", cardHTMLString);
};

export { renderTravelCard };
