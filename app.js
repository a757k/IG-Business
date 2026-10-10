
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  let activeFilter = "all";
  let searchQuery = "";
  let currentQuiz = null;
  let currentQuizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  const STORAGE_KEY = "igcse-business-progress-v1";

  function getTopics() {
    return Array.isArray(window.BUSINESS_TOPICS)
      ? window.BUSINESS_TOPICS
      : [];
  }

  function getSections() {
    return Array.isArray(window.BUSINESS_SECTIONS)
      ? window.BUSINESS_SECTIONS
      : [];
  }

  function getQuizzes() {
    return Array.isArray(window.BUSINESS_QUIZ)
      ? window.BUSINESS_QUIZ
      : [];
  }

  function readProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        completed: [],
        questions: 0
      };
    } catch {
      return { completed: [], questions: 0 };
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function topicId(topic, index) {
    return String(topic.id ?? topic.title ?? topic.name ?? index);
  }

  function topicTitle(topic) {
    return topic.title || topic.name || "Business topic";
  }

  function topicSection(topic) {
    return String(
      topic.sectionId ??
      topic.section ??
      topic.category ??
      topic.unit ??
      ""
    );
  }

  function topicText(topic) {
    return [
      topicTitle(topic),
      topic.section,
      topic.definition,
      topic.description,
      topic.content,
      topic.explanation,
      topic.examTechnique,
      topic.keyTerms,
      topic.example
    ].flat().filter(Boolean).join(" ");
  }

  function renderFilters() {
    const container = $("#sectionFilters");
    if (!container) return;

    const sections = getSections();
    const buttons = [
      { id: "all", name: "All topics" },
      ...sections.map((section, index) => ({
        id: String(section.id ?? section.name ?? index),
        name: section.name || section.title || `Section ${index + 1}`
      }))
    ];

    container.innerHTML = buttons.map(section => `
      <button type="button"
        class="filter-button ${activeFilter === section.id ? "active" : ""}"
        data-filter="${escapeHTML(section.id)}">
        ${escapeHTML(section.name)}
      </button>
    `).join("");

    container.querySelectorAll("[data-filter]").forEach(button => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        renderFilters();
        renderTopics();
      });
    });
  }

  function matchesFilter(topic) {
    if (activeFilter === "all") return true;

    const section = topicSection(topic);
    const sections = getSections();
    const selected = sections.find((item, index) =>
      String(item.id ?? item.name ?? index) === activeFilter
    );

    return section === activeFilter ||
      section === String(selected?.name ?? "") ||
      section === String(selected?.title ?? "");
  }

  function renderTopics() {
    const container = $("#topicGrid");
    if (!container) return;

    const progress = readProgress();
    const topics = getTopics();

    const filtered = topics
      .map((topic, index) => ({ topic, index }))
      .filter(({ topic }) => matchesFilter(topic))
      .filter(({ topic }) =>
        topicText(topic).toLowerCase().includes(searchQuery)
      );

    container.innerHTML = filtered.map(({ topic, index }) => {
      const id = topicId(topic, index);
      const completed = progress.completed.includes(id);

      return `
        <article class="topic-card ${completed ? "completed" : ""}">
          <div class="topic-card-content">
            <p class="topic-category">${escapeHTML(topicSection(topic))}</p>
            <h3>${escapeHTML(topicTitle(topic))}</h3>
            <p>${escapeHTML(
              topic.definition ||
              topic.description ||
              topic.content ||
              topic.explanation ||
              "Open this topic to review the notes."
            ).slice(0, 180)}</p>
            <div class="topic-card-actions">
              <button type="button" data-open-topic="${index}">
                Study topic
              </button>
              <button type="button" data-complete-topic="${index}">
                ${completed ? "Mark incomplete" : "Mark complete"}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    const noResults = $("#noResults");
    if (noResults) {
      noResults.hidden = filtered.length > 0;
    }

    container.querySelectorAll("[data-open-topic]").forEach(button => {
      button.addEventListener("click", () => {
        openTopic(Number(button.dataset.openTopic));
      });
    });

    container.querySelectorAll("[data-complete-topic]").forEach(button => {
      button.addEventListener("click", () => {
        toggleComplete(Number(button.dataset.completeTopic));
      });
    });

    updateProgress();
  }

  function openTopic(index) {
    const topic = getTopics()[index];
    if (!topic) return;

    const dialog = $("#topicDialog");
    const content = $("#dialogContent");
    if (!dialog || !content) return;

    const fields = [
      ["Definition", topic.definition],
      ["Explanation", topic.explanation],
      ["Description", topic.description],
      ["Notes", topic.content],
      ["Example", topic.example],
      ["Exam technique", topic.examTechnique],
      ["Key terms", topic.keyTerms]
    ];

    content.innerHTML = `
      <h2>${escapeHTML(topicTitle(topic))}</h2>
      ${fields.filter(([, value]) => value).map(([heading, value]) => `
        <section class="topic-detail-section">
          <h3>${escapeHTML(heading)}</h3>
          <p>${escapeHTML(Array.isArray(value) ? value.join("\n") : value)}</p>
        </section>
      `).join("")}
    `;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function toggleComplete(index) {
    const topic = getTopics()[index];
    if (!topic) return;

    const progress = readProgress();
    const id = topicId(topic, index);

    if (progress.completed.includes(id)) {
      progress.completed = progress.completed.filter(item => item !== id);
    } else {
      progress.completed.push(id);
    }

    saveProgress(progress);
    renderTopics();
  }

  function updateProgress() {
    const topics = getTopics();
    const progress = readProgress();
    const completed = progress.completed.length;
    const total = topics.length;
    const percent = total ? Math.round(completed / total * 100) : 0;

    const setText = (selector, value) => {
      const element = $(selector);
      if (element) element.textContent = value;
    };

    const setWidth = (selector, value) => {
      const element = $(selector);
      if (element) element.style.width = `${value}%`;
    };

    setText("#heroCompleted", completed);
    setText("#heroProgressText", `${percent}% complete`);
    setWidth("#heroProgressBar", percent);

    setText("#progressCount", completed);
    setText("#totalTopics", total);
    setText("#mainProgressText", `${percent}% complete`);
    setWidth("#mainProgressBar", percent);
    setText("#questionCount", progress.questions || 0);
  }

  function renderQuiz() {
    const container = $("#quizCard");
    if (!container) return;

    const quizzes = getQuizzes();

    if (!quizzes.length) {
      container.innerHTML = "<p>No quiz questions are available yet.</p>";
      return;
    }

    if (!currentQuiz) {
      container.innerHTML = `
        <h3>Test your Business knowledge</h3>
        <p>Practise with questions from your revision material.</p>
        <button type="button" id="startQuiz">Start quiz</button>
      `;

      $("#startQuiz")?.addEventListener("click", startQuiz);
      return;
    }

    const question = currentQuiz[currentQuizIndex];

    if (!question) {
      container.innerHTML = `
        <h3>Quiz complete!</h3>
        <p>You scored ${quizScore} out of ${currentQuiz.length}.</p>
        <button type="button" id="restartQuiz">Try again</button>
      `;
      $("#restartQuiz")?.addEventListener("click", startQuiz);
      currentQuiz = null;
      return;
    }

    const prompt = question.question || question.text || question.prompt || "";
    const options = question.options || question.answers || [];

    container.innerHTML = `
      <p>Question ${currentQuizIndex + 1} of ${currentQuiz.length}</p>
      <h3>${escapeHTML(prompt)}</h3>
      <div class="quiz-options">
        ${options.map((option, index) => `
          <button type="button" data-answer="${index}">
            ${escapeHTML(typeof option === "object" ? option.text : option)}
          </button>
        `).join("")}
      </div>
      <p id="quizFeedback" aria-live="polite"></p>
      <button type="button" id="nextQuestion" hidden>Next question</button>
    `;

    container.querySelectorAll("[data-answer]").forEach(button => {
      button.addEventListener("click", () => answerQuiz(Number(button.dataset.answer)));
    });

    $("#nextQuestion")?.addEventListener("click", () => {
      currentQuizIndex++;
      quizAnswered = false;
      renderQuiz();
    });
  }

  function startQuiz() {
    const quizzes = getQuizzes();

    currentQuiz = quizzes
      .map(question => ({ ...question }))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, quizzes.length));

    currentQuizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    renderQuiz();
  }

  function answerQuiz(index) {
    if (quizAnswered || !currentQuiz) return;

    const question = currentQuiz[currentQuizIndex];
    if (!question) return;

    quizAnswered = true;

    const correct = question.correctAnswer ??
      question.correct ??
      question.answerIndex;

    const options = question.options || question.answers || [];
    const selected = options[index];
    const selectedValue = typeof selected === "object"
      ? selected.text
      : selected;

    const isCorrect = index === correct ||
      selectedValue === correct ||
      selectedValue === question.answer;

    if (isCorrect) quizScore++;

    const feedback = $("#quizFeedback");
    if (feedback) {
      feedback.textContent = isCorrect
        ? "Correct!"
        : `Not quite. ${question.explanation || ""}`;
    }

    const next = $("#nextQuestion");
    if (next) {
      next.hidden = false;
      next.textContent = currentQuizIndex === currentQuiz.length - 1
        ? "See results"
        : "Next question";
    }

    const progress = readProgress();
    progress.questions = (progress.questions || 0) + 1;
    saveProgress(progress);
    updateProgress();

    document.querySelectorAll("#quizCard [data-answer]").forEach(button => {
      button.disabled = true;
    });
  }

  async function askTutor() {
    const input = $("#tutorQuestion");
    const answerBox = $("#tutorAnswer");
    const errorBox = $("#tutorError");
    const button = $("#askButton");
    const topicSelect = $("#tutorTopic");

    const question = input?.value.trim();
    if (!question) {
      if (errorBox) errorBox.textContent = "Please enter a question.";
      return;
    }

    if (errorBox) errorBox.textContent = "";
    if (answerBox) {
      answerBox.textContent = "Searching your revision notes...";
    }
    if (button) button.disabled = true;

    try {
      const tutor = await window.BusinessLocalAIReady;
      const answer = await tutor.ask(
        question,
        topicSelect?.value || ""
      );

      if (answerBox) answerBox.textContent = answer;
    } catch (error) {
      if (answerBox) answerBox.textContent = "";
      if (errorBox) {
        errorBox.textContent = error?.message ||
          "Could not search the revision notes.";
      }
    } finally {
      if (button) button.disabled = false;
    }
  }

  function init() {
    renderFilters();
    renderTopics();
    renderQuiz();
    updateProgress();

    $("#searchInput")?.addEventListener("input", event => {
      searchQuery = event.target.value.trim().toLowerCase();
      renderTopics();
    });

    $("#askButton")?.addEventListener("click", askTutor);

    $("#tutorQuestion")?.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        askTutor();
      }
    });

    $("#tutorQuestion")?.addEventListener("input", event => {
      const count = $("#questionCount");
      if (count) count.textContent = event.target.value.length;
    });

    document.querySelectorAll("[data-prompt]").forEach(button => {
      button.addEventListener("click", () => {
        const input = $("#tutorQuestion");
        if (input) {
          input.value = button.dataset.prompt || button.textContent.trim();
          input.focus();
        }
      });
    });

    $("#closeDialog")?.addEventListener("click", () => {
      $("#topicDialog")?.close?.();
    });

    $("#resetProgress")?.addEventListener("click", () => {
      if (!confirm("Reset all saved revision progress?")) return;

      saveProgress({ completed: [], questions: 0 });
      renderTopics();
      updateProgress();
    });

    $("#menuToggle")?.addEventListener("click", () => {
      const nav = $("#mainNav");
      if (!nav) return;

      const isOpen = nav.classList.toggle("open");
      $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
