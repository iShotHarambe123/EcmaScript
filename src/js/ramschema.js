// Ramschema API tabell
const dataUrl = 'https://webbutveckling.miun.se/files/ramschema_ht24.json';

export async function initRamschema() {
  const tableBody = document.getElementById('rows');
  const searchInput = document.getElementById('search'); // <input id="search">
  if (!tableBody) return;

  let courses = [];

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

  try {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    courses = await res.json();

    render(courses); // initial visning

    // live-sök
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const filtered = filter(courses, e.target.value);
        render(filtered);
      });
    }
  } catch (e) {
    console.error('Kunde inte läsa in data:', e);
    tableBody.innerHTML = `<tr><td class="muted">Kunde inte läsa in data.</td></tr>`;
  }
}
