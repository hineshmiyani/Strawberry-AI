import openai from './openai'

const query = async (prompt: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res)
    .catch((err) => `Strawberry.ai was unable to repharse your text! (Error: ${err?.message})`)

  return res
}

export default query
