const BASE_URL = "http://localhost:8083/post";

const formValidate = (country) => {
  return country === "-1" ? false : true;
};

const resetForm = () => {
   document.querySelector("#city-input").value = ""
   document.querySelector("#countries-list").value = ""
   document.querySelector("#date-input").value = ""
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const city = document.querySelector("#city-input").value;
  const country = document.querySelector("#countries-list").value;
  const date = document.querySelector("#date-input").value;

  if (!formValidate(country)) {
    return alert("please chose the country");
  }
  console.log(city, country, date);

  const dataToPost = { city, date, country };

  const optionJSON = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToPost),
  };

  const res = await fetch(BASE_URL, optionJSON);
  try {
    const json = await res.json();
    console.log(json);
    // Client.renderResults(json);
    if(!json.state) {
      alert(json.msg)
      return 0
    }
    Client.renderTravelCard(json, date, city)
    resetForm()
    return 1;
  } catch (error) {
    console.error("error", error);
    return 0;
  }
};

export { handleSubmit };

// TODO
// 1. don't take past date
