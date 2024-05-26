import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getDataFromAPI } from './js/pixabay-api';
import { renderGalleryImg } from './js/render-function';

// const API_KEY = import.meta.env.VITE_API_KEY;
// const BASE_URL = import.meta.env.VITE_BASE_URL;

const API_KEY = '44022963-dc7d5638f3e5caf2e9b20745b';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderWrapper = document.querySelector('.loader-wrapper');
const btnLoadMore = document.querySelector('.load-more-btn');

let currentPage = 1;
let limitPageContent = 15;
let currentSearchQuery = null;
let totalContent = null;
let totalPages = null;

searchForm.addEventListener('submit', onSubmitForm);
btnLoadMore.addEventListener('click', onLoadMoreButtonClick);

async function onSubmitForm(event) {
    event.preventDefault();
    galleryEl.innerHTML = '';
    btnLoadMore.classList.add('is-hidden');
    currentPage = 1;

    const inputSearchValue = event.currentTarget.search.value.trim();

    if (!inputSearchValue) {
        displayErrorMessage('Please enter a value in the field!', 'Error');
        event.currentTarget.reset();
        return;
    }

    loaderWrapper.classList.remove('is-hidden');
    await fetchData(BASE_URL, API_KEY, inputSearchValue, currentPage, limitPageContent);
    
}

async function fetchData(BASE_URL, API_KEY, inputSearchValue, page, limitPageContent) {
    try {
        const data = await getDataFromAPI(BASE_URL, API_KEY, inputSearchValue, page, limitPageContent);
        const formData = data.hits;

        if (formData.length === 0) {
            displayErrorMessage('Sorry, there are no images matching your search query. Please try again!');
            return;
        }

        currentSearchQuery = inputSearchValue;
        totalContent = data.totalHits;
        totalPages = Math.ceil(totalContent / limitPageContent);

        renderGalleryImg(galleryEl, formData);

        if (currentPage >= totalPages) {
            btnLoadMore.classList.add('is-hidden');
        } else {
            btnLoadMore.classList.remove('is-hidden');
        }

        smoothScroll();
    } catch (error) {
        displayErrorMessage('Error fetching data. Please try again later', 'Error');
        console.error('Error fetching data:', error);
    } finally {
        loaderWrapper.classList.add('is-hidden');
    }
}

async function onLoadMoreButtonClick() {
    currentPage++;

    loaderWrapper.classList.remove('is-hidden');

    await fetchData(BASE_URL, API_KEY, currentSearchQuery, currentPage, limitPageContent);

    smoothScroll();

    if (currentPage === totalPages) {
        btnLoadMore.classList.add('is-hidden');
        displayErrorMessage(`We're sorry, but you've reached the end of search results.`, '', '#EF4040');
    }
}

function smoothScroll() {
    const galleryItem = document.querySelector('.gallery-item');
    const galleryItemHeight = galleryItem ? galleryItem.getBoundingClientRect().height : 0;

    window.scrollBy({
        top: galleryItemHeight * 2,
        behavior: 'smooth',
    });
}

const iziToastConfig = {
    position: 'topRight',
    titleColor: '#FFF',
    titleSize: '16',
    titleLineHeight: '24',
    messageColor: '#FFF',
    messageSize: '16',
    messageLineHeight: '24',
};

function displayErrorMessage(message, title, color = '#EF4040') {
    iziToast.error({
        ...iziToastConfig,
        title: title || '',
        message: `${message}`,
        backgroundColor: color
    });
}