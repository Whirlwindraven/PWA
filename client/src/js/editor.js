// Import methods to save and get data from the indexedDB database in './database.js'
import { readFromDb as loadFromDb, writeToDb as saveToDb } from './database';
import { header as defaultHeader } from './header';

export default class Editor {
  constructor() {
    this.localStorageKey = 'content';
    this.localData = localStorage.getItem(this.localStorageKey);

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize the CodeMirror editor
    this.initializeEditor();

    // Load data into the editor
    this.loadDataIntoEditor();

    // Set editor events
    this.setEditorEvents();
  }

  initializeEditor() {
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });
  }

  loadDataIntoEditor() {
    loadFromDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || this.localData || defaultHeader);
    });
  }

  setEditorEvents() {
    // Save the content of the editor to localStorage whenever it changes
    this.editor.on('change', () => {
      localStorage.setItem(this.localStorageKey, this.editor.getValue());
    });

    // Save the content of the editor to IndexedDB when it loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      saveToDb(localStorage.getItem(this.localStorageKey));
    });
  }
}
