import axios from "axios";

const myKey = "live_6QNnfCdmuLjGVZOWf2Gr5m67HTlIOKFHdsHSXDUc0PUip8i04nZJQqeUpzPcvlj0";
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = myKey;

// select with breeds
export function fetchBreeds(select, loader, errorElement) {
  errorElement.classList.remove('show');
  loader.classList.add('isActive');
  select.classList.remove('show');
  return axios.get(`${BASE_URL}/breeds`)
};

// get data with whole info about cat
export function fetchCatByBreed(breedId, catInfoDiv, loader, errorElement) {
  errorElement.classList.remove('show');
  loader.classList.add('isActive');
  catInfoDiv.classList.add('hide');
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
};