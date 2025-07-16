let menu = [];
let current = {};
let score = 0;
let questionCount = 0;
const totalQuestions = 10;

async function loadMenu() {
  const res = await fetch('legacy_menu.json');
  menu = await res.json();
  nextQuestion();
}

function nextQuestion() {
  if (questionCount >= totalQuestions) {
    const result = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    result.textContent = `Тест завершён. ${score}/${totalQuestions} правильных.`;
    optionsEl.innerHTML = score >= 7
      ? "🎩 Уважение. Ты знаешь меню, как Дон знает семью."
      : "❌ Ты подвёл семью. Повтори ещё раз.";
    document.querySelector("button").disabled = true;
    return;
  }

  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const scoreEl = document.getElementById('score');
  optionsEl.innerHTML = '';
  scoreEl.textContent = `Вопрос ${questionCount + 1} из ${totalQuestions}`;

  current = menu[Math.floor(Math.random() * menu.length)];
  questionEl.textContent = `Сколько стоит блюдо: "${current.name}"?`;

  let prices = [current.price];
  while (prices.length < 4) {
    let fake = menu[Math.floor(Math.random() * menu.length)].price;
    if (!prices.includes(fake)) prices.push(fake);
  }

  prices = prices.sort(() => Math.random() - 0.5);

  prices.forEach(price => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.textContent = `${price} ₸`;
    btn.onclick = () => checkAnswer(price);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(price) {
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    const val = parseInt(option.textContent);
    if (val === current.price) {
      option.style.background = '#1d6b1d';
    } else if (val === price) {
      option.style.background = '#6b1d1d';
    }
    option.onclick = null;
  });

  if (price === current.price) score++;
  questionCount++;
}
window.onload = loadMenu;
