
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return reply(405, { error: 'Method not allowed.' });
  }

  let body;

  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return reply(400, { error: 'Invalid request body.' });
  }

  const question =
    typeof body.question === 'string'
      ? body.question.trim()
      : '';

  const selectedTopic =
    typeof body.topic === 'string'
      ? body.topic.slice(0, 120)
      : '';

  const topics = Array.isArray(body.topics)
    ? body.topics.slice(0, 1000)
    : [];

  const quizQuestions = Array.isArray(body.quizQuestions)
    ? body.quizQuestions.slice(0, 3000)
    : [];

  if (!question) {
    return reply(400, {
      error: 'Please enter a question.'
    });
  }

  if (question.length > 2000) {
    return reply(400, {
      error: 'Please keep your question under 2,000 characters.'
    });
  }

  if (!topics.length && !quizQuestions.length) {
    return reply(400, {
      error: 'No Business learning content was received. Refresh the website and try again.'
    });
  }

  try {
    const stopWords = new Set([
      'the', 'a', 'an', 'is', 'are', 'was', 'were',
      'what', 'why', 'how', 'when', 'where', 'who',
      'does', 'do', 'did', 'can', 'could', 'would',
      'should', 'explain', 'tell', 'me', 'about',
      'please', 'and', 'or', 'to', 'of', 'in',
      'for', 'with', 'on', 'it', 'this', 'that',
      'be', 'as', 'by', 'give', 'some', 'business',
      'igcse', 'define', 'definition', 'describe',
      'mean', 'means', 'meaning', 'example', 'examples',
      'edexcel', 'international', 'gcse'
    ]);

    function normalise(value) {
      return String(value ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9%£$.-]+/g, ' ')
        .trim();
    }

    function wordsOf(value) {
      return normalise(value)
        .split(/\s+/)
        .filter(word =>
          word.length > 1 && !stopWords.has(word)
        );
    }

    function clean(value, maxLength = 3000) {
      if (typeof value === 'string') {
        return value.slice(0, maxLength).trim();
      }

      if (typeof value === 'number') {
        return String(value);
      }

      return '';
    }

    // Collect text from every string field, including fields
    // added to the learning content in the future.
    function extractText(value, depth = 0) {
      if (depth > 8 || value == null) return [];

      if (typeof value === 'string' ||
          typeof value === 'number') {
        return [String(value)];
      }

      if (Array.isArray(value)) {
        return value.slice(0, 500).flatMap(item =>
          extractText(item, depth + 1)
        );
      }

      if (typeof value === 'object') {
        return Object.values(value).slice(0, 200).flatMap(item =>
          extractText(item, depth + 1)
        );
      }

      return [];
    }

    const questionWords = wordsOf(question);
    const phrase = normalise(question);

    if (!questionWords.length) {
      return reply(200, {
        answer:
          'Please ask a specific question about Edexcel International GCSE Business, such as a definition, calculation, business concept or exam technique.'
      });
    }

    // Give more weight to the title and the key definition,
    // while also searching every other field in each topic.
    const rankedTopics = topics.map(topic => {
      if (!topic || typeof topic !== 'object') {
        return null;
      }

      const title = clean(topic.title || topic.name, 250);
      const definition = clean(topic.definition, 2000);
      const summary = clean(
        topic.summary || topic.description,
        2000
      );

      const example = clean(topic.example, 2000);
      const examTip = clean(topic.examTip, 2000);
      const allText = normalise(extractText(topic).join(' '));

      let score = 0;

      for (const word of questionWords) {
        if (normalise(title).includes(word)) score += 8;
        if (normalise(definition).includes(word)) score += 4;
        if (normalise(summary).includes(word)) score += 3;
        if (normalise(example).includes(word)) score += 2;
        if (normalise(examTip).includes(word)) score += 2;

        if (allText.includes(word)) score += 1;
      }

      const normalTitle = normalise(title);

      if (phrase && normalTitle === phrase) {
        score += 20;
      } else if (phrase && normalTitle.includes(phrase)) {
        score += 10;
      }

      // Small preference for the selected syllabus topic.
      if (
        selectedTopic &&
        normalise(title).includes(normalise(selectedTopic))
      ) {
        score += 2;
      }

      return {
        topic,
        title,
        definition,
        summary,
        example,
        examTip,
        score,
        allText
      };
    }).filter(Boolean)
      .sort((a, b) => b.score - a.score);

    const rankedQuizzes = quizQuestions.map(item => {
      if (!item || typeof item !== 'object') return null;

      const text = normalise(extractText(item).join(' '));

      const score = questionWords.reduce(
        (total, word) =>
          total + (text.includes(word) ? 1 : 0),
        0
      );

      return { item, score };
    }).filter(Boolean)
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    const bestTopics = rankedTopics
      .filter(item => item.score > 0)
      .slice(0, 3);

    const bestQuizzes = rankedQuizzes.slice(0, 2);

    const bestScore = bestTopics[0]?.score || 0;

    // Do not invent an answer if the supplied notes contain
    // no useful match.
    if (!bestTopics.length || bestScore < 2) {
      return reply(200, {
        answer:
          'I could not find enough relevant information in the Business content currently loaded on this website to answer confidently.\n\n' +
          'I can search the notes, definitions, examples, exam tips and practice questions that are available here. Try asking with the name of a syllabus topic or a key Business term.'
      });
    }

    const answerParts = [];

    answerParts.push(
      'I searched the Business learning materials on this website. Here is the most relevant information I found:\n'
    );

    for (const result of bestTopics) {
      const topic = result.topic;
      const lines = [];

      lines.push(
        `TOPIC: ${result.title || 'Business topic'}`
      );

      if (result.definition) {
        lines.push(`Definition: ${result.definition}`);
      }

      if (result.summary) {
        lines.push(`Overview: ${result.summary}`);
      }

      // Present learning points in a readable format.
      if (Array.isArray(topic.points) && topic.points.length) {
        const points = topic.points.map(point => {
          if (Array.isArray(point)) {
            const heading = clean(point[0], 300);
            const explanation = clean(point[1], 1500);

            return heading
              ? `${heading}: ${explanation}`
              : explanation;
          }

          if (point && typeof point === 'object') {
            const heading = clean(
              point.title || point.name,
              300
            );

            const explanation = clean(
              point.explanation || point.description,
              1500
            );

            return heading
              ? `${heading}: ${explanation}`
              : explanation;
          }

          return clean(point, 1500);
        }).filter(Boolean);

        if (points.length) {
          lines.push(
            'Key learning points:\n- ' + points.join('\n- ')
          );
        }
      }

      if (result.example) {
        lines.push(`Business example: ${result.example}`);
      }

      if (result.examTip) {
        lines.push(`Exam technique: ${result.examTip}`);
      }

      if (topic.question) {
        lines.push(
          `Practice question: ${clean(topic.question, 1000)}`
        );
      }

      if (topic.answer) {
        lines.push(
          `Sample answer: ${clean(topic.answer, 2000)}`
        );
      }

      answerParts.push(lines.join('\n'));
    }

    if (bestQuizzes.length) {
      const quizText = bestQuizzes.map(({ item }) => {
        const q = clean(item.q || item.question, 1000);
        const explanation = clean(item.explanation, 2000);

        return [
          q ? `Question: ${q}` : '',
          explanation ? `Explanation: ${explanation}` : ''
        ].filter(Boolean).join('\n');
      }).filter(Boolean);

      if (quizText.length) {
        answerParts.push(
          'RELATED PRACTICE QUESTIONS\n' +
          quizText.join('\n\n')
        );
      }
    }

    answerParts.push(
      'Note: This response retrieves and organises existing website content. It does not generate new knowledge, and the material shown may not cover every part of the question.'
    );

    return reply(200, {
      answer: answerParts.join('\n\n--------------------\n\n')
    });

  } catch (error) {
    console.error('Business content search failed:', error);

    return reply(500, {
      error: 'The Business content search failed. Please refresh the website and try again.'
    });
  }
};

function reply(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(body)
  };
}
