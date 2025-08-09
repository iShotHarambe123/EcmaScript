// Ramschema API tabell
const dataUrl = 'https://webbutveckling.miun.se/files/ramschema_ht24.json';

export async function initRamschema() {
  const tableBody = document.getElementById('rows');
  if (!tableBody) return;

  const render = (list) => {
    tableBody.innerHTML = list.map(c => `
      <tr>
        <td>${c.code.toUpperCase()}</td>
        <td>${c.coursename}</td>
        <td>${c.progression}</td>
      </tr>
    `).join('');
  };

  try {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    render(data);
  } catch (e) {
    console.error('Kunde inte läsa in data:', e);
    tableBody.innerHTML = `<tr><td class="muted">Kunde inte läsa in data.</td></tr>`;
  }
}
