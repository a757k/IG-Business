
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm@0.2.80";

const MODEL_ID = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";

let enginePromise = null;

function updateStatus(message) {
  console.log("[Business AI]", message);

  window.dispatchEvent(
    new CustomEvent("business-ai-progress", {
      detail: { text: message }
    })
  );
}

function loadEngine() {
  if (!enginePromise) {
    enginePromise = (async () => {
      if (!("gpu" in navigator)) {
        throw new Error(
          "WebGPU is not supported in this browser. Update Microsoft Edge or Chrome."
        );
      }

      updateStatus("Loading AI model. This may take several minutes...");

      const engine = await CreateMLCEngine(MODEL_ID, {
        initProgressCallback: (progress) => {
          updateStatus(
            progress?.text || "Downloading and loading AI model..."
          );
        }
      });

      if (!engine?.chat?.completions?.create) {
        throw new Error("The AI model did not initialize correctly.");
      }

      updateStatus("AI model loaded and ready.");
      return engine;
    })().catch((error) => {
      enginePromise = null;
      console.error("[Business AI] Model loading failed:", error);
      throw new Error(
        "The AI model could not load. Check your internet connection, refresh the page, and try again. Details: " +
        (error?.message || String(error))
      );
    });
  }

  return enginePromise;
}

function getRevisionNotes() {
  const topics = Array.isArray(window.BUSINESS_TOPICS)
    ? window.BUSINESS_TOPICS
    : [];

  return topics.map((topic) => {
    const title = topic.title || topic.name || "Business topic";
    const details = [
      topic.definition,
      topic.description,
      topic.content,
      topic.explanation,
      topic.examTechnique,
      topic.keyTerms
    ]
      .flat()
      .filter(Boolean)
      .join("\n");

    return `${title}\n${details}`;
  }).join("\n\n").slice(0, 12000);
}

async function ask(question, selectedTopic = "") {
  if (typeof question !== "string" || !question.trim()) {
    throw new Error("Please type a question first.");
  }

  // Always wait for the model-loading promise before making a request.
  const engine = await loadEngine();

  const notes = getRevisionNotes();

  const systemMessage = `
You are an IGCSE Business tutor for Pearson Edexcel International GCSE Business (4BS1).

Explain concepts clearly at IGCSE level. Define business terms, use realistic examples, and explain cause-and-effect chains. For exam questions, help the student apply knowledge, analyse effects, and evaluate where appropriate. Do not claim that your answers are official mark schemes.

Selected topic: ${selectedTopic || "All topics"}

Revision notes:
${notes || "No revision notes are available. Answer using your general IGCSE Business knowledge."}
`;

  updateStatus("Generating your answer...");

  try {
    const response = await engine.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: question.trim()
        }
      ],
      temperature: 0.3,
      max_tokens: 600
    });

    const answer = response?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("The AI returned an empty answer. Please try again.");
    }

    updateStatus("Answer ready.");
    return answer;
  } catch (error) {
    console.error("[Business AI] Answer generation failed:", error);

    throw new Error(
      error?.message || "The AI could not answer. Please try again."
    );
  }
}

// Keep the interface expected by app.js.
window.BusinessLocalAIReady = Promise.resolve({
  ask,
  load: loadEngine
});

// Begin loading immediately, but report failures without creating an
// unhandled promise rejection. ask() will retry loading if necessary.
loadEngine().catch((error) => {
  updateStatus(error.message);
});
