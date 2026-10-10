
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

  const question = typeof body.question === 'string'
    ? body.question.trim()
    : '';

  const selectedTopic = typeof body.topic === 'string'
    ? body.topic.slice(0, 120)
    : '';

  const topics = Array.isArray(body.topics)
    ? body.topics.slice(0, 1000)
    : [];

  const quizzes = Array.isArray(body.quizQuestions)
    ? body.quizQuestions.slice(0, 3000)
    : [];

  if (!question) {
    return reply(400, { error: 'Please enter a question.' });
  }

  if (question.length > 2000) {
    return reply(400, {
      error: 'Please keep your question under 2,000 characters.'
    });
  }

  if (!topics.length && !quizzes.length) {
    return reply(200, {
      answer: 'No Business learning content was received. Refresh the website and try again.'
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
      'igcse', 'edexcel', 'international', 'gcse',
      'define', 'definition', 'describe', 'mean',
      'means', 'meaning', 'example', 'examples',
      'tell', 'difference', 'between', 'use',
      'used', 'uses', 'works', 'work', 'matrix'
    ]);

    function norm(value) {
      return String(value ?? '')
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9%£$.-]+/g, ' ')
        .trim()
        .replace(/\s+/g, ' ');
    }

    function words(value) {
      return norm(value)
        .split(' ')
        .filter(w => w.length > 1 && !stopWords.has(w));
    }

    function str(value, limit = 2500) {
      return typeof value === 'string'
        ? value.trim().slice(0, limit)
        : '';
    }

    function flatten(value, depth = 0) {
      if (depth > 7 || value == null) return [];

      if (typeof value === 'string' ||
          typeof value === 'number') {
        return [String(value)];
      }

      if (Array.isArray(value)) {
        return value.slice(0, 300).flatMap(v =>
          flatten(v, depth + 1)
        );
      }

      if (typeof value === 'object') {
        return Object.values(value).slice(0, 150).flatMap(v =>
          flatten(v, depth + 1)
        );
      }

      return [];
    }

    // Recognise some common Business terms and their wording.
    // Add further aliases here as the syllabus content grows.
    const aliases = [
      {
        terms: ['boston matrix', 'bcg matrix', 'growth share matrix'],
        words: ['boston', 'bcg', 'growth share']
      },
      {
        terms: ['cash flow forecast', 'cash flow forecasting'],
        words: ['cash flow forecast']
      },
      {
        terms: ['break even', 'break-even analysis'],
        words: ['break even']
      },
      {
        terms: ['market segmentation'],
        words: ['market segmentation']
      },
      {
        terms: ['market research'],
        words: ['market research']
      },
      {
        terms: ['marketing mix'],
        words: ['marketing mix', '4ps']
      },
      {
        terms: ['profit margin'],
        words: ['profit margin']
      },
      {
        terms: ['working capital'],
        words: ['working capital']
      },
      {
        terms: ['economies of scale'],
        words: ['economies of scale']
      },
      {
        terms: ['diseconomies of scale'],
        words: ['diseconomies of scale']
      },
      {
        terms: ['price elasticity of demand'],
        words: ['price elasticity of demand']
      },
      {
        terms: ['market share'],
        words: ['market share']
      },
      {
        terms: ['added value'],
        words: ['added value']
      }
    ];

    const normalQuestion = norm(question);

    const matchedAlias = aliases.find(group =>
      group.terms.some(term =>
        normalQuestion.includes(norm(term))
      )
    );

    // If a distinctive Business term is explicitly requested,
    // require a result that actually contains that term or alias.
    const distinctiveTerms = matchedAlias
      ? matchedAlias.words.map(norm)
      : [];

    const questionWords = words(question);

    const ranked = topics.map(topic => {
      if (!topic || typeof topic !== 'object') return null;

      const title = str(topic.title || topic.name, 250);
      const definition = str(topic.definition);
      const summary = str(topic.summary || topic.description);
      const example = str(topic.example);
      const examTip = str(topic.examTip);

      const pointText = Array.isArray(topic.points)
        ? topic.points.map(point => {
            if (Array.isArray(point)) return point.join(' ');

            if (point && typeof point === 'object') {
              return [
                point.title,
                point.name,
                point.explanation,
                point.description
              ].join(' ');
            }

            return String(point ?? '');
          }).join(' ')
        : '';

      const questionText = str(topic.question);
      const answerText = str(topic.answer);

      const titleNorm = norm(title);
      const definitionNorm = norm(definition);
      const summaryNorm = norm(summary);

      const fields = {
        title: titleNorm,
        definition: definitionNorm,
        summary: summaryNorm,
        points: norm(pointText),
        example: norm(example),
        examTip: norm(examTip),
        question: norm(questionText),
        answer: norm(answerText)
      };

      const fullText = Object.values(fields).join(' ');
      let score = 0;

      // Exact phrases are much stronger evidence than single words.
      if (
        normalQuestion.length > 2 &&
        titleNorm.includes(normalQuestion)
      ) {
        score += 100;
      }

      if (
        normalQuestion.length > 2 &&
        definitionNorm.includes(normalQuestion)
      ) {
        score += 50;
      }

      if (matchedAlias) {
        const termFoundInTitle = distinctiveTerms.some(term =>
          titleNorm.includes(term)
        );

        const termFoundInContent = distinctiveTerms.some(term =>
          fullText.includes(term)
        );

        if (termFoundInTitle) score += 100;
        else if (termFoundInContent) score += 45;
        else score -= 100;
      }

      for (const word of questionWords) {
        if (titleNorm.includes(word)) score += 8;
        if (definitionNorm.includes(word)) score += 5;
        if (summaryNorm.includes(word)) score += 3;
        if (fields.points.includes(word)) score += 2;
        if (fields.example.includes(word)) score += 1;
        if (fields.examTip.includes(word)) score += 1;
      }

      if (
        selectedTopic &&
        titleNorm.includes(norm(selectedTopic))
      ) {
        score += 3;
      }

      return {
        topic,
        title,
        definition,
        summary,
        example,
        examTip,
        pointText,
        questionText,
        answerText,
        fullText,
        score,
        titleNorm
      };
    }).filter(Boolean).sort((a, b) => b.score - a.score);

    // Search the quiz bank only when it contains a meaningful match.
    const rankedQuizzes = quizzes.map(item => {
      if (!item || typeof item !== 'object') return null;

      const text = norm(flatten(item).join(' '));
      const matches = questionWords.filter(word =>
        text.includes(word)
      ).length;

      const exactAliasMatch = matchedAlias &&
        distinctiveTerms.some(term => text.includes(term));

      return {
        item,
        text,
        score: matches + (exactAliasMatch ? 15 : 0),
        exactAliasMatch: Boolean(exactAliasMatch)
      };
    }).filter(Boolean).filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    let candidates = ranked.filter(item => item.score > 0);

    if (matchedAlias) {
      candidates = candidates.filter(item =>
        distinctiveTerms.some(term =>
          item.fullText.includes(term)
        )
      );
    }

    // Do not pretend that an unrelated topic answers the question.
    if (!candidates.length || candidates[0].score < 5) {
      return reply(200, {
        answer:
          'I could not find a sufficiently relevant answer in the Business content currently loaded on this website.\n\n' +
          'I do not want to give you incorrect information by using an unrelated topic. The notes may not yet include this concept. Try checking the relevant syllabus section or adding the missing topic to the website content.'
      });
    }

    const selected = candidates.slice(0, 3);

    const output = [
      'Relevant information found in your Business learning materials:'
    ];

    for (const result of selected) {
      const topic = result.topic;
      const lines = [`TOPIC: ${result.title || 'Business topic'}`];

      if (result.definition) {
        lines.push(`Definition: ${result.definition}`);
      }

      if (result.summary) {
        lines.push(`Overview: ${result.summary}`);
      }

      if (Array.isArray(topic.points) && topic.points.length) {
        const points = topic.points.map(point => {
          if (Array.isArray(point)) {
            return `${str(point[0], 300)}: ${str(point[1], 1500)}`;
          }

          if (point && typeof point === 'object') {
            const heading = str(point.title || point.name, 300);
            const detail = str(
              point.explanation || point.description,
              1500
            );

            return heading ? `${heading}: ${detail}` : detail;
          }

          return str(point, 1500);
        }).filter(Boolean);

        if (points.length) {
          lines.push('Key points:\n- ' + points.join('\n- '));
        }
      }

      if (result.example) {
        lines.push(`Business example: ${result.example}`);
      }

      if (result.examTip) {
        lines.push(`Exam technique: ${result.examTip}`);
      }

      if (result.questionText) {
        lines.push(`Practice question: ${result.questionText}`);
      }

      if (result.answerText) {
        lines.push(`Sample answer: ${result.answerText}`);
      }

      output.push(lines.join('\n'));
    }

    const relevantQuizzes = rankedQuizzes.filter(result => {
      if (matchedAlias) return result.exactAliasMatch;

      // Require at least two question keywords to match a quiz.
      return questionWords.filter(word =>
        result.text.includes(word)
      ).length >= 2;
    }).slice(0, 2);

    if (relevantQuizzes.length) {
      output.push(
        'RELATED PRACTICE QUESTIONS\n' +
        relevantQuizzes.map(({ item }) => {
          const q = str(item.q || item.question, 1000);
          const explanation = str(item.explanation, 1500);

          return [
            q ? `Question: ${q}` : '',
            explanation ? `Explanation: ${explanation}` : ''
          ].filter(Boolean).join('\n');
        }).join('\n\n')
      );
    }

    output.push(
      'This tutor searches existing website content; it does not generate new explanations. Check the relevant syllabus notes if the information you need is missing.'
    );

    return reply(200, { answer: output.join('\n\n---\n\n') });

  } catch (error) {
    console.error('Business content search failed:', error);

    return reply(500, {
      error: 'The Business content search failed. Please try again.'
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
