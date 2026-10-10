
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "has", "have", "had", "can", "could", "would",
  "should", "will", "may", "might", "of", "to", "in", "on", "at", "by",
  "for", "from", "with", "about", "into", "than", "then", "that", "this",
  "these", "those", "it", "its", "they", "them", "their", "he", "she",
  "we", "you", "your", "i", "me", "my", "and", "or", "but", "if", "as",
  "what", "which", "who", "when", "where", "why", "how", "please",
  "explain", "describe", "tell", "give", "show", "business", "businesses"
]);

const ALIASES = {
  "boston matrix": [
    "boston matrix", "bcg matrix", "growth share matrix",
    "stars", "star", "cash cows", "cash cow",
    "question marks", "question mark", "dogs",
    "market growth", "relative market share"
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
    "cash flow forecast", "net cash flow"
  ],
  "working capital": [
    "working capital", "current assets", "current liabilities"
  ],
  "market segmentation": [
    "market segmentation", "target market", "demographic",
    "geographic", "psychographic"
  ],
  "market research": [
    "market research", "primary research", "secondary research",
    "qualitative", "quantitative", "sample"
  ],
  "economies of scale": [
    "economies of scale", "diseconomies of scale",
    "average costs", "bulk buying"
  ],
  "sources of finance": [
    "sources of finance", "retained profit", "bank loan",
    "overdraft", "share capital", "trade credit"
  ],
  "motivation": [
    "motivation", "motivating employees", "financial rewards",
    "non-financial rewards", "job satisfaction", "maslow", "taylor"
  ],
  "stakeholders": [
    "stakeholders", "owners", "employees", "customers",
    "suppliers", "government", "local community"
  ],
  "business objectives": [
    "business objectives", "profit maximisation", "survival",
    "growth", "market share", "social objectives"
  ],
  "income statement": [
    "income statement", "revenue", "cost of sales",
    "gross profit", "operating profit", "net profit"
  ],
  "recruitment": [
    "recruitment", "selection", "job description",
    "person specification", "internal recruitment", "external recruitment"
  ],
  "cash flow forecast": [
    "cash flow forecast", "opening balance", "closing balance",
    "net cash flow", "cash inflows", "cash outflows"
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
    if (value == null || depth > 12 || count >= 3000) return;

    if (typeof value === "string" || typeof value === "number") {
      const text = cleanText(value);

      if (text.length >= 18 && text.length <= 20000) {
        documents.push({
          title: path || "Business course content",
          text
        });
        count++;
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        walk(item, path, depth + 1);
      });
      return;
    }

    if (typeof value !== "object" || visited.has(value)) return;
    visited.add(value);

    const title =
      value.title ||
      value.heading ||
      value.name ||
      value.topic ||
      value.label ||
      "";

    const nextPath = cleanText(title).slice(0, 140) || path;

    for (const [key, child] of Object.entries(value)) {
      if ([
        "id", "image", "icon", "url", "href"
      ].includes(key)) continue;

      walk(child, nextPath || key, depth + 1);
    }
  }

  walk(input, "", 0);

  // Break long lessons into smaller passages.
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
      const currentLength = group.join(" ").length;

      if (group.length && currentLength + sentence.length > 700) {
        chunks.push({ ...doc, text: group.join(" ") });
        group = [];
      }

      group.push(sentence);
    }

    if (group.length) {
      chunks.push({ ...doc, text: group.join(" ") });
    }
  }

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

function getIntent(question) {
  const q = normalise(question);

  if (/\b(in detail|detailed|long answer|longer answer|in depth|thoroughly|comprehensive|step by step|full explanation|teach me|everything about)\b/.test(q)) {
    return "detailed";
  }

  if (/\b(example|for example|real life|real world|case study)\b/.test(q)) {
    return "example";
  }

  if (/\b(advantages|benefits|strengths|positive effects)\b/.test(q)) {
    return "advantages";
  }

  if (/\b(disadvantages|drawbacks|limitations|weaknesses|negative effects)\b/.test(q)) {
    return "disadvantages";
  }

  if (/\b(compare|comparison|difference between|different from|whereas)\b/.test(q)) {
    return "compare";
  }

  if (/\b(evaluate|evaluation|assess|to what extent|discuss)\b/.test(q)) {
    return "evaluate";
  }

  if (/\b(calculate|calculation|work out|percentage|formula)\b/.test(q)) {
    return "calculation";
  }

  if (/^(what is|define|definition|meaning of|what does)/.test(q)) {
    return "definition";
  }

  if (/^(why|what are the reasons|give a reason)/.test(q)) {
    return "why";
  }

  if (/^(how|in what way|how does|how can)/.test(q)) {
    return "how";
  }

  if (/^(give|name|identify|state|list)\b/.test(q)) {
    return "short";
  }

  return "general";
}

function scoreDocument(doc, queryWords, concept, question) {
  const text = normalise(doc.text);
  const title = normalise(doc.title);
  let score = 0;

  for (const word of queryWords) {
    if (title.includes(word)) score += 5;
    if (text.includes(word)) score += 2;

    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (new RegExp(`\\b${escaped}\\b`).test(text)) {
      score += 1;
    }
  }

  const q = normalise(question);

  if (q.length > 4 && text.includes(q)) score += 10;

  if (concept) {
    if (text.includes(normalise(concept.concept))) score += 10;

    for (const phrase of concept.phrases) {
      const p = normalise(phrase);
      if (p.length > 3 && text.includes(p)) score += 3;
    }
  }

  return score;
}

function splitSentences(text) {
  return cleanText(text)
    .split(/(?<=[.!?])\s+|\n+/)
    .map(cleanText)
    .filter(sentence => sentence.length >= 18 && sentence.length <= 700);
}

function sentenceRelevance(sentence, queryWords, concept, intent) {
  const text = normalise(sentence);
  let score = 0;

  for (const word of queryWords) {
    if (text.includes(word)) score += 2;
  }

  if (concept && text.includes(normalise(concept.concept))) score += 8;

  const signals = {
    example: /\b(for example|such as|for instance|e\.g\.|example|including)\b/i,
    advantages: /\b(advantage|benefit|improve|increase|help|allow|enable|reduce|save)\b/i,
    disadvantages: /\b(disadvantage|drawback|risk|problem|limit|however|cost|difficult)\b/i,
    why: /\b(because|therefore|as a result|this means|leads to|allows|helps|enables)\b/i,
    how: /\b(by |through|using|allows|enables|means that|as a result)\b/i,
    evaluate: /\b(however|although|depends|therefore|in conclusion|whereas|but)\b/i,
    calculation: /\b(formula|divide|multiply|subtract|calculate|percentage|total|contribution)\b/i
  };

  if (signals[intent]?.test(sentence)) score += 4;

  return score;
}

function selectPassages(documents, question, queryWords, concept, intent) {
  const results = [];

  for (const doc of documents) {
    const docScore = scoreDocument(doc, queryWords, concept, question);

    for (const sentence of splitSentences(doc.text)) {
      const sentenceScore =
        sentenceRelevance(sentence, queryWords, concept, intent);

      const total = docScore + sentenceScore;

      if (total > 0) {
        results.push({
          text: sentence,
          score: total,
          title: doc.title
        });
      }
    }
  }

  results.sort((a, b) => b.score - a.score);

  const seen = new Set();
  const selected = [];

  const limit =
    intent === "detailed" ? 12 :
    intent === "evaluate" ? 8 : 5;

  for (const item of results) {
    const key = normalise(item.text);

    if (seen.has(key)) continue;

    if (item.score < (concept ? 4 : 5)) continue;

    const currentWords = new Set(words(item.text));

    const duplicate = selected.some(existing => {
      const oldWords = new Set(words(existing.text));

      if (!currentWords.size || !oldWords.size) return false;

      let overlap = 0;
      for (const word of currentWords) {
        if (oldWords.has(word)) overlap++;
      }

      return overlap / Math.min(currentWords.size, oldWords.size) > 0.85;
    });

    if (duplicate) continue;

    selected.push(item);
    seen.add(key);

    if (selected.length >= limit) break;
  }

  return selected;
}

function makeAnswer(question, selected, intent, concept) {
  if (!selected.length) {
    const subject = concept?.concept || "that specific topic";

    return (
      `I couldn't find enough relevant information about ${subject} in ` +
      `the lessons currently available on this website. I don't want to ` +
      `give you a made-up answer. Try using the exact term from your lesson, ` +
      `or check whether the topic has been added to the website.`
    );
  }

  const sentences = selected.map(item => item.text);
  const subject = concept?.concept || "this topic";

  if (intent === "definition") {
    return (
      `In simple terms, ${subject} means:\n\n` +
      `${sentences.slice(0, 2).join(" ")}`
    );
  }

  if (intent === "short") {
    return sentences.slice(0, 2).join(" ");
  }

  if (intent === "example") {
    return (
      `Let's make it practical. Here is the most relevant information ` +
      `I found about ${subject}:\n\n` +
      sentences.slice(0, 4).join("\n\n") +
      `\n\nUse a specific business from your own case study if your exam question gives you one.`
    );
  }

  if (intent === "advantages") {
    return (
      `The main benefits to consider are:\n\n` +
      sentences.slice(0, 5).map(s => `- ${s}`).join("\n\n")
    );
  }

  if (intent === "disadvantages") {
    return (
      `The main drawbacks to consider are:\n\n` +
      sentences.slice(0, 5).map(s => `- ${s}`).join("\n\n")
    );
  }

  if (intent === "why" || intent === "how") {
    const causal = sentences.filter(s =>
      /\b(because|therefore|as a result|this means|leads to|allows|helps|enables|reduces|increases|improves)\b/i.test(s)
    );

    const ordered = unique([...causal, ...sentences]).slice(0, 5);

    return (
      `The key idea is how ${subject} affects the business.\n\n` +
      ordered.join("\n\n") +
      `\n\nFor an exam answer, connect the point to its effect on the business, such as costs, revenue, profit or customer satisfaction, where relevant.`
    );
  }

  if (intent === "compare") {
    return (
      `The important points to compare are:\n\n` +
      sentences.slice(0, 6).map(s => `- ${s}`).join("\n\n") +
      `\n\nIn an exam, make the difference clear rather than describing each point separately.`
    );
  }

  if (intent === "calculation") {
    return (
      `Let's focus on the calculation information available in your course:\n\n` +
      sentences.slice(0, 5).join("\n\n") +
      `\n\nIf you send the actual numbers in the question, I can help you work through the calculation step by step using the relevant formula from your course content.`
    );
  }

  if (intent === "evaluate") {
    return (
      `Here are the most relevant points I found about ${subject}:\n\n` +
      sentences.slice(0, 8).join("\n\n") +
      `\n\n**How to build an evaluation:** explain a benefit or drawback, develop its effect on the business, consider the opposing side, and finish with a justified conclusion based on the case study.`
    );
  }

  if (intent === "detailed") {
    return (
      `Sure — let's break ${subject} down properly.\n\n` +
      sentences.slice(0, 12).join("\n\n") +
      `\n\n**How to use this in an exam:** choose the points that answer the exact question, explain why they matter, and develop their impact on the business. Use evidence from the case study whenever it is provided.`
    );
  }

  return (
    `Here's the information most relevant to your question:\n\n` +
    sentences.slice(0, 5).join("\n\n") +
    `\n\nIf you want, ask me about one part of this topic and I can focus the explanation on that specific point.`
  );
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

  const content = {
    topics: Array.isArray(body.topics) ? body.topics : [],
    quizQuestions: Array.isArray(body.quizQuestions)
      ? body.quizQuestions
      : []
  };

  const documents = collectDocuments(content);

  if (!documents.length) {
    return reply(200, {
      answer:
        "I couldn't access the lesson content in this request. Check that " +
        "your website is sending BUSINESS_TOPICS and BUSINESS_QUIZ to the tutor."
    });
  }

  const concept = findConcept(question);
  const intent = getIntent(question);

  const queryWords = unique([
    ...words(question),
    ...words(topic)
  ]);

  const ranked = documents
    .map(doc => ({
      ...doc,
      score: scoreDocument(doc, queryWords, concept, question)
    }))
    .sort((a, b) => b.score - a.score);

  if (!ranked.length || ranked[0].score < 4) {
    return reply(200, {
      answer:
        "I couldn't find a close match for that question in the available " +
        "Business lessons. Try including the exact topic or key term from " +
        "your lesson, or check whether that topic has been added."
    });
  }

  const selected = selectPassages(
    documents,
    question,
    queryWords,
    concept,
    intent
  );

  const answer = makeAnswer(question, selected, intent, concept);

  return reply(200, {
    answer,
    topic: concept?.concept || topic || "Business",
    sources: unique(selected.map(item => item.title)).slice(0, 4)
  });
};
