import axios from "axios";

const myKey = "live_6QNnfCdmuLjGVZOWf2Gr5m67HTlIOKFHdsHSXDUc0PUip8i04nZJQqeUpzPcvlj0";
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = myKey;

const select = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');

select.addEventListener('change', onChange);

function onChange(event){
  const id = event.target.value;
  fetchCatByBreed(id).then(res => {
    console.log("res", res);
    catTemplate(res.data)
  })
};

function catTemplate(catData) {
  catData.map(({  breeds: { description, temperament, name}, url }) => {
     catInfoDiv.innerHTML = `
    <img src="${url}" alt="${name}">
    <p><strong>Breed:</strong> ${name}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
  `
  })
 
   
  console.log("catData", catData);
}
  

function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
};

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`)
};

fetchBreeds().then(res => {
  const catList = res.data;
 
  select.innerHTML = optionsCreate(catList);
});

function optionsCreate(catList) {
  return catList.map(({id,name}) => {
    return (` <option value='${id}'>${name}</option> `)
  }).join('')
};
