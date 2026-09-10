// app.js — ES module entry
import { renderMain, renderBoard, renderMed } from './ui.js';

const DATA_BASE = './data';
const MCQ_JSON_URL = `${DATA_BASE}/mcq-bank.json`;
// Fallback raw MCQ HTML (master repository in this repo)
const RAW_SOURCE = 'https://raw.githubusercontent.com/nooribabajan/Structure-Coding-Test/cb506a22f8afb0ff6c2721b767588b6aa0c71807/Memory/MQB.html';

const state = { mcqs: null };

async function init() {
  document.getElementById('btnHome').addEventListener('click', () => renderMain());
  document.getElementById('btnBoard').addEventListener('click', () => renderBoard(getMCQs));
  document.getElementById('btnMed').addEventListener('click', () => renderMed(getMCQs));

  renderMain();

  // Prefetch JSON in background; if not present we'll later fetch and parse RAW_SOURCE
  fetch(MCQ_JSON_URL, { cache: 'no-store' }).then(r => {
    if (r.ok) return r.json();
    return null;
  }).then(json => { state.mcqs = json; if (json) console.info('MCQ JSON loaded, items:', json.length); })
    .catch(err => { console.info('MCQ JSON not available locally — will try raw fallback', err); });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.dispatchEvent(new CustomEvent('app:closeVisual'));
  });
}

async function getMCQs() {
  if (state.mcqs) return state.mcqs;

  // Try JSON first
  try {
    const res = await fetch(MCQ_JSON_URL, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      state.mcqs = json;
      return json;
    }
  } catch (e) {
    console.warn('MCQ JSON fetch failed, trying raw fallback', e);
  }

  // Fallback: fetch raw MCQ HTML and parse
  try {
    const res = await fetch(RAW_SOURCE, { cache: 'no-store' });
    if (!res.ok) throw new Error('raw MCQ source fetch failed');
    const text = await res.text();
    const parsed = parseMQB(text);
    state.mcqs = parsed;
    console.info('Parsed MCQs from raw source, count:', parsed.length);
    return parsed;
  } catch (err) {
    console.error('Failed to load MCQs', err);
    alert('سوالات لوڈ نہیں ہو سکیں — دوبارہ کوشش کریں');
    return [];
  }
}

// Lightweight parser for the MCQ repository HTML/text. It aims to extract numbered questions, options A-D and answer letters.
function parseMQB(rawText) {
  // If rawText contains HTML with an element having id="mcq-repository", try to extract its text content first
  try {
    const doc = new DOMParser().parseFromString(rawText, 'text/html');
    const repoEl = doc.getElementById('mcq-repository');
    if (repoEl) rawText = repoEl.textContent || repoEl.innerText || rawText;
  } catch (e) {
    // ignore — proceed with raw text
  }

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const questions = [];
  let currentChapter = null;

  const chapterRegex = /^Chapter\s*(\d+)[:\-]/i;
  const qStartRegex = /^(?:Re?\s*\d+\.|\d{1,3}\.)\s*(.*)$/; // handles '1.' or 'Q1.' variants
  const altQStart = /^(\d{1,3})[\)\.]\s*(.*)$/; // '1) question' or '1. question'
  const optionRegex = /^([A-D])\)?[\.\)]?\s*(.*)$/i; // matches 'A) text' or 'A. text' or 'A text'
  const answerRegex = /درست جواب[:：\s]*([A-Da-d])|Correct answer[:\s]*([A-Da-d])/i;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Chapter heading
    const chMatch = line.match(chapterRegex);
    if (chMatch) {
      currentChapter = parseInt(chMatch[1], 10);
      i++;
      continue;
    }

    // Detect a question start: line starting with '1.' or similar OR line that looks like a question (ends with '?') and previous line was a number
    let qMatch = line.match(qStartRegex) || line.match(altQStart);
    if (!qMatch) {
      // Sometimes questions are presented without explicit number but followed by options; heuristics: line ends with '?' or is non-option and next lines A)..D)
      const nextLines = lines.slice(i, i + 6).join(' ');
      if (/\?["'’””]?\s*$/.test(line) || /\?\s/.test(line) && /\bA\)/.test(nextLines)) {
        qMatch = [null, line];
      }
    }

    if (qMatch) {
      const qText = qMatch[1] ? qMatch[1].trim() : (qMatch[2] ? qMatch[2].trim() : line);
      const qObj = { id: null, chapter: currentChapter, question: qText, options: [], correct: null, explanation: null };

      // Move to following lines to capture options A-D
      i++;
      // consume possible empty lines
      while (i < lines.length && lines[i].length === 0) i++;

      // Collect up to 6 options or until answer marker
      const opts = {};
      while (i < lines.length) {
        const l = lines[i];
        const optMatch = l.match(optionRegex);
        const ansMatch = l.match(answerRegex);
        if (optMatch) {
          const letter = optMatch[1].toUpperCase();
          const text = optMatch[2].trim();
          // Some options are on multiple lines; join following non-option lines until next option or answer
          let j = i + 1;
          let extra = [];
          while (j < lines.length && !lines[j].match(optionRegex) && !lines[j].match(answerRegex) && !lines[j].match(/^\d+\./) ) {
            extra.push(lines[j]);
            j++;
          }
          if (extra.length) {
            // append extras to this option text
            const more = extra.join(' ');
            opts[letter] = (opts[letter] ? opts[letter] + ' ' : '') + text + ' ' + more;
            i = j;
            continue;
          }
          opts[letter] = text;
          i++;
          continue;
        } else if (ansMatch) {
          const letter = (ansMatch[1] || ansMatch[2] || '').toUpperCase();
          if (letter) qObj.correct = ({'A':0,'B':1,'C':2,'D':3}[letter] ?? null);
          i++;
          break;
        } else if (/^Explanation[:：\s]/i.test(l) || /^Explanation/i.test(l) || /^تفصیل|^وضاحت/.test(l)) {
          // capture following explanation lines until next question
          let j = i + 1; let expl = [];
          while (j < lines.length && !lines[j].match(/^\d+\./) && !lines[j].match(optionRegex) && !lines[j].match(answerRegex)) {
            expl.push(lines[j]); j++; }
          qObj.explanation = expl.join(' ');
          i = j;
          break;
        } else if (/^\d{1,3}[\).]/.test(l)) {
          // next question reached
          break;
        } else {
          // Unrecognized line — could be part of question continuation
          // If no options yet, append to question
          if (Object.keys(opts).length === 0) {
            qObj.question = (qObj.question + ' ' + l).trim();
            i++;
            continue;
          } else {
            // probably extraneous — skip
            i++;
            continue;
          }
        }
      }

      // Build options array in A-D order if present
      const ordered = [];
      ['A','B','C','D'].forEach(letter => {
        if (opts[letter]) ordered.push(opts[letter]);
      });
      qObj.options = ordered;

      // Only include question if at least one option or text
      if (qObj.question && qObj.options.length) {
        qObj.id = `Q${questions.length+1}`;
        questions.push(qObj);
      }

      continue; // don't increment i here because inner loops advanced it
    }

    i++;
  }

  return questions;
}

export { getMCQs };

document.addEventListener('DOMContentLoaded', init);
