
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return reply(405, { error: 'Method not allowed.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return reply(503, {
      error: 'AI Tutor is not configured. Add OPENAI_API_KEY in Netlify environment variables.'
    });
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

  const topic =
    typeof body.topic === 'string'
      ? body.topic.slice(0, 120)
      : 'All topics';

  if (!question) {
    return reply(400, { error: 'Please enter a question.' });
  }

  if (question.length > 2000) {
    return reply(400, {
      error: 'Please keep your question under 2,000 characters.'
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        instructions: [
          'You are a careful, supportive tutor for Pearson Edexcel International GCSE Business (4BS1).',
          'Explain concepts in clear, student-friendly English.',
          'Use accurate business terminology, relevant examples, and step-by-step chains of reasoning.',
          'For exam technique, explain how to apply knowledge to the case and develop consequences.',
          'Do not claim your response is an official mark scheme.',
          'If uncertain about a specification detail, say so and advise checking the current Pearson specification.',
          'Keep answers focused on International GCSE Business and do not answer unrelated requests.'
        ].join(' '),
        input: `Selected syllabus topic: ${topic}\nStudent question: ${question}`,
        max_output_tokens: 800
      })
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (response.status === 429) {
        return reply(429, {
          error: 'The AI Tutor has reached a usage limit. Check your OpenAI API billing and limits, then try again later.'
        });
      }

      if (response.status === 401 || response.status === 403) {
        return reply(502, {
          error: 'OpenAI rejected the API key or access. Check your OPENAI_API_KEY and API project permissions.'
        });
      }

      return reply(502, {
        error: 'The AI service could not complete the request. Please try again later.'
      });
    }

    const answer = Array.isArray(data.output)
      ? data.output
          .filter(item => item.type === 'message')
          .flatMap(item => Array.isArray(item.content) ? item.content : [])
          .filter(item => item.type === 'output_text')
          .map(item => item.text || '')
          .join('\n')
          .trim()
      : '';

    if (!answer) {
      return reply(502, {
        error: 'The AI returned an empty answer. Please try again.'
      });
    }

    return reply(200, { answer });

  } catch {
    return reply(502, {
      error: 'Unable to reach the AI service. Check your connection and try again.'
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
