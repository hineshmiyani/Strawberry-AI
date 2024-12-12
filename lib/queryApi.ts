import openai from './openai'

const query = async (prompt: string, model: string) => {
  const res = await openai.chat.completions
    .create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res)
    .catch((err) =>
      console.error(`Strawberry.ai was unable to rephrase your text! (Error: ${err?.message})`)
    )

  return res
}

export default query
