import { handleSubmit } from "./js/handleSubmit";
import { renderTravelCard } from "./js/renderTravelCard";
import "./js/countriesAPI"
import "./styles/card.scss";

const todayDate = new Date().toJSON().split("T")[0] // To get data in this format "YYYY-MM-DD"
document.querySelector("#date-input").setAttribute("min", todayDate)

export { handleSubmit, renderTravelCard };
