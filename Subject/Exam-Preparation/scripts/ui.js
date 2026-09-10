// ui.js — UI helpers and renderers
export function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }

function getTemplate(id){ return document.getElementById(id) }

export function renderMain(){
  const host = document.getElementById('mainPanel');
  host.innerHTML = `
    <div class="panel">
      <h2>Biology Examination</h2>
      <p>سلیبس کے مطابق منظم امتحانی نظام، بورڈ تیاری اور میڈکیٹ تیاریاں یہاں دستیاب ہیں۔</p>
      <p><button id="openBoardQuick" class="btn">پشاور بورڈ — کھولیں</button>
      <button id="openMedQuick" class="btn">میڈکیٹ — کھولیں</button></p>
    </div>`;
  setTimeout(() => {
    document.getElementById('openBoardQuick').addEventListener('click', () => renderBoard());
    document.getElementById('openMedQuick').addEventListener('click', () => renderMed());
  }, 0);
}

export async function renderBoard(getMCQs) {
  const host = document.getElementById('mainPanel');
  host.innerHTML = '<div class="panel"><h2 class="section-title">پشاور بورڈ ایگزام پریپریشن</h2><div id="boardContent">لوڈ کر رہے ہیں…</div></div>';
  const container = document.getElementById('boardContent');

  let mcqs = [];
  if (typeof getMCQs === 'function') mcqs = await getMCQs();
  else {
    try { mcqs = await fetch('./data/mcq-bank.json').then(r=>r.json()); } catch(e){ mcqs = []; }
  }

  if (!mcqs || mcqs.length === 0) {
    container.innerHTML = '<div class="status">اس scope کے لیے Question Bank میں سوالات دستیاب نہیں ملے۔</div>';
    return;
  }

  const q = mcqs[0];
  container.innerHTML = '';
  renderQuestion(container, q);
}

export async function renderMed(getMCQs) {
  const host = document.getElementById('mainPanel');
  host.innerHTML = '<div class="panel"><h2 class="section-title">میڈکیٹ</h2><div id="medContent">لوڈ کر رہے ہیں…</div></div>';
  const container = document.getElementById('medContent');

  container.innerHTML = `<p>Official MDCAT Biology Coverage — 16 Units</p>
    <div><button id="openReasoning" class="btn">Reasoning Lecture</button>
    <button id="openMethod" class="btn">General Methodology</button></div>
    <div id="medList" style="margin-top:12px"></div>`;

  document.getElementById('openReasoning').addEventListener('click', async () => {
    await import('./app.js').then(m => m.loadLecture('./data/med-lectures/reasoning-01.html', 'Med-CAT Reasoning Mastery — Lecture 01'));
  });
  document.getElementById('openMethod').addEventListener('click', async () => {
    await import('./app.js').then(m => m.loadLecture('./data/med-lectures/methodology.html', 'Med-CAT General Methodology'));
  });

  const medList = document.getElementById('medList');
  const units = [
    ['01','Acellular Life'],
    ['02','Bioenergetics'],
    ['03','Biological Molecules'],
    ['04','Cell Structure & Function']
  ];
  medList.innerHTML = units.map(u => `<button class="btn med-unit" data-unit="${u[0]}">${u[0]} — ${esc(u[1])}</button>`).join(' ');
  medList.querySelectorAll('.med-unit').forEach(b => b.addEventListener('click', () => {
    renderUnitQuestions(b.dataset.unit);
  }));
}

function renderUnitQuestions(unitId){
  const host = document.getElementById('mainPanel');
  const container = host.querySelector('#medContent') || host;
  const list = document.createElement('div');
  list.className = 'panel';
  list.innerHTML = `<h3>Unit ${unitId} — Sample Questions</h3><div class="unit-qs">لوڈ کر رہے ہیں…</div>`;
  container.appendChild(list);

  fetch('./data/mcq-bank.json').then(r => r.json()).then(data => {
    const q = data && data[0];
    if (q) renderQuestion(list.querySelector('.unit-qs'), q);
    else list.querySelector('.unit-qs').textContent = 'No questions in this unit.';
  }).catch(() => { list.querySelector('.unit-qs').textContent = 'Unable to load questions.'});
}

export function renderQuestion(host, q) {
  if (!host) return;
  const tpl = getTemplate('tmpl-question');
  const node = tpl.content.cloneNode(true);
  node.querySelector('.qtext').textContent = q.question || q.t || 'سوال';
  const ul = node.querySelector('.options');
  const options = q.options || q[1] || [];
  options.forEach((opt, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => answerHandler(btn, i, q));
    li.appendChild(btn);
    ul.appendChild(li);
  });
  host.innerHTML = '';
  host.appendChild(node);
  const firstOpt = host.querySelector('.opt');
  if (firstOpt) firstOpt.focus();
}

function answerHandler(btn, idx, q){
  const correct = (typeof q.correct === 'number') ? q.correct : (q.correct === idx);
  if (correct) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    const opts = btn.closest('.qcard').querySelectorAll('.opt');
    if (typeof q.correct === 'number' && opts[q.correct]) opts[q.correct].classList.add('correct');
  }
}

let focusableBefore;
export function openVisualViewer(htmlContent, title = '') {
  let viewer = document.getElementById('visualViewer');
  if (!viewer) {
    viewer = document.createElement('div');
    viewer.id = 'visualViewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.innerHTML = `<div class="visual-modal" role="document">
      <div class="visual-modal-head"><h2 class="visual-title"></h2><button class="visual-close" aria-label="Close">×</button></div>
      <iframe class="visual-frame" sandbox="allow-same-origin allow-scripts"></iframe>
    </div>`;
    document.body.appendChild(viewer);
  }

  viewer.classList.remove('hidden');
  viewer.querySelector('.visual-title').textContent = title || '';
  const iframe = viewer.querySelector('.visual-frame');
  iframe.srcdoc = htmlContent;

  focusableBefore = document.activeElement;
  const closeBtn = viewer.querySelector('.visual-close');
  closeBtn.addEventListener('click', closeVisualViewer);
  document.addEventListener('app:closeVisual', closeVisualViewer);
  closeBtn.focus();
}

export function closeVisualViewer(){
  const viewer = document.getElementById('visualViewer');
  if (!viewer) return;
  viewer.classList.add('hidden');
  const iframe = viewer.querySelector('.visual-frame');
  if (iframe) iframe.srcdoc = '';
  if (focusableBefore && typeof focusableBefore.focus === 'function') focusableBefore.focus();
  document.removeEventListener('app:closeVisual', closeVisualViewer);
}
