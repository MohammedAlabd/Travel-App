const fetch = require("node-fetch");

const fetchCoordinates = async (
    country,
    city,
    BASE_COORDINATES_URL,
    USERNAME
  ) => {
    const MAX_ROWS = 10;
  
    URL = `${BASE_COORDINATES_URL}?placename=${city}&maxRows=${MAX_ROWS}&username=${USERNAME}&country=${country}`;
  
    const res = await fetch(URL);
    try {
      const json = await res.json();
      if (json.postalCodes.length === 0) return null;
      const { lat, lng, adminName2 } = json.postalCodes[0];
      return { lat, lng, adminName2 };
    } catch (error) {
      throw new Error(error);
    }
  };

module.exports = fetchCoordinates;
