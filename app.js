
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  const STORAGE_KEY = "businessRevisionProgress";
  const QUIZ_STORAGE_KEY = "businessRevisionQuiz";
  const SECTION_NAMES = [
    "Business activity and influences on business",
    "People in business",
    "Business finance",
    "Marketing",
    "Business operations"
  ];

  let topics = [];
  let quizQuestions = [];
  let sections = [];
  let activeSection = "all";
  let searchTerm = "";
  let currentTopic = null;
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  function readGlobal(names, fallback = []) {
    for (const name of names) {
      if (Array.isArray(window[name])) return window[name];
    }
    return fallback;
  }

  function getTopics() {
    return readGlobal(["BUSINESS_TOPICS", "businessTopics", "topics"]);
  }

  function getSections() {
    return readGlobal(["BUSINESS_SECTIONS", "businessSections", "sections"]);
  }

  function getQuiz() {
    return readGlobal([
      "BUSINESS_QUIZ",
      "BUSINESS_QUIZZES",
      "businessQuiz",
      "quizQuestions"
    ]);
  }

  function getTopicTitle(topic, index = 0) {
    if (typeof topic === "string") return topic;
    return topic?.title ||
      topic?.name ||
      topic?.topic ||
      topic?.heading ||
      topic?.label ||
      `Topic ${index + 1}`;
  }

  function getTopicSection(topic) {
    if (typeof topic === "string") return "";
    const value = topic?.section ??
      topic?.sectionName ??
      topic?.unit ??
      topic?.category ??
      topic?.contentSection ??
      topic?.specificationSection ??
      "";
    if (typeof value === "object" && value !== null) {
      return value.name || value.title || value.label || "";
    }
    return String(value);
  }

  function plainText(value, depth = 0) {
    if (value == null || depth > 6) return "";
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    if (Array.isArray(value)) {
      return value.map((item) => plainText(item, depth + 1))
        .filter(Boolean).join("\n");
    }
    if (typeof value === "object") {
      return Object.entries(value)
        .filter(([key]) => !/image|icon|url|href|src|id|colour|color/i.test(key))
        .map(([key, item]) => {
          const text = plainText(item, depth + 1);
          return text ? `${key}: ${text}` : "";
        })
        .filter(Boolean).join("\n");
    }
    return "";
  }

  function getTopicText(topic) {
    return plainText(topic);
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function loadProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.completed)) return parsed.completed;
    } catch (_) {}
    return [];
  }

  function saveProgress(completed) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch (_) {}
  }

  function getCompleted() {
    return loadProgress();
  }

  function isCompleted(topic, index) {
    const completed = getCompleted();
    const id = getTopicId(topic, index);
    return completed.includes(id) || completed.includes(getTopicTitle(topic, index));
  }

  function getTopicId(topic, index) {
    if (topic && typeof topic === "object") {
      return String(topic.id ?? topic.slug ?? topic.title ?? topic.name ?? index);
    }
    return String(topic ?? index);
  }

  function updateProgress() {
    const completed = getCompleted();
    const count = topics.filter((topic, index) => isCompleted(topic, index)).length;
    const total = topics.length;
    const percent = total ? Math.round((count / total) * 100) : 0;

    setText("#heroCompleted", String(count));
    setText("#progressCount", String(count));
    setText("#totalTopics", String(total));
    setText("#heroProgressText", `${percent}% complete`);
    setText("#mainProgressText", `${count} of ${total} topics completed`);

    ["#heroProgressBar", "#mainProgressBar"].forEach((selector) => {
      const bar = $(selector);
      if (bar) {
        bar.style.width = `${percent}%`;
        bar.setAttribute("aria-valuenow", String(percent));
      }
    });
  }

  function setText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value;
  }

  function normalise(value) {
    return String(value ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function renderFilters() {
    const container = $("#sectionFilters");
    if (!container) return;

    const names = sections.map((section) => {
      if (typeof section === "string") return section;
      return section?.name || section?.title || section?.label || "";
    }).filter(Boolean);

    const uniqueNames = [...new Set(names.length ? names : SECTION_NAMES)];

    container.innerHTML = [
      `<button type="button" class="filter-button ${activeSection === "all" ? "active" : ""}" data-section="all">All topics</button>`,
      ...uniqueNames.map((name) =>
        `<button type="button" class="filter-button ${activeSection === name ? "active" : ""}" data-section="${escapeHTML(name)}">${escapeHTML(name)}</button>`
      )
    ].join("");

    container.querySelectorAll("[data-section]").forEach((button) => {
      button.addEventListener("click", () => {
        activeSection = button.dataset.section;
        renderFilters();
        renderTopics();
      });
    });
  }

  function topicMatchesSection(topic) {
    if (activeSection === "all") return true;
    const topicSection = normalise(getTopicSection(topic));
    const selected = normalise(activeSection);

    if (!topicSection) return false;
    return topicSection === selected ||
      topicSection.includes(selected) ||
      selected.includes(topicSection);
  }

  function renderTopics() {
    const grid = $("#topicGrid");
    if (!grid) return;

    const matches = topics
      .map((topic, index) => ({ topic, index }))
      .filter(({ topic }) => topicMatchesSection(topic))
      .filter(({ topic, index }) => {
        if (!searchTerm) return true;
        const text = normalise(`${getTopicTitle(topic, index)} ${getTopicText(topic)}`);
        return text.includes(normalise(searchTerm));
      });

    grid.innerHTML = matches.map(({ topic, index }) => {
      const title = getTopicTitle(topic, index);
      const section = getTopicSection(topic);
      const completed = isCompleted(topic, index);

      const description = typeof topic === "object"
        ? topic.description || topic.summary || topic.introduction || ""
        : "";

      return `
        <button type="button" class="topic-card ${completed ? "completed" : ""}" data-topic-index="${index}">
          <span class="topic-card-top">
            <span class="topic-card-section">${escapeHTML(section || "Business revision")}</span>
            <span class="topic-status">${completed ? "✓ Completed" : "Study topic"}</span>
          </span>
          <span class="topic-card-title">${escapeHTML(title)}</span>
          ${description ? `<span class="topic-card-description">${escapeHTML(String(description).slice(0, 180))}</span>` : ""}
          <span class="topic-card-link">Open notes →</span>
        </button>`;
    }).join("");

    grid.querySelectorAll("[data-topic-index]").forEach((button) => {
      button.addEventListener("click", () => {
        openTopic(Number(button.dataset.topicIndex));
      });
    });

    const noResults = $("#noResults");
    if (noResults) noResults.hidden = matches.length !== 0;
  }

  function getReadableTopicContent(topic) {
    if (typeof topic === "string") return topic;

    const preferredKeys = [
      "introduction", "description", "summary", "content", "notes",
      "explanation", "definition", "definitions", "keyTerms", "keyPoints",
      "examples", "examTips", "examTechnique", "knowledge", "details",
      "learningObjectives", "subtopics", "sections", "contentItems"
    ];

    const used = new Set();
    const parts = [];

    for (const key of preferredKeys) {
      if (topic?.[key] != null) {
        const value = topic[key];
        const heading = key.replace(/([A-Z])/g, " $1");
        const text = plainText(value);
        if (text) {
          parts.push(`<h3>${escapeHTML(heading.charAt(0).toUpperCase() + heading.slice(1))}</h3>`);
          parts.push(formatContent(value));
          used.add(key);
        }
      }
    }

    for (const [key, value] of Object.entries(topic || {})) {
      if (used.has(key) || /^(id|slug|title|name|topic|section|sectionName|category|unit|image|icon|url|href)$/i.test(key)) {
        continue;
      }
      const text = plainText(value);
      if (text) {
        const heading = key.replace(/([A-Z])/g, " $1");
        parts.push(`<h3>${escapeHTML(heading.charAt(0).toUpperCase() + heading.slice(1))}</h3>`);
        parts.push(formatContent(value));
      }
    }

    return parts.join("\n") || `<p>No notes are available for this topic yet.</p>`;
  }

  function formatContent(value) {
    if (typeof value === "string" || typeof value === "number") {
      return `<p>${escapeHTML(value).replace(/\n/g, "<br>")}</p>`;
    }

    if (Array.isArray(value)) {
      return `<ul>${value.map((item) => {
        if (typeof item === "string" || typeof item === "number") {
          return `<li>${escapeHTML(item)}</li>`;
        }
        return `<li>${formatContent(item)}</li>`;
      }).join("")}</ul>`;
    }

    if (value && typeof value === "object") {
      return Object.entries(value).map(([key, item]) =>
        `<div class="topic-content-item"><strong>${escapeHTML(key.replace(/([A-Z])/g, " $1"))}</strong>${formatContent(item)}</div>`
      ).join("");
    }

    return "";
  }

  function openTopic(index) {
    const topic = topics[index];
    if (!topic) return;

    currentTopic = index;
    const dialog = $("#topicDialog");
    const content = $("#dialogContent");
    if (!dialog || !content) return;

    const completed = isCompleted(topic, index);
    const title = getTopicTitle(topic, index);

    content.innerHTML = `
      <div class="topic-detail">
        <p class="topic-detail-section">${escapeHTML(getTopicSection(topic) || "Business revision")}</p>
        <h2>${escapeHTML(title)}</h2>
        <div class="topic-detail-content">${getReadableTopicContent(topic)}</div>
        <button type="button" id="markTopicComplete" class="primary-button">
          ${completed ? "Mark as not completed" : "Mark topic as completed"}
        </button>
      </div>`;

    $("#markTopicComplete")?.addEventListener("click", toggleCurrentTopic);

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.hidden = false;
      dialog.style.display = "block";
    }
  }

  function closeTopicDialog() {
    const dialog = $("#topicDialog");
    if (!dialog) return;

    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.hidden = true;
      dialog.style.display = "none";
    }
  }

  function toggleCurrentTopic() {
    if (currentTopic === null) return;
    const topic = topics[currentTopic];
    if (!topic) return;

    const id = getTopicId(topic, currentTopic);
    const title = getTopicTitle(topic, currentTopic);
    let completed = getCompleted();
    const alreadyCompleted = completed.includes(id) || completed.includes(title);

    if (alreadyCompleted) {
      completed = completed.filter((item) => item !== id && item !== title);
    } else {
      completed = [...new Set([...completed, id])];
    }

    saveProgress(completed);
    updateProgress();
    renderTopics();
    openTopic(currentTopic);
  }

  function getSearchableTopics() {
    return topics.map((topic, index) => ({
      topic,
      index,
      title: getTopicTitle(topic, index),
      section: getTopicSection(topic),
      text: getTopicText(topic)
    }));
  }

  function searchRevisionNotes(question, selectedTopic = "") {
    const words = normalise(question)
      .split(" ")
      .filter((word) => word.length > 1);

    if (!words.length) {
      return "Type a keyword or question to search the revision notes.";
    }

    const selected = normalise(selectedTopic);
    const results = getSearchableTopics().map((item) => {
      const title = normalise(item.title);
      const content = normalise(item.text);
      const section = normalise(item.section);
      let score = 0;

      for (const word of words) {
        if (title.includes(word)) score += 8;
        if (section.includes(word)) score += 4;
        if (content.includes(word)) score += 1;
      }

      if (selected && title.includes(selected)) score += 12;
      if (selected && section.includes(selected)) score += 5;

      return { ...item, score };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (!results.length) {
      return `No matching notes were found for "${question}". Try a shorter keyword, such as "profit", "cash flow", "marketing", or "motivation".`;
    }

    return results.map((item, resultIndex) => {
      const content = getReadableTopicContent(item.topic);
      const temporary = document.createElement("div");
      temporary.innerHTML = content;
      const readable = (temporary.textContent || temporary.innerText || "")
        .replace(/\s+/g, " ")
        .trim();

      const excerpt = readable.length > 1100
        ? readable.slice(0, 1100) + "…"
        : readable;

      return `${resultIndex + 1}. ${item.title}\nSection: ${item.section || "Business revision"}\n\n${excerpt}`;
    }).join("\n\n────────────────────\n\n");
  }

  function showTutorError(message) {
    const error = $("#tutorError");
    const answer = $("#tutorAnswer");

    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
    if (answer) {
      answer.textContent = "";
      answer.hidden = true;
    }
  }

  function showTutorAnswer(message) {
    const error = $("#tutorError");
    const answer = $("#tutorAnswer");

    if (error) {
      error.textContent = "";
      error.hidden = true;
    }

    if (answer) {
      answer.textContent = message;
      answer.hidden = false;
      answer.style.display = "block";
    }
  }

  function searchTutor() {
    const input = $("#tutorQuestion");
    const select = $("#tutorTopic");
    const question = input?.value?.trim() || "";
    const selectedTopic = select?.value || "";

    if (!question) {
      showTutorError("Enter a keyword or question first.");
      input?.focus();
      return;
    }

    try {
      const answer = searchRevisionNotes(question, selectedTopic);
      showTutorAnswer(answer);
    } catch (error) {
      console.error("Revision notes search failed:", error);
      showTutorError("The notes could not be searched. Please refresh the page and try again.");
    }
  }

  function populateTutorTopics() {
    const select = $("#tutorTopic");
    if (!select) return;

    const previousValue = select.value;
    select.innerHTML = `<option value="">Search all topics</option>` +
      topics.map((topic, index) =>
        `<option value="${escapeHTML(getTopicTitle(topic, index))}">${escapeHTML(getTopicTitle(topic, index))}</option>`
      ).join("");

    if ([...select.options].some((option) => option.value === previousValue)) {
      select.value = previousValue;
    }
  }

  function renderQuiz() {
    const card = $("#quizCard");
    if (!card) return;

    if (!quizQuestions.length) {
      card.innerHTML = "<p>No quiz questions have been added yet.</p>";
      return;
    }

    if (quizIndex >= quizQuestions.length) {
      card.innerHTML = `
        <div class="quiz-finished">
          <h3>Quiz complete!</h3>
          <p>You scored ${quizScore} out of ${quizQuestions.length}.</p>
          <button type="button" id="restartQuiz" class="primary-button">Try again</button>
        </div>`;
      $("#restartQuiz")?.addEventListener("click", restartQuiz);
      return;
    }

    const question = quizQuestions[quizIndex];
    const prompt = question.question || question.text || question.prompt || question.title || "Question";
    const options = question.options || question.answers || question.choices || [];
    const choices = Array.isArray(options)
      ? options
      : Object.entries(options).map(([key, value]) => ({ key, text: value }));

    card.innerHTML = `
      <div class="quiz-content">
        <p class="quiz-count">Question ${quizIndex + 1} of ${quizQuestions.length}</p>
        <h3>${escapeHTML(prompt)}</h3>
        <div class="quiz-options">
          ${choices.map((choice, index) => {
            const label = typeof choice === "string"
              ? choice
              : choice.text || choice.label || choice.answer || choice.value || "";
            return `<button type="button" class="quiz-option" data-answer-index="${index}">${escapeHTML(label)}</button>`;
          }).join("")}
        </div>
        <p id="quizFeedback" class="quiz-feedback" hidden></p>
        <button type="button" id="nextQuizQuestion" class="primary-button" hidden>
          ${quizIndex === quizQuestions.length - 1 ? "See result" : "Next question"}
        </button>
      </div>`;

    card.querySelectorAll("[data-answer-index]").forEach((button) => {
      button.addEventListener("click", () => {
        if (quizAnswered) return;
        quizAnswered = true;

        const selectedIndex = Number(button.dataset.answerIndex);
        const correct = getCorrectAnswerIndex(question, choices);
        const feedback = $("#quizFeedback");

        card.querySelectorAll("[data-answer-index]").forEach((choiceButton) => {
          choiceButton.disabled = true;
          if (Number(choiceButton.dataset.answerIndex) === correct) {
            choiceButton.classList.add("correct");
          }
        });

        if (selectedIndex === correct) {
          quizScore++;
          if (feedback) feedback.textContent = "Correct!";
        } else {
          button.classList.add("incorrect");
          if (feedback) feedback.textContent = `Not quite. The correct answer is ${getChoiceText(choices[correct])}.`;
        }

        if (feedback) feedback.hidden = false;
        const next = $("#nextQuizQuestion");
        if (next) next.hidden = false;
      });
    });

    $("#nextQuizQuestion")?.addEventListener("click", () => {
      quizIndex++;
      quizAnswered = false;
      renderQuiz();
    });
  }

  function getChoiceText(choice) {
    if (typeof choice === "string") return choice;
    return String(choice?.text || choice?.label || choice?.answer || choice?.value || "");
  }

  function getCorrectAnswerIndex(question, choices) {
    const answer = question.correctAnswer ??
      question.correct ??
      question.answer ??
      question.correctOption ??
      question.answerIndex;

    if (typeof answer === "number") return answer;
    if (typeof answer === "string") {
      const normalAnswer = normalise(answer);
      const letterIndex = normalAnswer.match(/^[a-d]$/);
      if (letterIndex) return letterIndex[0].charCodeAt(0) - 97;

      const byText = choices.findIndex((choice) =>
        normalise(getChoiceText(choice)) === normalAnswer
      );
      if (byText >= 0) return byText;

      const byKey = choices.findIndex((choice) =>
        normalise(choice?.key) === normalAnswer
      );
      if (byKey >= 0) return byKey;
    }

    const answerLetter = String(answer ?? "").trim().toUpperCase();
    if (/^[A-D]$/.test(answerLetter)) {
      return answerLetter.charCodeAt(0) - 65;
    }

    return -1;
  }

  function restartQuiz() {
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    renderQuiz();
  }

  function bindEvents() {
    $("#searchInput")?.addEventListener("input", (event) => {
      searchTerm = event.target.value;
      renderTopics();
    });

    $("#askButton")?.addEventListener("click", searchTutor);

    $("#tutorQuestion")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        searchTutor();
      }
    });

    document.querySelectorAll("[data-tutor-prompt], .tutor-prompt, [data-prompt]").forEach((button) => {
      button.addEventListener("click", () => {
        const prompt = button.dataset.tutorPrompt ||
          button.dataset.prompt ||
          button.textContent.trim();

        const input = $("#tutorQuestion");
        if (input) {
          input.value = prompt;
          searchTutor();
        }
      });
    });

    $("#closeDialog")?.addEventListener("click", closeTopicDialog);

    $("#topicDialog")?.addEventListener("click", (event) => {
      const dialog = $("#topicDialog");
      if (event.target === dialog) closeTopicDialog();
    });

    $("#resetProgress")?.addEventListener("click", () => {
      const confirmed = window.confirm("Reset all completed-topic progress on this device?");
      if (!confirmed) return;
      saveProgress([]);
      updateProgress();
      renderTopics();
      if (currentTopic !== null) openTopic(currentTopic);
    });

    $("#menuToggle")?.addEventListener("click", () => {
      const nav = $("#mainNav");
      if (!nav) return;
      const isOpen = nav.classList.toggle("open");
      $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
    });
  }

  function init() {
    topics = getTopics();
    quizQuestions = getQuiz();
    sections = getSections();

    if (!topics.length) {
      console.error("No revision topics found. Check that content.js files load before app.js.");
      const grid = $("#topicGrid");
      if (grid) {
        grid.innerHTML = `<p>Revision content did not load. Refresh the page. If the problem continues, check that all content files are included in index.html before app.js.</p>`;
      }
    }

    renderFilters();
    renderTopics();
    updateProgress();
    populateTutorTopics();
    renderQuiz();
    bindEvents();

    const questionCount = $("#questionCount");
    const tutorQuestion = $("#tutorQuestion");
    if (questionCount && tutorQuestion) {
      const updateCount = () => {
        questionCount.textContent = `${tutorQuestion.value.length}/2000`;
      };
      tutorQuestion.maxLength = 2000;
      tutorQuestion.addEventListener("input", updateCount);
      updateCount();
    }

    console.log("Business revision website loaded without an AI model.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
