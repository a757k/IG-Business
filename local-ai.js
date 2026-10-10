
(() => {
  "use strict";

  function getTopics() {
    return Array.isArray(window.BUSINESS_TOPICS)
      ? window.BUSINESS_TOPICS
      : [];
  }

  function flatten(value) {
    if (value == null) return "";
    if (Array.isArray(value)) return value.map(flatten).join("\n");
    if (typeof value === "object") {
      return Object.entries(value)
        .map(([key, item]) => `${key}: ${flatten(item)}`)
        .join("\n");
    }
    return String(value);
  }

  function getTopicText(topic) {
    return flatten(topic);
  }

  function normalise(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function ask(question, selectedTopic = "") {
    const originalQuestion = String(question || "").trim();

    if (!originalQuestion) {
      return Promise.resolve("Please enter a question first.");
    }

    const topics = getTopics();

    if (!topics.length) {
      return Promise.resolve(
        "Revision content could not be loaded. Check that content.js, content2.js, content3.js and content4.js are included in index.html before app.js."
      );
    }

    const query = normalise(originalQuestion);
    const words = query.split(" ").filter(word => word.length > 2);

    const results = topics.map((topic, index) => {
      const title = topic.title || topic.name || `Topic ${index + 1}`;
      const searchable = normalise(getTopicText(topic));
      let score = 0;

      for (const word of words) {
        if (searchable.includes(word)) score += 1;
        if (normalise(title).includes(word)) score += 4;
      }

      if (selectedTopic && selectedTopic !== "All topics") {
        const selected = normalise(selectedTopic);
        if (
          normalise(title) === selected ||
          normalise(topic.id) === selected ||
          normalise(topic.section) === selected
        ) {
          score += 8;
        }
      }

      return { topic, title, score, index };
    });

    const matches = results
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (!matches.length) {
      return Promise.resolve(
        "I couldn't find matching information in the existing revision notes. Try a specific term such as cash flow, market research, motivation, profit, or economies of scale."
      );
    }

    const answer = matches.map(({ topic, title }) => {
      const lines = [];

      for (const [key, value] of Object.entries(topic)) {
        if (
          ["id", "title", "name"].includes(key) ||
          value == null ||
          value === ""
        ) continue;

        const formatted = flatten(value).trim();
        if (formatted) {
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, character => character.toUpperCase());

          lines.push(`${label}:\n${formatted}`);
        }
      }

      return `${title}\n\n${lines.join("\n\n")}`;
    }).join("\n\n━━━━━━━━━━━━━━━━━━━━\n\n");

    return Promise.resolve(answer);
  }

  window.BusinessLocalAIReady = Promise.resolve({
    ask
  });
})();
