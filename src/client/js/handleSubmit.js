const BASE_URL = "http://localhost:8082/post"
const handleSubmit = async (event) => {
  event.preventDefault();
  const city = document.querySelector("#city-input").value;
  const date = document.querySelector("#date-input").value;

  console.log(city.value, date.value);

  const dataToPost = { city, date };

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
    Client.renderResults(json);
    return 1;
  } catch (error) {
    console.error("error", error);
    return 0;
  }
  // console.log( date.value)
  // let input = document.querySelector("#text").value;
  // // check what text was put into the form field

  // if (!formValidData(input)) {
  //   alert("please enter an atrial of 10 words or more");
  //   return 0;
  // }
  // console.log("::: Form Submitted :::");
};

export { handleSubmit };
