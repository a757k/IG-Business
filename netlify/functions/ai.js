
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return reply(405, { error: 'Method not allowed.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return reply(503, {
      error: 'AI Tutor is not configured. Add GEMINI_API_KEY in Netlify environment variables.'
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
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: [
                'You are a careful, supportive tutor for Pearson Edexcel International GCSE Business (4BS1).',
                'Explain concepts in clear, student-friendly English.',
                'Use accurate business terminology, relevant examples, and step-by-step chains of reasoning.',
                'For exam technique, explain how to apply knowledge to the case and develop consequences.',
                'Do not claim your response is an official mark scheme.',
                'If uncertain about a specification detail, say so and advise checking the current Pearson specification.',
                'Keep answers focused on International GCSE Business and do not answer unrelated requests.'
              ].join(' ')
            }]
          },
          contents: [{
            role: 'user',
            parts: [{
              text: `Selected syllabus topic: ${topic}\nStudent question: ${question}`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 800
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return reply(429, {
          error: 'The AI Tutor has reached its current usage limit. Please try again later.'
        });
      }

      if (response.status === 400 || response.status === 403) {
        return reply(502, {
          error: 'Gemini rejected the request. Check your API key, model access, and API settings in Google AI Studio.'
        });
      }

      return reply(502, {
        error: 'The Gemini service could not complete the request. Please try again later.'
      });
    }

    const answer = (data.candidates?.[0]?.content?.parts || [])
      .map(part => part.text || '')
      .join('\n')
      .trim();

    if (!answer) {
      return reply(502, {
        error: 'Gemini returned an empty answer. Please try again.'
      });
    }

    return reply(200, { answer });

  } catch {
    return reply(502, {
      error: 'Unable to reach Gemini. Please try again later.'
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
