
(() => {
  "use strict";

  const $ = selector => document.querySelector(selector);
  const STORAGE_KEY = "igcse-business-progress-v1";

  let activeFilter = "all";
  let searchQuery = "";
  let currentQuiz = null;
  let currentQuizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  const topics = () =>
    Array.isArray(window.BUSINESS_TOPICS) ? window.BUSINESS_TOPICS : [];

  const sections = () =>
    Array.isArray(window.BUSINESS_SECTIONS) ? window.BUSINESS_SECTIONS : [];

  const quizzes = () =>
    Array.isArray(window.BUSINESS_QUIZ) ? window.BUSINESS_QUIZ : [];

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function getProgress() {
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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn("Could not save revision progress:", error);
    }
  }

  function getId(topic, index) {
    return String(topic.id ?? topic.title ?? topic.name ?? index);
  }

  function getTitle(topic, index) {
    return topic.title || topic.name || `Topic ${index + 1}`;
  }

  function getSection(topic) {
    return String(
      topic.sectionId ?? topic.section ?? topic.category ?? topic.unit ?? ""
    );
  }

  function topicText(topic) {
    return Object.values(topic)
      .map(value => Array.isArray(value)
        ? value.join(" ")
        : typeof value === "object" && value !== null
          ? JSON.stringify(value)
          : String(value ?? ""))
      .join(" ")
      .toLowerCase();
  }

  function renderFilters() {
    const container = $("#sectionFilters");
    if (!container) return;

    const options = [{ id: "all", name: "All topics" }];

    sections().forEach((section, index) => {
      options.push({
        id: String(section.id ?? section.name ?? index),
        name: section.name || section.title || `Section ${index + 1}`
      });
    });

    container.innerHTML = options.map(section => `
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

  function renderTopics() {
    const container = $("#topicGrid");
    if (!container) return;

    const progress = getProgress();

    const filtered = topics().map((topic, index) => ({
      topic,
      index,
      id: getId(topic, index),
      title: getTitle(topic, index)
    })).filter(item => {
      if (activeFilter === "all") return true;

      const selectedSection = sections().find((section, index) =>
        String(section.id ?? section.name ?? index) === activeFilter
      );

      return getSection(item.topic) === activeFilter ||
        getSection(item.topic) === String(selectedSection?.name ?? "") ||
        getSection(item.topic) === String(selectedSection?.title ?? "");
    }).filter(item =>
      topicText(item.topic).includes(searchQuery)
    );

    container.innerHTML = filtered.map(item => `
      <article class="topic-card">
        <div class="topic-card-content">
          <p class="topic-category">${escapeHTML(getSection(item.topic))}</p>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(
            item.topic.definition ||
            item.topic.description ||
            item.topic.content ||
            "Open this topic to view its revision notes."
          ).slice(0, 200)}</p>
          <div class="topic-card-actions">
            <button type="button" data-open="${item.index}">Study topic</button>
            <button type="button" data-complete="${item.index}">
              ${progress.completed.includes(item.id) ? "Mark incomplete" : "Mark complete"}
            </button>
          </div>
        </div>
      </article>
    `).join("");

    const noResults = $("#noResults");
    if (noResults) noResults.hidden = filtered.length > 0;

    container.querySelectorAll("[data-open]").forEach(button =>
      button.addEventListener("click", () => openTopic(Number(button.dataset.open)))
    );

    container.querySelectorAll("[data-complete]").forEach(button =>
      button.addEventListener("click", () => toggleComplete(Number(button.dataset.complete)))
    );

    updateProgress();
  }

  function openTopic(index) {
    const topic = topics()[index];
    const dialog = $("#topicDialog");
    const content = $("#dialogContent");
    if (!topic || !content) return;

    content.innerHTML = `
      <h2>${escapeHTML(getTitle(topic, index))}</h2>
      ${Object.entries(topic).map(([key, value]) => {
        if (["id", "title", "name"].includes(key) || value == null || value === "") {
          return "";
        }

        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, character => character.toUpperCase());

        const text = Array.isArray(value) ? value.join("\n") :
          typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);

        return `<section class="topic-detail-section">
          <h3>${escapeHTML(label)}</h3>
          <p>${escapeHTML(text)}</p>
        </section>`;
      }).join("")}
    `;

    if (dialog?.showModal) dialog.showModal();
    else if (dialog) dialog.setAttribute("open", "");
  }

  function toggleComplete(index) {
    const topic = topics()[index];
    if (!topic) return;

    const progress = getProgress();
    const id = getId(topic, index);

    progress.completed = progress.completed.includes(id)
      ? progress.completed.filter(value => value !== id)
      : [...progress.completed, id];

    saveProgress(progress);
    renderTopics();
  }

  function updateProgress() {
    const progress = getProgress();
    const total = topics().length;
    const completed = progress.completed.length;
    const percent = total ? Math.round(completed / total * 100) : 0;

    const text = (selector, value) => {
      const element = $(selector);
      if (element) element.textContent = String(value);
    };

    const width = (selector, value) => {
      const element = $(selector);
      if (element) element.style.width = `${value}%`;
    };

    text("#heroCompleted", completed);
    text("#heroProgressText", `${percent}% complete`);
    width("#heroProgressBar", percent);
    text("#progressCount", completed);
    text("#totalTopics", total);
    text("#mainProgressText", `${percent}% complete`);
    width("#mainProgressBar", percent);
    text("#questionCount", $("#tutorQuestion")?.value.length || 0);
  }

  function renderQuiz() {
    const container = $("#quizCard");
    if (!container) return;

    const all = quizzes();

    if (!all.length) {
      container.innerHTML = "<p>No quiz questions are available yet.</p>";
      return;
    }

    if (!currentQuiz) {
      container.innerHTML = `
        <h3>Test your Business knowledge</h3>
        <p>Practise questions using your revision material.</p>
        <button type="button" id="startQuiz">Start quiz</button>
      `;
      $("#startQuiz")?.addEventListener("click", startQuiz);
      return;
    }

    if (currentQuizIndex >= currentQuiz.length) {
      container.innerHTML = `
        <h3>Quiz complete!</h3>
        <p>You scored ${quizScore} out of ${currentQuiz.length}.</p>
        <button type="button" id="restartQuiz">Try again</button>
      `;
      currentQuiz = null;
      $("#restartQuiz")?.addEventListener("click", startQuiz);
      return;
    }

    const question = currentQuiz[currentQuizIndex];
    const options = question.options || question.answers || [];

    container.innerHTML = `
      <p>Question ${currentQuizIndex + 1} of ${currentQuiz.length}</p>
      <h3>${escapeHTML(question.question || question.text || question.prompt || "")}</h3>
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

    container.querySelectorAll("[data-answer]").forEach(button =>
      button.addEventListener("click", () => answerQuiz(Number(button.dataset.answer)))
    );

    $("#nextQuestion")?.addEventListener("click", () => {
      currentQuizIndex++;
      quizAnswered = false;
      renderQuiz();
    });
  }

  function startQuiz() {
    currentQuiz = quizzes()
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    currentQuizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    renderQuiz();
  }

  function answerQuiz(index) {
    if (quizAnswered || !currentQuiz) return;

    const question = currentQuiz[currentQuizIndex];
    const options = question.options || question.answers || [];
    const option = options[index];
    const value = typeof option === "object" ? option.text : option;
    const correct = question.correctAnswer ?? question.correct ?? question.answerIndex;

    const isCorrect = index === correct ||
      value === correct ||
      value === question.answer;

    quizAnswered = true;
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

    document.querySelectorAll("#quizCard [data-answer]").forEach(button => {
      button.disabled = true;
    });

    const progress = getProgress();
    progress.questions = (progress.questions || 0) + 1;
    saveProgress(progress);
    updateProgress();
  }

  async function askTutor() {
    const input = $("#tutorQuestion");
    const answerBox = $("#tutorAnswer");
    const errorBox = $("#tutorError");
    const button = $("#askButton");
    const topicSelect = $("#tutorTopic");

    const question = input?.value.trim();

    if (!question) {
      if (errorBox) errorBox.textContent = "Please type a question first.";
      else if (answerBox) answerBox.textContent = "Please type a question first.";
      return;
    }

    if (button) button.disabled = true;
    if (errorBox) errorBox.textContent = "";
    if (answerBox) answerBox.textContent = "Searching your revision notes...";

    try {
      const tutor = await window.BusinessLocalAIReady;

      if (!tutor || typeof tutor.ask !== "function") {
        throw new Error("The revision-note search script did not load. Check the script tags in index.html.");
      }

      const result = await tutor.ask(question, topicSelect?.value || "");

      if (answerBox) answerBox.textContent = result;
    } catch (error) {
      console.error("Tutor error:", error);
      if (answerBox) answerBox.textContent = "";
      if (errorBox) {
        errorBox.textContent = error?.message || "Unable to search the revision notes.";
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

    // Attach the tutor handler directly to the real button.
    const askButton = $("#askButton");
    if (askButton) {
      askButton.addEventListener("click", event => {
        event.preventDefault();
        askTutor();
      });
    } else {
      console.error('Tutor button not found: expected id="askButton".');
    }

    $("#tutorQuestion")?.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        askTutor();
      }
    });

    $("#tutorQuestion")?.addEventListener("input", updateProgress);

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
      const open = nav.classList.toggle("open");
      $("#menuToggle").setAttribute("aria-expanded", String(open));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
