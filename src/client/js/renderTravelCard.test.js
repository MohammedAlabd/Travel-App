import "babel-polyfill";
import { renderTravelCard } from "./renderTravelCard";
import jsdom from "jsdom";
const JSDOM = jsdom.JSDOM;
const dom = new JSDOM(`
                        <div id="cards-container" class="row justify-content-around">
                            <!--The Travel Cards Will Go here-->
                        </div>
                    `);

beforeAll(() => {
  global.document = dom.window.document;
});

describe("renderTravelCards", () => {
  const document = dom.window.document;
  const mockTravelDate = "test string";
  const mockCity = "test string";
  const mockData = {
    image: {
      largeImageURL: "test string",
      tags: "test string",
      user: "test string",
    },
    weatherData: {
      temp: "test string",
      max_temp: "test string",
      min_temp: "test string",
      snow_depth: "test string",
      wind_spd: "test string",
      weather: {
        icon: "test string",
        code: "test string",
        description: "test string",
      },
      clouds: "test string",
    },
  };
  const cardsContainer = document.querySelector("#cards-container");
  it("render the correct Data", async () => {
    const state = await renderTravelCard(mockData, mockTravelDate, mockCity);
    expect(cardsContainer.querySelector(".card-body").childElementCount).toEqual(9);
    expect(cardsContainer.querySelectorAll("p").length).toEqual(8);
    cardsContainer.querySelectorAll("p").forEach((tag) => {
      expect(tag.innerHTML.includes("test string")).toEqual(true);
    });
  });
});
