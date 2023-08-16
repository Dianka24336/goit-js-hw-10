import axios from "axios";
// import Notiflix from 'notiflix';

const API_KEY = 'live_AyH5v3Lc6mfITKktFUleH71uVaYGOPG78VKMXOdEbUvTEbhx5TobzBT3DruTcq9j';
// const ERR_MESSAGE = 'Oops! Something went wrong! Try reloading the page!';

axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';


export function fetchBreeds() {
   return axios.get('/breeds')
  .then(response => response.data)
  // .catch(error => Notiflix.Notify.failure(ERR_MESSAGE))
};

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`)
    
  .then(response => response.data)
  // .catch(error => Notiflix.Notify.failure(ERR_MESSAGE))
};