import countries from "country-list-js";

// const names = countries.names()
(function () {
  const countriesArray = Object.keys(countries.all).map((key) => ({
    iso2: countries.all[key]["iso2"],
    name: countries.all[key]["name"],
  }));

  // sort by name
  countriesArray.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  const renderCountries = () => {
    const countriesList = document.querySelector("#countries-list");
    countriesArray.forEach((country) => {
      const countryHTMLOption = `<option value="${country.iso2}">${country.name}</option>`;
      countriesList.insertAdjacentHTML("beforeEnd", countryHTMLOption);
    });
  };
  document.addEventListener("DOMContentLoaded", renderCountries);
})();
