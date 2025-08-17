import "./script.js"; // alltid laddad
console.log('script.js loaded')

// src/js/main.js
import { initRamschema } from './ramschema.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname;
  if (path.endsWith('ramschema.html') || path.endsWith('ramschema') || path.endsWith('ramschema/')) {
    initRamschema();
    console.log('ramschema.js loaded');
  }
});




