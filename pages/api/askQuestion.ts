import { NextApiRequest, NextApiResponse } from 'next'

import query from '@/lib/queryApi'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, model } = req.body

  if (!prompt) {
    res.status(400).json({ answer: 'Please provide a prompt!' })
    return
  }

  // OpenAI Query
  const response = await query(prompt, model)

  res.status(200).send(response as any)
}

export default handler
