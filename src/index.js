import './sass/main.scss';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/src/styles/main.scss';
import apiService from './js/apiService';
import imageCardMarkup from './templates/image-card';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreButtonEl = document.querySelector('.load-more-button');
const scrollMarkerEl = document.getElementById('scroll-marker');

function makeFirstSearch(event) {
  event.preventDefault();
  event.currentTarget.elements.query.value = event.currentTarget.elements.query.value.trim();;

  apiService.searchQuery = event.currentTarget.elements.query.value;
  apiService.resetPageNumber();

  clearImageCards();
  if (apiService.searchQuery === '') {
    loadMoreButtonEl.classList.add('visually-hidden');
    return;
  };

  makeAnotherSearch();
};

function makeAnotherSearch() {
  apiService.fetchImages().then(searchResult => {

    if (searchResult.length === 0) {
      loadMoreButtonEl.classList.add('visually-hidden');
      return;
    };

    renderImageCards(searchResult)
    
    loadMoreButtonEl.classList.remove('visually-hidden');
    
    scrollMarkerEl.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
};

function renderImageCards(images) {
  galleryEl.insertAdjacentHTML('beforeend', imageCardMarkup(images));
};

function clearImageCards() {
  galleryEl.innerHTML = '';
}

function showLightbox(event) {
  if (event.target.nodeName !== 'IMG') return;
  const basicLightboxInstance = basicLightbox.create(`
    <img src="${event.target.dataset.original}" width="800" height="600">
  `);
  basicLightboxInstance.show();
};

searchFormEl.addEventListener('submit', makeFirstSearch);
loadMoreButtonEl.addEventListener('click', makeAnotherSearch);
galleryEl.addEventListener('click', showLightbox);