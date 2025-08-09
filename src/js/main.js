import "./script.js"; // alltid laddad
console.log('script.js loaded')

// src/js/main.js
import { initRamschema } from './ramschema.js';

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.endsWith('ramschema.html')) {
    initRamschema();
    console.log('ramschema.js loaded')
  }
});



