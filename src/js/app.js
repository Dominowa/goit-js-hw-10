import axios from 'axios';
import '../css/styles.css';
const breedSelect = document.getElementById('breedSelect');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catName = document.querySelector('.cat-name');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');
const error = document.querySelector('.error');

axios.defaults.headers.common['x-api-key'] =
  'live_E2AiWL80YIiNz11qu0CTMq4CesCG3Wcto3r9x5urBHDOejSfyc1ofJCIEPc868Zz';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data[0])
    .catch(error => {
      throw error;
    });
}

function populateBreeds(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function displayCatInfo(cat) {
  catImage.src = cat.url;
  catName.textContent = cat.breeds[0].name;
  catDescription.textContent = cat.breeds[0].description;
  catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
  catInfo.style.display = 'block';
}

function hideElements() {
  breedSelect.style.display = 'none';
  loader.style.display = 'none';
  catInfo.style.display = 'none';
  error.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  hideElements();
  loader.style.display = 'block';
  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

fetchBreeds()
  .then(breeds => {
    populateBreeds(breeds);
    breedSelect.style.display = 'block';
  })
  .catch(() => {
    showError();
  });
