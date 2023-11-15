import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SlimSelect from 'slim-select';

const select = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
// let el = document.querySelector('#selectElement')

select.addEventListener('change', onChange);
// render options in select
fetchBreeds(select, loader, errorElement)
  .then(res => {
    const catList = res.data;
    loader.classList.remove('isActive');
    select.classList.add('show');
    select.innerHTML = optionsCreate(catList);
    // new SlimSelect({
    //  select: el,
    // })
  })
  .catch(error => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    // loader.classList.remove('isActive');
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
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
  .finally(() => {
      // loader.classList.add('isActive');
      catInfoDiv.classList.remove('hide');
    });
};

// div cat-info template
function catTemplate(catData) {
  const item = catData[0];
  const { url, breeds } = item;
  const { description, temperament, name } = breeds[0];

  catInfoDiv.innerHTML = `
  <img src="${url}" alt="${name}" width='600'>
  <div class='cat_discript'>
   <p>Breed: ${name}</p>
      <p>Description: ${description}</p>
      <p>Temperament: ${temperament}</p>
  </div>
  `
  console.log("catData", catData);
}

function optionsCreate(catList) {
  return catList.map(({ id, name }) => {
    return (` <option value='${id}'>${name}</option> `)
  }).join('');
};







