
(() => {
  const $ = (selector) => document.querySelector(selector);
  const topics = window.BUSINESS_TOPICS;
  const sections = window.BUSINESS_SECTIONS;
  const storageKey = 'businessIGCSEProgress_v1';

  let completed = loadProgress();
  let activeSection = 'all';
  let quizIndex = 0;
  let quizOrder = shuffle([...window.BUSINESS_QUIZ]);
  let selectedQuizAnswer = null;

  function loadProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return new Set(Array.isArray(value) ? value : []);
    } catch {
      return new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...completed]));
    } catch {
      // Browser storage may be disabled.
    }
  }

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function sectionLabel(id) {
    return sections.find(s => s.id === id)?.label.replace(/^\d\. /, '') || id;
  }

  function renderFilters() {
    $('#sectionFilters').innerHTML = sections.map(s =>
      `<button class="filter-chip ${s.id === activeSection ? 'active' : ''}" data-section="${s.id}">${s.label}</button>`
    ).join('');

    $('#sectionFilters').querySelectorAll('button').forEach(button =>
      button.addEventListener('click', () => {
        activeSection = button.dataset.section;
        renderFilters();
        renderTopics();
      })
    );
  }

  function renderTopics() {
    const query = $('#searchInput').value.trim().toLowerCase();

    const filtered = topics.filter(t =>
      (activeSection === 'all' || t.section === activeSection) &&
      (!query || [t.title, t.summary, t.definition, t.sectionName, ...t.keywords]
        .join(' ').toLowerCase().includes(query))
    );

    $('#topicGrid').innerHTML = filtered.map((t, i) =>
      `<article class="topic-card">
        <div class="topic-card-top">
          <span class="topic-number">${String(i + 1).padStart(2, '0')} · ${sectionLabel(t.section)}</span>
          ${completed.has(t.id) ? '<span class="done-mark">✓ Done</span>' : ''}
        </div>
        <h3>${escapeHTML(t.title)}</h3>
        <p>${escapeHTML(t.summary)}</p>
        <button data-topic="${t.id}">Study this topic →</button>
      </article>`
    ).join('');

    $('#noResults').hidden = filtered.length > 0;

    $('#topicGrid').querySelectorAll('[data-topic]').forEach(button =>
      button.addEventListener('click', () => openTopic(button.dataset.topic))
    );
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function openTopic(id) {
    const t = topics.find(topic => topic.id === id);
    if (!t) return;

    $('#dialogContent').innerHTML = `
      <p class="eyebrow">${escapeHTML(t.sectionName)}</p>
      <h2>${escapeHTML(t.title)}</h2>
      <p>${escapeHTML(t.summary)}</p>

      <div class="definition-box">
        <strong>Key definition</strong>
        <p>${escapeHTML(t.definition)}</p>
      </div>

      <h3>What you need to know</h3>
      <ul>${t.points.map(p =>
        `<li><strong>${escapeHTML(p[0])}:</strong> ${escapeHTML(p[1])}</li>`
      ).join('')}</ul>

      <h3>Business example</h3>
      <p>${escapeHTML(t.example)}</p>

      <div class="exam-tip">
        <strong>Exam technique:</strong> ${escapeHTML(t.examTip)}
      </div>

      <h3>Check your understanding</h3>
      <p><strong>${escapeHTML(t.question)}</strong></p>
      <details>
        <summary>Reveal a sample answer</summary>
        <p>${escapeHTML(t.answer)}</p>
      </details>

      <button id="markTopicDone" class="mark-done">
        ${completed.has(t.id) ? 'Mark as not completed' : 'Mark topic as completed ✓'}
      </button>
    `;

    $('#topicDialog').showModal();

    $('#markTopicDone').addEventListener('click', () => {
      if (completed.has(t.id)) completed.delete(t.id);
      else completed.add(t.id);

      saveProgress();
      updateProgress();
      renderTopics();
      openTopic(t.id);
    });
  }

  function updateProgress() {
    const count = topics.filter(t => completed.has(t.id)).length;
    const percent = Math.round(count / topics.length * 100);

    $('#heroCompleted').textContent = count;
    $('#heroProgressBar').style.width = `${percent}%`;
    $('#heroProgressText').textContent = count
      ? `${percent}% complete — keep going.`
      : 'Start a topic to build your progress.';

    $('#progressCount').textContent = count;
    $('#totalTopics').textContent = topics.length;
    $('#mainProgressBar').style.width = `${percent}%`;
    $('#mainProgressText').textContent = count
      ? `You've completed ${percent}% of the topics in this starter library.`
      : 'Your learning progress will appear here.';
  }

  function renderQuiz() {
    const q = quizOrder[quizIndex];

    $('#quizCard').innerHTML = `
      <span class="quiz-meta">QUESTION ${quizIndex + 1} OF ${quizOrder.length}</span>
      <h3>${escapeHTML(q.q)}</h3>

      <div class="answer-list">
        ${q.options.map((option, i) => {
          let cls = 'answer-option';

          if (selectedQuizAnswer !== null && i === q.answer) {
            cls += ' correct';
          } else if (selectedQuizAnswer === i && i !== q.answer) {
            cls += ' incorrect';
          }

          return `<button class="${cls}" data-answer="${i}" ${selectedQuizAnswer !== null ? 'disabled' : ''}>
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
            <span>${escapeHTML(option)}</span>
          </button>`;
        }).join('')}
      </div>

      ${selectedQuizAnswer !== null ? `
        <div class="quiz-feedback">
          <strong>${selectedQuizAnswer === q.answer ? 'Correct!' : 'Not quite.'}</strong><br>
          ${escapeHTML(q.explanation)}
        </div>
      ` : ''}

      <div class="quiz-controls">
        <span class="muted">${selectedQuizAnswer === null ? 'Choose the best answer.' : 'Take a moment to read the explanation.'}</span>
        <button id="nextQuiz" ${selectedQuizAnswer === null ? 'disabled' : ''}>
          ${quizIndex === quizOrder.length - 1 ? 'Try a new set' : 'Next question →'}
        </button>
      </div>
    `;

    $('#quizCard').querySelectorAll('[data-answer]').forEach(button =>
      button.addEventListener('click', () => {
        selectedQuizAnswer = Number(button.dataset.answer);
        renderQuiz();
      })
    );

    $('#nextQuiz').addEventListener('click', () => {
      if (quizIndex === quizOrder.length - 1) {
        quizOrder = shuffle([...window.BUSINESS_QUIZ]);
        quizIndex = 0;
      } else {
        quizIndex++;
      }

      selectedQuizAnswer = null;
      renderQuiz();
    });
  }

  async function askTutor() {
    const question = $('#tutorQuestion').value.trim();
    const topic = $('#tutorTopic').value;

    $('#tutorError').hidden = true;
    $('#tutorAnswer').hidden = true;

    if (!question) {
      $('#tutorError').textContent = 'Enter a question first.';
      $('#tutorError').hidden = false;
      return;
    }

    const button = $('#askButton');
    button.disabled = true;
    button.innerHTML = 'Thinking…';

    try {
      const response = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, topic })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The tutor could not answer right now.');
      }

      $('#tutorAnswer').textContent = data.answer;
      $('#tutorAnswer').hidden = false;
    } catch (error) {
      $('#tutorError').textContent = error.message ||
        'The tutor could not answer right now. If testing locally, deploy on Netlify or use Netlify Dev.';
      $('#tutorError').hidden = false;
    } finally {
      button.disabled = false;
      button.innerHTML = 'Ask the tutor <span>→</span>';
    }
  }

  $('#searchInput').addEventListener('input', renderTopics);
  $('#closeDialog').addEventListener('click', () => $('#topicDialog').close());

  $('#topicDialog').addEventListener('click', event => {
    if (event.target === $('#topicDialog')) $('#topicDialog').close();
  });

  $('#tutorQuestion').addEventListener('input', () => {
    $('#questionCount').textContent = `${$('#tutorQuestion').value.length}/2000`;
  });

  $('#askButton').addEventListener('click', askTutor);

  document.querySelectorAll('[data-prompt]').forEach(button =>
    button.addEventListener('click', () => {
      $('#tutorQuestion').value = button.dataset.prompt;
      $('#questionCount').textContent = `${button.dataset.prompt.length}/2000`;
      $('#tutorQuestion').focus();
    })
  );

  $('#resetProgress').addEventListener('click', () => {
    if (confirm('Reset all completed topics on this device?')) {
      completed.clear();
      saveProgress();
      updateProgress();
      renderTopics();
    }
  });

  $('#menuToggle').addEventListener('click', () => {
    const nav = $('#mainNav');
    const open = nav.classList.toggle('open');
    $('#menuToggle').setAttribute('aria-expanded', String(open));
  });

  $('#mainNav').querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      $('#mainNav').classList.remove('open');
      $('#menuToggle').setAttribute('aria-expanded', 'false');
    })
  );

  renderFilters();
  renderTopics();
  renderQuiz();
  updateProgress();
})();
