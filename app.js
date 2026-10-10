(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);

  const topics = Array.isArray(window.BUSINESS_TOPICS)
    ? window.BUSINESS_TOPICS.filter(Boolean)
    : [];

  const quizQuestions = Array.isArray(window.BUSINESS_QUIZ)
    ? window.BUSINESS_QUIZ.filter(Boolean)
    : [];

  const rawSections = Array.isArray(window.BUSINESS_SECTIONS)
    ? window.BUSINESS_SECTIONS.filter(Boolean)
    : [];

  const storageKey = 'businessIGCSEProgress_v1';

  const requiredElements = [
    '#sectionFilters',
    '#searchInput',
    '#topicGrid',
    '#noResults',
    '#quizCard',
    '#topicDialog',
    '#dialogContent'
  ];

  const missingElements = requiredElements.filter(selector => !$(selector));

  if (missingElements.length) {
    console.error('Missing HTML elements:', missingElements);
    return;
  }

  const sections = rawSections.length
    ? rawSections
        .filter(section => String(section.id) !== 'all')
        .map(section => ({
          id: String(section.id),
          label: String(section.label || section.name || section.id)
        }))
    : [...new Map(
        topics.map(topic => [
          String(topic.section ?? 'other'),
          {
            id: String(topic.section ?? 'other'),
            label: String(
              topic.sectionName || topic.sectionLabel || topic.section || 'Other'
            )
          }
        ])
      ).values()];

  let completed = loadProgress();
  let activeSection = 'all';
  let quizIndex = 0;
  let quizOrder = shuffle([...quizQuestions]);
  let selectedQuizAnswer = null;

  function loadProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return new Set(Array.isArray(value) ? value : []);
    } catch (error) {
      console.warn('Could not load saved progress.', error);
      return new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...completed]));
    } catch (error) {
      console.warn('Could not save progress in this browser.', error);
    }
  }

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function getTopicTitle(topic) {
    return topic.title || topic.name || 'Untitled topic';
  }

  function getTopicSummary(topic) {
    return topic.summary || topic.description || 'Open this topic to study its content.';
  }

  function getTopicSection(topic) {
    return String(topic.section ?? 'other');
  }

  function getSectionLabel(id) {
    const section = sections.find(item => item.id === String(id));

    if (section) {
      return section.label.replace(/^\d+\.\s*/, '');
    }

    const topic = topics.find(item => getTopicSection(item) === String(id));

    return topic?.sectionName || topic?.sectionLabel || String(id);
  }

  function renderFilters() {
    const filters = [
      { id: 'all', label: 'All topics' },
      ...sections
    ];

    $('#sectionFilters').innerHTML = filters.map(section => `
      <button
        type="button"
        class="filter-chip ${String(section.id) === activeSection ? 'active' : ''}"
        data-section="${escapeHTML(section.id)}"
        aria-pressed="${String(section.id) === activeSection}"
      >${escapeHTML(section.label)}</button>
    `).join('');

    $('#sectionFilters').querySelectorAll('[data-section]').forEach(button => {
      button.addEventListener('click', () => {
        activeSection = button.dataset.section;
        renderFilters();
        renderTopics();
      });
    });
  }

  function renderTopics() {
    const query = $('#searchInput').value.trim().toLowerCase();

    const filtered = topics.filter(topic => {
      const matchesSection =
        activeSection === 'all' ||
        getTopicSection(topic) === activeSection;

      const keywords = Array.isArray(topic.keywords)
        ? topic.keywords
        : [];

      const searchableText = [
        getTopicTitle(topic),
        getTopicSummary(topic),
        topic.definition || '',
        topic.sectionName || '',
        topic.sectionLabel || '',
        ...keywords
      ].join(' ').toLowerCase();

      return matchesSection && (!query || searchableText.includes(query));
    });

    if (topics.length === 0) {
      $('#topicGrid').innerHTML = `
        <p class="empty-state">
          No topic data has loaded. Check that content.js, content2.js,
          content3.js and content4.js load successfully before app.js.
        </p>
      `;

      $('#noResults').hidden = true;
      updateProgress();
      return;
    }

    $('#topicGrid').innerHTML = filtered.map((topic, index) => {
      const title = getTopicTitle(topic);
      const summary = getTopicSummary(topic);
      const isCompleted = completed.has(topic.id);

      return `
        <article class="topic-card">
          <div class="topic-card-top">
            <span class="topic-number">
              ${String(index + 1).padStart(2, '0')} ·
              ${escapeHTML(getSectionLabel(getTopicSection(topic)))}
            </span>
            ${isCompleted ? '<span class="done-mark">✓ Done</span>' : ''}
          </div>

          <h3>${escapeHTML(title)}</h3>
          <p>${escapeHTML(summary)}</p>

          <button type="button" data-topic="${escapeHTML(topic.id)}">
            Study this topic →
          </button>
        </article>
      `;
    }).join('');

    $('#noResults').hidden = filtered.length > 0;

    $('#topicGrid').querySelectorAll('[data-topic]').forEach(button => {
      button.addEventListener('click', () => openTopic(button.dataset.topic));
    });

    updateProgress();
  }

  function openTopic(id) {
    const topic = topics.find(item => String(item.id) === String(id));

    if (!topic) {
      console.error('Topic not found:', id);
      return;
    }

    const points = Array.isArray(topic.points) ? topic.points : [];
    const isCompleted = completed.has(topic.id);

    const pointsHTML = points.length
      ? points.map(point => {
          if (Array.isArray(point)) {
            return `
              <li>
                <strong>${escapeHTML(point[0] || '')}:</strong>
                ${escapeHTML(point[1] || '')}
              </li>
            `;
          }

          if (point && typeof point === 'object') {
            return `
              <li>
                <strong>${escapeHTML(point.title || point.name || '')}:</strong>
                ${escapeHTML(point.explanation || point.description || '')}
              </li>
            `;
          }

          return `<li>${escapeHTML(point)}</li>`;
        }).join('')
      : '<li>Detailed learning points have not been added to this topic yet.</li>';

    const title = getTopicTitle(topic);

    $('#dialogContent').innerHTML = `
      <p class="eyebrow">
        ${escapeHTML(topic.sectionName || getSectionLabel(getTopicSection(topic)))}
      </p>

      <h2>${escapeHTML(title)}</h2>
      <p>${escapeHTML(getTopicSummary(topic))}</p>

      <div class="definition-box">
        <strong>Key definition</strong>
        <p>${escapeHTML(topic.definition || 'A definition has not been added yet.')}</p>
      </div>

      <h3>What you need to know</h3>
      <ul>${pointsHTML}</ul>

      <h3>Business example</h3>
      <p>${escapeHTML(topic.example || 'A business example has not been added yet.')}</p>

      <div class="exam-tip">
        <strong>Exam technique:</strong>
        ${escapeHTML(topic.examTip || 'Explain your point and apply it to the business in the question.')}
      </div>

      <h3>Check your understanding</h3>
      <p><strong>${escapeHTML(topic.question || 'What is the most important idea you learned from this topic?')}</strong></p>

      <details>
        <summary>Reveal a sample answer</summary>
        <p>${escapeHTML(topic.answer || 'Try answering in your own words first, using the key definition and a relevant example.')}</p>
      </details>

      <button type="button" id="markTopicDone" class="mark-done">
        ${isCompleted ? 'Mark as not completed' : 'Mark topic as completed ✓'}
      </button>
    `;

    const dialog = $('#topicDialog');

    if (!dialog.open) {
      dialog.showModal();
    }

    $('#markTopicDone').addEventListener('click', () => {
      if (completed.has(topic.id)) {
        completed.delete(topic.id);
      } else {
        completed.add(topic.id);
      }

      saveProgress();
      renderTopics();
      updateProgress();
      openTopic(topic.id);
    });
  }

  function updateProgress() {
    const count = topics.filter(topic => completed.has(topic.id)).length;
    const total = topics.length;
    const percent = total > 0 ? Math.round(count / total * 100) : 0;

    $('#heroCompleted').textContent = count;
    $('#heroProgressBar').style.width = `${percent}%`;

    $('#heroProgressText').textContent = count
      ? `${percent}% complete — keep going.`
      : 'Start a topic to build your progress.';

    $('#progressCount').textContent = count;
    $('#totalTopics').textContent = total;
    $('#mainProgressBar').style.width = `${percent}%`;

    $('#mainProgressText').textContent = count
      ? `You've completed ${percent}% of the topics in this library.`
      : 'Your learning progress will appear here.';
  }

  function renderQuiz() {
    const card = $('#quizCard');

    if (quizOrder.length === 0) {
      card.innerHTML = `
        <p class="empty-state">
          No quiz questions have loaded. Check the content files and
          confirm that they add questions to BUSINESS_QUIZ.
        </p>
      `;
      return;
    }

    quizIndex = Math.min(quizIndex, quizOrder.length - 1);

    const question = quizOrder[quizIndex];
    const options = Array.isArray(question.options) ? question.options : [];
    const correctAnswer = Number(question.answer);

    if (!options.length) {
      card.innerHTML = `
        <p class="empty-state">
          This quiz question has no answer options. Check its data in the content files.
        </p>
      `;
      return;
    }

    card.innerHTML = `
      <span class="quiz-meta">
        QUESTION ${quizIndex + 1} OF ${quizOrder.length}
      </span>

      <h3>${escapeHTML(question.q || question.question || 'Quiz question')}</h3>

      <div class="answer-list">
        ${options.map((option, index) => {
          let className = 'answer-option';

          if (selectedQuizAnswer !== null && index === correctAnswer) {
            className += ' correct';
          } else if (
            selectedQuizAnswer === index &&
            index !== correctAnswer
          ) {
            className += ' incorrect';
          }

          return `
            <button
              type="button"
              class="${className}"
              data-answer="${index}"
              ${selectedQuizAnswer !== null ? 'disabled' : ''}
            >
              <span class="option-letter">${String.fromCharCode(65 + index)}</span>
              <span>${escapeHTML(option)}</span>
            </button>
          `;
        }).join('')}
      </div>

      ${selectedQuizAnswer !== null ? `
        <div class="quiz-feedback">
          <strong>${selectedQuizAnswer === correctAnswer ? 'Correct!' : 'Not quite.'}</strong>
          <p>${escapeHTML(question.explanation || 'Review the topic and try another question.')}</p>
        </div>
      ` : ''}

      <div class="quiz-controls">
        <span class="muted">
          ${selectedQuizAnswer === null
            ? 'Choose the best answer.'
            : 'Take a moment to read the explanation.'}
        </span>

        <button type="button" id="nextQuiz" ${selectedQuizAnswer === null ? 'disabled' : ''}>
          ${quizIndex === quizOrder.length - 1 ? 'Try a new set' : 'Next question →'}
        </button>
      </div>
    `;

    card.querySelectorAll('[data-answer]').forEach(button => {
      button.addEventListener('click', () => {
        selectedQuizAnswer = Number(button.dataset.answer);
        renderQuiz();
      });
    });

    $('#nextQuiz').addEventListener('click', () => {
      if (selectedQuizAnswer === null) return;

      if (quizIndex === quizOrder.length - 1) {
        quizOrder = shuffle([...quizQuestions]);
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
    const selectedTopic = $('#tutorTopic').value;

    $('#tutorError').hidden = true;
    $('#tutorAnswer').hidden = true;

    if (!question) {
      $('#tutorError').textContent = 'Enter a question first.';
      $('#tutorError').hidden = false;
      return;
    }

    const button = $('#askButton');
    button.disabled = true;

    try {
      button.textContent = 'Starting local AI…';

      if (!window.BusinessLocalAIReady) {
        throw new Error('The local AI module has not loaded. Refresh the page and try again.');
      }

      const localAI = await window.BusinessLocalAIReady;
      button.textContent = 'Loading model if needed…';
      const answer = await localAI.ask(question, selectedTopic);

      $('#tutorAnswer').textContent = answer;
      $('#tutorAnswer').hidden = false;
    } catch (error) {
      console.error('Local Business AI error:', error);
      $('#tutorError').textContent = error.message ||
        'The local AI could not answer. Check browser compatibility and your internet connection.';
      $('#tutorError').hidden = false;
    } finally {
      button.disabled = false;
      button.innerHTML = 'Ask the tutor <span>→</span>';
    }
  }

  // Search.
  $('#searchInput').addEventListener('input', renderTopics);

  // Topic dialog.
  $('#closeDialog').addEventListener('click', () => {
    $('#topicDialog').close();
  });

  $('#topicDialog').addEventListener('click', event => {
    if (event.target === $('#topicDialog')) {
      $('#topicDialog').close();
    }
  });

  // AI tutor character count.
  $('#tutorQuestion').addEventListener('input', () => {
    $('#questionCount').textContent =
      `${$('#tutorQuestion').value.length}/2000`;
  });

  $('#askButton').addEventListener('click', askTutor);

  // Suggested tutor prompts.
  document.querySelectorAll('[data-prompt]').forEach(button => {
    button.addEventListener('click', () => {
      const prompt = button.dataset.prompt;
      $('#tutorQuestion').value = prompt;
      $('#questionCount').textContent = `${prompt.length}/2000`;
      $('#tutorQuestion').focus();
    });
  });

  // Reset progress.
  $('#resetProgress').addEventListener('click', () => {
    if (confirm('Reset all completed topics on this device?')) {
      completed.clear();
      saveProgress();
      renderTopics();
      updateProgress();
    }
  });

  // Mobile navigation.
  $('#menuToggle').addEventListener('click', () => {
    const nav = $('#mainNav');
    const isOpen = nav.classList.toggle('open');

    $('#menuToggle').setAttribute('aria-expanded', String(isOpen));
  });

  $('#mainNav').querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      $('#mainNav').classList.remove('open');
      $('#menuToggle').setAttribute('aria-expanded', 'false');
    });
  });

  // Start the application.
  renderFilters();
  renderTopics();
  renderQuiz();
  updateProgress();

  console.log('Business IGCSE app loaded.', {
    topics: topics.length,
    sections: sections.length,
    quizQuestions: quizQuestions.length
  });
})();
