// Ramschema API tabell
const dataUrl = 'https://webbutveckling.miun.se/files/ramschema_ht24.json';

export async function initRamschema() {
  const tableBody = document.getElementById('rows');
  const searchInput = document.getElementById('search');
  const sortButtons = document.querySelectorAll('thead [data-sort]');
  if (!tableBody) return;

  let courses = [];
  let currentSortKey = 'code'; // börjar med att sortera på kurskod
  const collator = new Intl.Collator('sv', { sensitivity: 'base', numeric: true });

  const render = (list) => {
    tableBody.innerHTML = list.map(c => `
      <tr>
        <td>${c.code.toUpperCase()}</td>
        <td>${c.coursename}</td>
        <td>${c.progression}</td>
      </tr>
    `).join('');
  };

  const filter = (list, q) => {
    if (!q) return list;
    const n = q.trim().toLowerCase();
    return list.filter(c =>
      c.code.toLowerCase().includes(n) ||
      c.coursename.toLowerCase().includes(n)
    );
  };

  const sortAsc = (list, key) =>
    [...list].sort((a, b) =>
      collator.compare(String(a[key] ?? ''), String(b[key] ?? ''))
    );

  try {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    courses = await res.json();

    // Första visningen: sortera på nuvarande kolumn
    render(sortAsc(filter(courses, searchInput?.value || ''), currentSortKey));

    // Sök medan man skriver, behåll samma sorteringskolumn
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const filtered = filter(courses, e.target.value);
        render(sortAsc(filtered, currentSortKey));
      });
    }

    // Klick på kolumnknapp = sortera på den kolumnen
    sortButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentSortKey = btn.dataset.sort; // code, coursename eller progression
        const filtered = filter(courses, searchInput?.value || '');
        render(sortAsc(filtered, currentSortKey));
      });
    });

  } catch (e) {
    console.error('Kunde inte läsa in data:', e);
    tableBody.innerHTML = `<tr><td class="muted">Kunde inte läsa in data.</td></tr>`;
  }
}
