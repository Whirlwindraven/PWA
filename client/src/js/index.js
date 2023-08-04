import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const mainElement = document.querySelector('#main');
mainElement.innerHTML = '';

function createAndLoadSpinner() {
  const spinnerElement = document.createElement('div');
  spinnerElement.classList.add('spinner');
  spinnerElement.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  mainElement.appendChild(spinnerElement);
};

const textEditor = new Editor();

if (!Editor) {
  createAndLoadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the Workbox service worker
  const workboxServiceWorker = new Workbox('/src-sw.js');
  workboxServiceWorker.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
