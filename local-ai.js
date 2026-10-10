// Browser-based language model for the Edexcel IGCSE Business tutor.
// No AI API key or paid inference service is used.

const MODEL_ID = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";
let enginePromise = null;

function updateTutorButton(message) {
  const button = document.querySelector("#askButton");
  if (button) button.textContent = message;
}

async function getLocalEngine() {
  if (!navigator.gpu) {
    throw new Error(
      "This browser/device does not support WebGPU. Try the latest Microsoft Edge or Google Chrome on a compatible device."
    );
  }

  if (!enginePromise) {
    enginePromise = (async () => {
      updateTutorButton("Loading AI library…");
      const webllm = await import("https://esm.run/@mlc-ai/web-llm");
      updateTutorButton("Downloading/preparing model…");

      return webllm.CreateMLCEngine(MODEL_ID, {
        initProgressCallback(progress) {
          if (progress?.text) {
            const text = progress.text;
            updateTutorButton(
              text.length > 55 ? text.slice(0, 52) + "…" : text
            );
          }
        }
      });
    })().catch(error => {
      enginePromise = null;
      throw error;
    });
  }

  return enginePromise;
}

function topicToText(topic) {
  const values = [
    topic.title,
    topic.name,
    topic.section,
    topic.sectionName,
    topic.sectionLabel,
    topic.summary,
    topic.description,
    topic.definition,
    topic.example,
    topic.examTip,
    topic.question,
    topic.answer,
    Array.isArray(topic.keywords)
      ? topic.keywords.join(", ")
      : topic.keywords
  ];

  if (Array.isArray(topic.points)) {
    for (const point of topic.points) {
      if (Array.isArray(point)) {
        values.push(point.join(": "));
      } else if (point && typeof point === "object") {
        values.push(point.title || point.name || "");
        values.push(point.explanation || point.description || "");
      } else {
        values.push(String(point ?? ""));
      }
    }
  }

  return values
    .filter(Boolean)
    .map(value => String(value))
    .join("\n");
}

function findBusinessContext(question, selectedTopic) {
  const topics = Array.isArray(window.BUSINESS_TOPICS)
    ? window.BUSINESS_TOPICS.filter(Boolean)
    : [];

  if (!topics.length) {
    throw new Error(
      "The Business notes have not loaded. Check your content scripts in index.html."
    );
  }

  const ignored = new Set([
    "the", "and", "for", "that", "this", "what", "why", "how", "does",
    "can", "could", "would", "should", "explain", "describe", "define",
    "give", "with", "about", "business", "igcse", "edexcel", "from", "into"
  ]);

  const words = question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2 && !ignored.has(word));

  const chosenTopic = String(selectedTopic || "").toLowerCase();

  const ranked = topics.map(topic => {
    const title = String(topic.title || topic.name || "");
    const text = topicToText(topic);
    const searchable = text.toLowerCase();
    let score = 0;

    for (const word of words) {
      if (title.toLowerCase().includes(word)) {
        score += 5;
      } else if (searchable.includes(word)) {
        score += 1;
      }
    }

    if (
      chosenTopic &&
      chosenTopic !== "all" &&
      chosenTopic !== "all topics"
    ) {
      const sectionInfo = [
        topic.id,
        topic.section,
        topic.sectionName,
        topic.sectionLabel,
        title
      ].join(" ").toLowerCase();

      if (sectionInfo.includes(chosenTopic)) score += 8;
    }

    return { title, text, score };
  }).sort((a, b) => b.score - a.score);

  const relevant = ranked
    .filter(item => item.score > 0)
    .slice(0, 6);

  const context = (relevant.length ? relevant : ranked.slice(0, 3))
    .map(item => `TOPIC: ${item.title}\n${item.text}`)
    .join("\n\n---\n\n");

  return context.slice(0, 9000);
}

window.BusinessLocalAIReady = Promise.resolve({
  async ask(question, selectedTopic = "All topics") {
    const engine = await getLocalEngine();
    const notes = findBusinessContext(question, selectedTopic);

    const result = await engine.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful tutor for Pearson Edexcel International GCSE Business (4BS1).

Use clear, student-friendly English. Focus on the Edexcel IGCSE Business syllabus and the supplied notes. Give realistic business examples where useful. For exam questions, develop points by explaining why they matter to the business; include application and evaluation when appropriate. For calculations, show the formula, substitution and answer. Do not invent official mark schemes or claim full marks are guaranteed. If the notes are insufficient, say so and distinguish general knowledge from the supplied notes. If a question is unrelated to Business, politely redirect the student to Business.

Relevant website notes:
${notes}`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.3,
      max_tokens: 600
    });

    const answer = result?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error(
        "The language model returned an empty answer. Please try again."
      );
    }

    return answer;
  }
});

console.log("Local Business language model integration loaded.");
