import "./script.js"; // alltid laddad

// Importera endast ramschema.js om vi är på ramschema.html
if (window.location.pathname.endsWith("ramschema.html")) {
  import("./ramschema.js")
    .then(module => {
      console.log("Ramschema loaded");
    })
    .catch(err => console.error("Failed to load Ramschema:", err));
}
