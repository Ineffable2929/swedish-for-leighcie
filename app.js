// ============================================================
//  Swedish for Leighcie — app logic
//  Renders the note, category cards, tap-to-speak, and the quiz.
//  Content lives in data.js — you shouldn't need to edit this file.
// ============================================================

/* ---------- Text-to-speech (real Swedish voice when available) ---------- */
let svVoice = null;
function pickVoice() {
  const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  // Prefer a Swedish voice; fall back to anything tagged sv, else default.
  svVoice =
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith("sv")) ||
    voices.find(v => /svensk|swedish/i.test(v.name)) ||
    null;
}
if (window.speechSynthesis) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}

function speak(text, cardEl) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "sv-SE";
  if (svVoice) u.voice = svVoice;
  u.rate = 0.9;
  if (cardEl) {
    cardEl.classList.add("speaking");
    u.onend = u.onerror = () => cardEl.classList.remove("speaking");
  }
  speechSynthesis.speak(u);
}

/* ---------- Render the personal note ---------- */
function renderNote() {
  const el = document.getElementById("note");
  if (!NOTE || !NOTE.message) { el.style.display = "none"; return; }
  el.innerHTML =
    '<span class="paw">🐾</span>' +
    "<p>" + escapeHtml(NOTE.message) + "</p>" +
    '<div class="sig">— ' + escapeHtml(NOTE.from || "") + "</div>";
}

/* ---------- Render category nav + sections ---------- */
function renderCategories() {
  const nav = document.getElementById("nav");
  const main = document.getElementById("sections");

  CATEGORIES.forEach((cat, i) => {
    // nav chip
    const chip = document.createElement("button");
    chip.textContent = cat.emoji + " " + cat.title;
    chip.dataset.target = cat.id;
    chip.onclick = () => {
      document.getElementById(cat.id).scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveChip(cat.id);
    };
    nav.appendChild(chip);

    // section
    const sec = document.createElement("section");
    sec.className = "cat";
    sec.id = cat.id;
    sec.innerHTML =
      '<div class="cat-head"><span class="em">' + cat.emoji + "</span>" +
      "<h2>" + escapeHtml(cat.title) + "</h2></div>" +
      '<p class="cat-blurb">' + escapeHtml(cat.blurb || "") + "</p>";

    const grid = document.createElement("div");
    grid.className = "grid";
    cat.phrases.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML =
        '<span class="spk">🔊</span>' +
        '<span class="sv">' + escapeHtml(p.sv) + "</span>" +
        '<span class="en">' + escapeHtml(p.en) + "</span>" +
        (p.say ? '<span class="say">“' + escapeHtml(p.say) + '”</span>' : "");
      card.onclick = () => speak(p.sv, card);
      grid.appendChild(card);
    });
    sec.appendChild(grid);
    main.appendChild(sec);
  });
}

function setActiveChip(id) {
  document.querySelectorAll("#nav button").forEach(b =>
    b.classList.toggle("active", b.dataset.target === id)
  );
}

/* ---------- Quiz: "feed the cat" (10 questions, then results) ---------- */
const ALL_PHRASES = CATEGORIES.flatMap(c => c.phrases);
const QUIZ_LENGTH = 10;
let quizQueue = [], quizIndex = 0, quizScore = 0, quizMissed = [];

function startQuiz() {
  quizQueue = shuffle(ALL_PHRASES).slice(0, QUIZ_LENGTH);
  quizIndex = 0; quizScore = 0; quizMissed = [];
  const q = document.getElementById("quiz");
  q.style.display = "block";
  nextQuestion();
  q.scrollIntoView({ behavior: "smooth", block: "center" });
}

function catFace() {
  if (quizScore === 0) return "🐱";
  return (quizScore / Math.max(quizIndex, 1)) >= 0.7 ? "😺" : "🙂";
}

function nextQuestion() {
  const q = document.getElementById("quiz");
  if (quizIndex >= quizQueue.length) { showResults(); return; }

  const answer = quizQueue[quizIndex];
  const wrongs = shuffle(ALL_PHRASES.filter(p => p.en !== answer.en)).slice(0, 3);
  const options = shuffle([answer, ...wrongs]);

  q.innerHTML =
    '<div class="feed">' + catFace() + "</div>" +
    '<div class="score">Question ' + (quizIndex + 1) + " of " + QUIZ_LENGTH +
      "  ·  🐱 " + quizScore + " treats</div>" +
    '<div class="prompt">' + escapeHtml(answer.sv) +
      "<small>What does this mean? (tap to hear it 🔊)</small></div>";

  q.querySelector(".prompt").onclick = () => speak(answer.sv);

  const opts = document.createElement("div");
  opts.className = "opts";
  options.forEach(opt => {
    const b = document.createElement("button");
    b.textContent = opt.en;
    b.onclick = () => {
      const correct = opt.en === answer.en;
      if (correct) { quizScore++; b.classList.add("right"); }
      else {
        b.classList.add("wrong");
        quizMissed.push(answer);
        [...opts.children].forEach(x => { if (x.textContent === answer.en) x.classList.add("right"); });
      }
      [...opts.children].forEach(x => x.disabled = true);
      quizIndex++;
      q.querySelector(".feed").textContent = correct ? "😻" : "🙀";
      q.querySelector(".score").textContent =
        "Question " + quizIndex + " of " + QUIZ_LENGTH + "  ·  🐱 " + quizScore + " treats";
      speak(answer.sv);

      const nxt = document.createElement("div");
      nxt.className = "next";
      nxt.innerHTML = "<button>" + (quizIndex >= quizQueue.length ? "See results 🎉" : "Next →") + "</button>";
      nxt.querySelector("button").onclick = nextQuestion;
      q.appendChild(nxt);
    };
    opts.appendChild(b);
  });
  q.appendChild(opts);
}

function showResults() {
  const q = document.getElementById("quiz");
  const fed = "🐱".repeat(Math.max(1, quizScore));
  let face, msg;
  if (quizScore === QUIZ_LENGTH)   { face = "😻"; msg = "Purr-fect! The cat is very, very full. 🏆"; }
  else if (quizScore >= 7)         { face = "😻"; msg = "The cat is happy and well-fed. Snyggt! 🎉"; }
  else if (quizScore >= 4)         { face = "😺"; msg = "The cat got some treats — keep practicing! 🐾"; }
  else                             { face = "🐱"; msg = "The cat is still a little hungry. Give it another go! 🐱"; }

  q.innerHTML =
    '<div class="feed">' + face + "</div>" +
    '<div class="result-score">' + quizScore + " / " + QUIZ_LENGTH + " treats</div>" +
    '<div class="fed-row">' + fed + "</div>" +
    '<div class="result-msg">' + msg + "</div>" +
    '<div class="result-actions">' +
      '<button class="again">🔁 Take it again</button>' +
      (quizMissed.length ? '<button class="review">📖 Review what I missed (' + quizMissed.length + ")</button>" : "") +
    "</div>";
  q.querySelector(".again").onclick = startQuiz;
  const rev = q.querySelector(".review");
  if (rev) rev.onclick = showReview;
}

function showReview() {
  const q = document.getElementById("quiz");
  const seen = new Set();
  const list = quizMissed.filter(p => !seen.has(p.en) && seen.add(p.en));
  q.innerHTML =
    '<div class="feed">📖</div>' +
    '<div class="result-msg">Words to practice — tap any to hear it 🔊</div>' +
    '<div class="review-list">' +
      list.map(p =>
        '<div class="review-item" data-sv="' + escapeHtml(p.sv) + '">' +
          '<span class="sv">' + escapeHtml(p.sv) + "</span>" +
          '<span class="en">' + escapeHtml(p.en) + "</span>" +
          (p.say ? '<span class="say">“' + escapeHtml(p.say) + '”</span>' : "") +
        "</div>"
      ).join("") +
    "</div>" +
    '<div class="result-actions"><button class="again">🔁 Take the quiz again</button></div>';
  q.querySelectorAll(".review-item").forEach(it => (it.onclick = () => speak(it.dataset.sv, it)));
  q.querySelector(".again").onclick = startQuiz;
}

/* ---------- helpers ---------- */
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- boot ---------- */
renderNote();
renderCategories();
document.getElementById("quizBtn").onclick = startQuiz;

// highlight the nav chip for whichever section is on screen
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) setActiveChip(e.target.id); }),
  { rootMargin: "-40% 0px -55% 0px" }
);
CATEGORIES.forEach(c => observer.observe(document.getElementById(c.id)));
