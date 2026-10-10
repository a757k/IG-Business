
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "has", "have", "had", "can", "could", "would",
  "should", "will", "may", "might", "of", "to", "in", "on", "at", "by",
  "for", "from", "with", "about", "into", "than", "then", "that", "this",
  "these", "those", "it", "its", "they", "them", "their", "he", "she",
  "we", "you", "your", "i", "me", "my", "and", "or", "but", "if", "as",
  "what", "which", "who", "when", "where", "why", "how", "explain",
  "describe", "tell", "give", "show", "please", "business", "businesses"
]);

const ALIASES = {
  "boston matrix": [
    "boston matrix", "bcg matrix", "growth share matrix",
    "star", "stars", "cash cow", "cash cows",
    "question mark", "question marks", "dog", "dogs",
    "market growth", "market share"
  ],
  "marketing mix": [
    "marketing mix", "4ps", "product price place promotion"
  ],
  "break even": [
    "break even", "break-even", "break even point",
    "contribution", "fixed costs", "variable costs"
  ],
  "cash flow": [
    "cash flow", "cash inflow", "cash outflow",
    "cash flow forecast", "liquidity"
  ],
  "working capital": [
    "working capital", "current assets", "current liabilities"
  ],
  "motivation": [
    "motivation", "motivating employees", "financial rewards",
    "non-financial rewards", "job satisfaction"
  ],
  "market segmentation": [
    "market segmentation", "target market", "demographic",
    "geographic", "psychographic"
  ],
  "economies of scale": [
    "economies of scale", "diseconomies of scale",
    "average costs", "bulk buying"
  ],
  "sources of finance": [
    "sources of finance", "retained profit", "bank loan",
    "overdraft", "share capital", "trade credit"
  ],
  "recruitment": [
    "recruitment", "selection", "job description",
    "person specification", "internal recruitment",
    "external recruitment"
  ],
  "market research": [
    "market research", "primary research", "secondary research",
    "qualitative", "quantitative", "sample"
  ],
  "business objectives": [
    "business objectives", "profit maximisation", "survival",
    "growth", "market share", "social objectives"
  ],
  "stakeholders": [
    "stakeholders", "owners", "employees", "customers",
    "suppliers", "government", "local community"
  ],
  "cash flow forecast": [
    "cash flow forecast", "opening balance", "closing balance",
    "net cash flow", "cash inflows", "cash outflows"
  ],
  "income statement": [
    "income statement", "revenue", "cost of sales",
    "gross profit", "operating profit", "net profit"
  ],
  "marketing": [
    "marketing", "market research", "marketing mix",
    "promotion", "pricing", "distribution"
  ],
  "motivation theories": [
    "maslow", "taylor", "hierarchy of needs",
    "piece rate", "time rate"
  ]
};

function reply(statusCode, data) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(data)
  };
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalise(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/break\s*-\s*even/g, "break even")
    .replace(/[^a-z0-9.%£$+-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(value) {
  return normalise(value)
    .split(" ")
    .filter(word =>
      word.length > 1 &&
      !STOP_WORDS.has(word) &&
      !/^\d+$/.test(word)
    );
}

function unique(values) {
  return [...new Set(values)];
}

function collectDocuments(input) {
  const documents = [];
  const visited = new WeakSet();
  let count = 0;

  function walk(value, path, depth) {
    if (value == null || depth > 12 || count > 2500) return;

    if (typeof value === "string" || typeof value === "number") {
      const text = cleanText(value);
      if (text.length >= 20 && text.length <= 20000) {
        documents.push({
          title: path || "Business course content",
          text,
          source: path || "Course content"
        });
        count++;
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) =>
        walk(item, path ? `${path} ${index + 1}` : "", depth + 1)
      );
      return;
    }

    if (typeof value !== "object" || visited.has(value)) return;
    visited.add(value);

    const preferredTitle =
      value.title ||
      value.heading ||
      value.name ||
      value.topic ||
      value.label ||
      value.question ||
      "";

    const nextPath = preferredTitle
      ? cleanText(preferredTitle).slice(0, 140)
      : path;

    for (const [key, child] of Object.entries(value)) {
      if (
        key === "id" ||
        key === "image" ||
        key === "icon" ||
        key === "url" ||
        key === "href"
      ) continue;

      walk(child, nextPath || key, depth + 1);
    }
  }

  walk(input, "", 0);

  // Split large pieces of lesson content into smaller answer-sized pieces.
  const chunks = [];

  for (const doc of documents) {
    const sentences = doc.text
      .split(/(?<=[.!?])\s+|\n+/)
      .map(cleanText)
      .filter(sentence => sentence.length >= 18);

    if (sentences.length <= 1) {
      chunks.push(doc);
      continue;
    }

    let group = [];

    for (const sentence of sentences) {
      if (
        group.length &&
        group.join(" ").length + sentence.length > 650
      ) {
        chunks.push({
          ...doc,
          text: group.join(" ")
        });
        group = [];
      }

      group.push(sentence);
    }

    if (group.length) {
      chunks.push({
        ...doc,
        text: group.join(" ")
      });
    }
  }

  // Remove duplicate passages.
  const seen = new Set();

  return chunks.filter(doc => {
    const key = normalise(doc.text);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function findConcept(question) {
  const q = normalise(question);

  // Match longer and more specific concepts first.
  const concepts = Object.entries(ALIASES)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [concept, phrases] of concepts) {
    if (
      q.includes(normalise(concept)) ||
      phrases.some(phrase => q.includes(normalise(phrase)))
    ) {
      return { concept, phrases };
    }
  }

  return null;
}

function scoreDocument(doc, question, queryWords, concept) {
  const text = normalise(doc.text);
  const title = normalise(doc.title);
  let score = 0;

  for (const word of queryWords) {
    if (title.includes(word)) score += 7;
    if (text.includes(word)) score += 2;

    // Give a small extra reward for exact whole-word matches.
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`\\b${escaped}\\b`).test(text)) score += 1;
  }

  const q = normalise(question);

  if (q.length >= 4 && text.includes(q)) score += 15;
  if (title && q.includes(title) && title.length > 3) score += 12;

  if (concept) {
    const matchedPhrases = concept.phrases.filter(phrase =>
      text.includes(normalise(phrase))
    );

    score += matchedPhrases.length * 4;

    if (text.includes(normalise(concept.concept))) score += 12;
  }

  return score;
}

function getQuestionType(question) {
  const q = normalise(question);

  if (/^(what is|define|meaning of|what does .* mean)/.test(q)) {
    return "definition";
  }

  if (/^(why|give a reason|state a reason)/.test(q)) {
    return "why";
  }

  if (/^(how|in what way)/.test(q)) {
    return "how";
  }

  if (/^(compare|difference between|distinguish)/.test(q)) {
    return "compare";
  }

  if (/^(calculate|work out|find the|how much|what is the .* percentage)/.test(q)) {
    return "calculation";
  }

  if (/^(evaluate|assess|to what extent|discuss)/.test(q)) {
    return "evaluate";
  }

  if (/^(give|name|identify|state|list)/.test(q)) {
    return "short";
  }

  return "general";
}

function selectUsefulSentences(documents, question, queryWords, concept, type) {
  const candidates = [];

  for (const doc of documents) {
    const sentences = doc.text
      .split(/(?<=[.!?])\s+|\n+/)
      .map(cleanText)
      .filter(sentence => sentence.length >= 18 && sentence.length <= 420);

    for (const sentence of sentences) {
      const score = scoreDocument(
        { ...doc, text: sentence },
        question,
        queryWords,
        concept
      );

      if (score > 0) {
        candidates.push({
          text: sentence,
          score,
          title: doc.title
        });
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  const selected = [];
  const seen = new Set();

  for (const candidate of candidates) {
    const key = normalise(candidate.text);

    if (seen.has(key)) continue;

    // Don't include passages that are only loosely related.
    if (candidate.score < (concept ? 5 : 4)) continue;

    // Limit how much material is returned to the student.
    if (selected.length >= (type === "evaluate" ? 4 : 3)) break;

    // Avoid repeating almost identical content.
    const candidateWords = new Set(words(candidate.text));
    const duplicate = selected.some(item => {
      const existingWords = new Set(words(item.text));
      if (!candidateWords.size || !existingWords.size) return false;

      let overlap = 0;
      for (const word of candidateWords) {
        if (existingWords.has(word)) overlap++;
      }

      return overlap / Math.min(candidateWords.size, existingWords.size) > 0.8;
    });

    if (duplicate) continue;

    selected.push(candidate);
    seen.add(key);
  }

  return selected;
}

function makeAnswer(question, selected, type, concept) {
  if (!selected.length) {
    const topic = concept ? concept.concept : "this question";

    return (
      `I couldn't find enough relevant information about ${topic} in the ` +
      `Business content currently loaded on this website. I don't want to ` +
      `guess and teach you something incorrect. Try using the topic's exact ` +
      `name or check whether the relevant lesson has been added.`
    );
  }

  const sentences = selected.map(item => item.text);
  const q = normalise(question);

  // Return the requested information rather than a whole lesson.
  if (type === "definition" || type === "short") {
    return sentences.slice(0, 2).join(" ");
  }

  if (type === "why" || type === "how") {
    // Prefer a direct explanation, reason, consequence, or example.
    const causal = sentences.filter(sentence =>
      /\b(because|therefore|so that|this means|as a result|allows|helps|leads to|enables|reduces|increases|improves|prevents|results in)\b/i
        .test(sentence)
    );

    const chosen = unique([...causal, ...sentences]).slice(0, 3);
    return chosen.join(" ");
  }

  if (type === "compare") {
    return sentences.slice(0, 3).join(" ");
  }

  if (type === "calculation") {
    return sentences.slice(0, 3).join(" ");
  }

  if (type === "evaluate") {
    const answer = sentences.slice(0, 4).join(" ");
    return `${answer}\n\nFor an evaluation, use the evidence above to explain the likely impact on the business, then make a justified conclusion based on the situation in the question.`;
  }

  // If the source is long, keep the response concise.
  return sentences.slice(0, 3).join(" ");
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return reply(405, { error: "Method not allowed." });
  }

  let body;

  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return reply(400, { error: "Please send a valid question." });
  }

  const question = cleanText(body.question).slice(0, 1000);
  const topic = cleanText(body.topic).slice(0, 200);

  if (!question) {
    return reply(400, { error: "Type a question first." });
  }

  // Only search content supplied by the website.
  const websiteContent = {
    topics: Array.isArray(body.topics) ? body.topics : [],
    quizQuestions: Array.isArray(body.quizQuestions)
      ? body.quizQuestions
      : []
  };

  const documents = collectDocuments(websiteContent);

  if (!documents.length) {
    return reply(200, {
      answer:
        "I couldn't access any Business lesson content in this request. " +
        "Check that your website is sending BUSINESS_TOPICS and BUSINESS_QUIZ " +
        "to the tutor."
    });
  }

  const concept = findConcept(question);
  const queryWords = unique([
    ...words(question),
    ...words(topic)
  ]);

  // Search all content, then use the best matching passages only.
  const ranked = documents
    .map(doc => ({
      ...doc,
      score: scoreDocument(doc, question, queryWords, concept)
    }))
    .sort((a, b) => b.score - a.score);

  const bestScore = ranked[0]?.score || 0;

  // Don't confidently answer a question using unrelated lesson material.
  if (bestScore < 4) {
    return reply(200, {
      answer:
        "I couldn't find a close match for that question in the Business " +
        "content on this website. Try including the exact topic or key term " +
        "from your lesson, or check whether that content has been added."
    });
  }

  const type = getQuestionType(question);
  const selected = selectUsefulSentences(
    documents,
    question,
    queryWords,
    concept,
    type
  );

  const answer = makeAnswer(question, selected, type, concept);

  return reply(200, {
    answer,
    topic: concept?.concept || topic || "Business",
    sources: unique(selected.map(item => item.title)).slice(0, 3)
  });
};
