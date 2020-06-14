const fetch = require("node-fetch");

const fetchImage = async (city, BASE_PIXABAY_URL, PIXABAY_API_KEY) => {
  city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const URL = `${BASE_PIXABAY_URL}/?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo&pretty=true`;
  const res = await fetch(URL);
  try {
    const json = await res.json();
    if (json.hits.length === 0) return null;
    let imageIndex = Math.round(Math.random() * 10);
    while (imageIndex >= json.hits.length) imageIndex--;
    const { largeImageURL, tags, user } = json.hits[imageIndex];
    return { largeImageURL, tags, user };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchImage;
