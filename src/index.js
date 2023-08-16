import Notiflix from 'notiflix';
import {fetchBreeds, fetchCatByBreed} from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ERR_MESSAGE = 'Oops! Something went wrong! Try reloading the page!';
const LOAD_MESSAGE = 'Loading data,please wait...';


const refs = {
    catInfo: document.querySelector('.cat-info'),
    breedSelect: document.querySelector('.breed-select'),

};

refs.breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
    Notiflix.Loading.hourglass(LOAD_MESSAGE);

    refs.catInfo.innerHTML = '';
    const breedVar = fetchCatByBreed(event.target.value);
    

    breedVar
    .then(breed => {createCardMarkup(breed); Notiflix.Loading.remove();})
    .catch(() => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(ERR_MESSAGE);
    });

    function createCardMarkup(breed) {
            const markupSelect = el => {
            return `
            <img src="${el.url}" alt="${el.breeds[0].name}"></img>
            <div class="description"><h1>${el.breeds[0].name}</h1>
            <p><strong>Description: </strong>${el.breeds[0].description}</p>
            <p><strong>Temperament: </strong>${el.breeds[0].temperament}</p></div>
            `;
          };
        
        refs.catInfo.innerHTML = markupSelect(breed[0]);
    }
}
    function onMarkupSelect(breeds) {
          const markupBreeds = breeds
            .map(({ id, name }) => {
              return `<option value="${id}">${name}</option>`;
            }).join('');
        
            refs.breedSelect.innerHTML = markupBreeds;
            refs.breedSelect.style.visibility = 'inherit';
            new SlimSelect({
              select: '#js-breed-select',
            });
  }
  
    
    fetchBreeds()
  .then(breeds => {
    onMarkupSelect(breeds);
    Notiflix.Loading.remove();
  })
  .catch(() => {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure(ERR_MESSAGE);
  });




