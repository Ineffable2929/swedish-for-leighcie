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

/* ---------- Quiz: "feed the cat" ---------- */
const ALL_PHRASES = CATEGORIES.flatMap(c => c.phrases);
let quizScore = 0, quizAsked = 0;

function startQuiz() {
  quizScore = 0; quizAsked = 0;
  document.getElementById("quiz").style.display = "block";
  nextQuestion();
  document.getElementById("quiz").scrollIntoView({ behavior: "smooth", block: "center" });
}

function nextQuestion() {
  const q = document.getElementById("quiz");
  const answer = pickRandom(ALL_PHRASES);
  // three wrong English options + the right one
  const wrongs = shuffle(ALL_PHRASES.filter(p => p.en !== answer.en)).slice(0, 3);
  const options = shuffle([answer, ...wrongs]);

  const fed = "🐱".repeat(Math.min(quizScore, 8)) || "🍽️";
  q.innerHTML =
    '<div class="feed">' + (quizScore > 0 ? "😺" : "🐱") + "</div>" +
    '<div class="score">Treats earned: ' + quizScore + " / " + quizAsked + "</div>" +
    '<div class="prompt">' + escapeHtml(answer.sv) +
      "<small>What does this mean? (tap to hear it 🔊)</small></div>";

  // tap prompt to hear
  q.querySelector(".prompt").onclick = () => speak(answer.sv);

  const opts = document.createElement("div");
  opts.className = "opts";
  options.forEach(opt => {
    const b = document.createElement("button");
    b.textContent = opt.en;
    b.onclick = () => {
      quizAsked++;
      const correct = opt.en === answer.en;
      if (correct) { quizScore++; b.classList.add("right"); }
      else {
        b.classList.add("wrong");
        [...opts.children].forEach(x => { if (x.textContent === answer.en) x.classList.add("right"); });
      }
      [...opts.children].forEach(x => x.disabled = true);
      q.querySelector(".feed").textContent = correct ? "😻" : "🙀";
      q.querySelector(".score").textContent = "Treats earned: " + quizScore + " / " + quizAsked;
      speak(answer.sv);

      const nxt = document.createElement("div");
      nxt.className = "next";
      nxt.innerHTML = "<button>Next →</button>";
      nxt.querySelector("button").onclick = nextQuestion;
      q.appendChild(nxt);
    };
    opts.appendChild(b);
  });
  q.appendChild(opts);
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
