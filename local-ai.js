
const MODEL_ID = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";

let enginePromise = null;
let webllmPromise = null;

function showProgress(text) {
  window.dispatchEvent(
    new CustomEvent("business-ai-progress", {
      detail: { text }
    })
  );
}

async function getWebLLM() {
  if (!webllmPromise) {
    webllmPromise = import("https://esm.run/@mlc-ai/web-llm")
      .catch((error) => {
        webllmPromise = null;
        throw new Error(
          "Could not load the AI library. Check your internet connection and refresh the page."
        );
      });
  }

  return webllmPromise;
}

async function getLocalEngine() {
  if (!("gpu" in navigator)) {
    throw new Error(
      "Your browser or device does not support WebGPU, which this AI model needs. Try updating Microsoft Edge or Chrome."
    );
  }

  if (!enginePromise) {
    enginePromise = (async () => {
      showProgress("Loading the AI library...");

      const webllm = await getWebLLM();

      if (!webllm.MLCEngine) {
        throw new Error(
          "The AI library did not initialize correctly. Please refresh the page."
        );
      }

      // Create an engine and explicitly load the model before using it.
      const engine = new webllm.MLCEngine();

      await engine.reload(MODEL_ID, {
        initProgressCallback: (progress) => {
          const message =
            progress?.text || "Preparing the AI model...";
          showProgress(message);
        }
      });

      showProgress("AI model ready.");
      return engine;
    })().catch((error) => {
      enginePromise = null;
      console.error("Business AI model loading failed:", error);
      throw error;
    });
  }

  return enginePromise;
}

function getRelevantBusinessContent(question, selectedTopic) {
  const topics = Array.isArray(window.BUSINESS_TOPICS)
    ? window.BUSINESS_TOPICS
    : [];

  const query = `${question} ${selectedTopic || ""}`.toLowerCase();

  const words = query
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2);

  const ranked = topics.map((topic) => {
    const searchable = [
      topic.title,
      topic.name,
      topic.section,
      topic.description,
      topic.content,
      topic.explanation,
      topic.definition,
      topic.examTechnique,
      topic.keyTerms
    ]
      .flat()
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    let score = 0;

    for (const word of words) {
      if (searchable.includes(word)) {
        score += 1;
      }
    }

    if (
      selectedTopic &&
      selectedTopic !== "All topics" &&
      [topic.title, topic.name, topic.id].some(
        (value) =>
          value &&
          String(value).toLowerCase() === selectedTopic.toLowerCase()
      )
    ) {
      score += 10;
    }

    return { topic, score, searchable };
  });

  return ranked
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ topic }) => {
      if (typeof topic.content === "string") {
        return `${topic.title || topic.name || "Topic"}\n${topic.content}`;
      }

      return JSON.stringify(topic);
    })
    .join("\n\n")
    .slice(0, 9000);
}

window.BusinessLocalAIReady = Promise.resolve({
  async ask(question, selectedTopic = "") {
    if (!question || !question.trim()) {
      throw new Error("Please enter a question first.");
    }

    // Do not send a completion request until the model has loaded.
    showProgress("Checking that the AI model is ready...");
    const engine = await getLocalEngine();

    const businessContent = getRelevantBusinessContent(
      question,
      selectedTopic
    );

    const systemPrompt = `
You are a helpful tutor for Pearson Edexcel International GCSE Business (4BS1).

Teach at IGCSE level using clear, concise explanations.
Define important business terms accurately.
Use relevant business examples.
When appropriate, explain chains of reasoning and the effect on a business.
Give exam advice and use knowledge, application, analysis and evaluation where relevant.
Do not invent quotations from the official specification or claim an answer is an official mark scheme.

Use the supplied revision content when relevant. If it does not contain the answer, answer from your general knowledge of IGCSE Business and be honest about uncertainty.

Relevant revision content:
${businessContent || "No closely matching revision notes were found."}
`;

    showProgress("Writing your answer...");

    try {
      const result = await engine.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question.trim() }
        ],
        temperature: 0.3,
        max_tokens: 600
      });

      const answer = result?.choices?.[0]?.message?.content?.trim();

      if (!answer) {
        throw new Error(
          "The AI did not return an answer. Please try asking again."
        );
      }

      showProgress("Answer ready.");
      return answer;
    } catch (error) {
      console.error("Business AI request failed:", error);
      throw new Error(
        error?.message ||
          "The AI could not answer this question. Please try again."
      );
    }
  }
});
