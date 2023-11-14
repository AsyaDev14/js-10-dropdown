import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const select = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error')
select.addEventListener('change', onChange);

// render options in select
fetchBreeds(select, loader, errorElement)
  .then(res => {
    const catList = res.data;
    loader.classList.remove('isActive');
    select.classList.add('show');
    select.innerHTML = optionsCreate(catList);
  })
  .catch(error => {
    loader.classList.remove('isActive');
    errorElement.classList.add('show');
   }
  );

function onChange(event) {
  const id = event.target.value;
  // fetching cats
  fetchCatByBreed(id, catInfoDiv, loader, errorElement)
    .then(res => {
      loader.classList.remove('isActive');
      catInfoDiv.classList.remove('hide')
      console.log("res", res);
      catTemplate(res.data)
    })
   .catch(error => {
     loader.classList.remove('isActive');
     errorElement.classList.add('show');
   }
  );
};

// div cat-info template
function catTemplate(catData) {
  const item = catData[0];
  const { url, breeds } = item;
  const { description, temperament, name } = breeds[0];

  catInfoDiv.innerHTML = `
    <img src="${url}" alt="${name}" width='200'>
    <p><strong>Breed:</strong> ${name}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
  `
  console.log("catData", catData);
}

function optionsCreate(catList) {
  return catList.map(({ id, name }) => {
    return (` <option value='${id}'>${name}</option> `)
  }).join('')
};
