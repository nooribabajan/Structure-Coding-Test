// app.js — ES module entry
import { renderMain, renderBoard, renderMed } from './ui.js';

const DATA_BASE = './data';
const MCQ_URL = `${DATA_BASE}/mcq-bank.json`;

const state = { mcqs: null };

async function init() {
  document.getElementById('btnHome').addEventListener('click', () => renderMain());
  document.getElementById('btnBoard').addEventListener('click', () => renderBoard(getMCQs));
  document.getElementById('btnMed').addEventListener('click', () => renderMed(getMCQs));

  renderMain();

  // Prefetch in background
  fetch(MCQ_URL, { cache: 'no-store' }).then(r => r.ok ? r.json() : null)
    .then(json => { state.mcqs = json; console.info('MCQ bank loaded, items:', json?.length || 0); })
    .catch(err => { console.warn('Could not prefetch MCQ bank (will fetch on demand)', err); });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.dispatchEvent(new CustomEvent('app:closeVisual'));
  });
}

async function getMCQs() {
  if (state.mcqs) return state.mcqs;
  try {
    const res = await fetch(MCQ_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load MCQ bank');
    state.mcqs = await res.json();
    return state.mcqs;
  } catch (err) {
    console.error(err);
    alert('سوالات لوڈ نہیں ہو سکیں — دوبارہ کوشش کریں');
    return [];
  }
}

export async function loadLecture(url, title) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load lecture');
    const html = await res.text();
    const ui = await import('./ui.js');
    ui.openVisualViewer(html, title);
  } catch (err) {
    console.error(err);
    alert('Lecture load failed');
  }
}

document.addEventListener('DOMContentLoaded', init);
