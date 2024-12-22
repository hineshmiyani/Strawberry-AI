import { NextApiRequest, NextApiResponse } from 'next'

import query from '@/lib/queryApi'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body

  if (!prompt) {
    res.status(400).json({ answer: 'Please provide a prompt!' })
    return
  }

  // OpenAI Query
  const response = await query(prompt)

  res.status(200).send(response as any)
}

export default handler
