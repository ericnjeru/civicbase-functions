import * as functions from 'firebase-functions'
import { Request, Response } from 'express'
import { db } from '../../../config/firebase'

export const createIndiaAnswer = (req: Request, res: Response) => {
  const answer = {
    ...req.body,
    createdAt: new Date().toISOString(),
  }

  db.collection('india')
    .add(answer)
    .then((doc) => res.status(201).json(doc.id))
    .catch((error) => {
      functions.logger.error('Create india answer', error)
      return res.status(500).json(error)
    })
}
