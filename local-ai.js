
window.BusinessLocalAIReady = Promise.resolve({
  async ask(question, selectedTopic = "") {
    const q = String(question || "").trim().toLowerCase();

    if (!q) {
      return "Please enter a question.";
    }

    const topics = Array.isArray(window.BUSINESS_TOPICS)
      ? window.BUSINESS_TOPICS
      : [];

    if (!topics.length) {
      return "No revision content was found. Please check that content.js and the other content files are loaded.";
    }

    const words = q.split(/[^a-z0-9]+/).filter(w => w.length > 1);

    const results = topics.map(topic => {
      const title = topic.title || topic.name || "Business topic";
      const text = [
        title,
        topic.section,
        topic.definition,
        topic.description,
        topic.content,
        topic.explanation,
        topic.examTechnique,
        topic.keyTerms,
        topic.example
      ].flat().filter(Boolean).join(" ");

      const searchable = text.toLowerCase();
      let score = 0;

      for (const word of words) {
        if (searchable.includes(word)) score += 1;
        if (String(title).toLowerCase().includes(word)) score += 3;
      }

      if (
        selectedTopic &&
        selectedTopic !== "All topics" &&
        String(title).toLowerCase() === selectedTopic.toLowerCase()
      ) {
        score += 10;
      }

      return { topic, title, score };
    });

    const matches = results
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    if (!matches.length) {
      return "I couldn't find a close match in the revision notes. Try using a specific Business term, such as cash flow, market segmentation, motivation, or economies of scale.";
    }

    return matches.map(({ topic, title }) => {
      const sections = [];

      for (const key of [
        "definition",
        "description",
        "explanation",
        "content",
        "example",
        "examTechnique",
        "keyTerms"
      ]) {
        const value = topic[key];

        if (Array.isArray(value)) {
          if (value.length) sections.push(value.join("\n"));
        } else if (typeof value === "string" && value.trim()) {
          sections.push(value.trim());
        }
      }

      if (!sections.length) {
        sections.push(
          Object.entries(topic)
            .filter(([key, value]) =>
              !["id", "title", "name", "section"].includes(key) &&
              typeof value === "string" &&
              value.trim()
            )
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
        );
      }

      return `${title}\n${sections.join("\n\n")}`;
    }).join("\n\n--------------------\n\n");
  }
});
