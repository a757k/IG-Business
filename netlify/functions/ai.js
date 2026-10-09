
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return reply(405, { error: 'Method not allowed.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return reply(503, {
      error: 'AI Tutor is not configured yet. Add OPENAI_API_KEY in Netlify environment variables.'
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
      'https://api.openai.com/v1/responses',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
          instructions:
            'You are a careful, supportive tutor for Pearson Edexcel International GCSE Business (4BS1). Explain concepts in clear student-friendly English. Use accurate business terminology, a short relevant example, and step-by-step chains of reasoning. For exam technique, explain how to apply knowledge to the case and develop consequences. Do not claim your response is an official mark scheme. If uncertain about a specification detail, say so and advise checking the current Pearson specification. Keep answers focused and do not answer unrelated requests.',
          input: `Selected syllabus topic: ${topic}\nStudent question: ${question}`,
          max_output_tokens: 800
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return reply(
        response.status === 429 ? 429 : 502,
        {
          error:
            data.error?.message ||
            'The AI service could not complete the request.'
        }
      );
    }

    const answer = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(part => part.type === 'output_text')
      .map(part => part.text)
      .join('\n')
      .trim();

    if (!answer) {
      return reply(502, {
        error: 'The AI service returned an empty answer. Please try again.'
      });
    }

    return reply(200, { answer });
  } catch (error) {
    return reply(502, {
      error: 'Unable to reach the AI service. Please try again later.'
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
