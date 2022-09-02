import * as functions from 'firebase-functions'
import { Request, Response } from 'express'
import { db } from '../../../config/firebase'
import { incrementRespondent } from '../../../utils/survey'

export const createAnswer = (req: Request, res: Response) => {
  const answer = {
    ...req.body,
    createdAt: new Date().toISOString(),
  }

  db.collection('surveys')
    .doc(answer.surveyId)
    .collection('answers')
    .add(answer)
    .then((doc) => incrementRespondent(answer.surveyId, answer.status).then(() => res.status(201).json(doc.id)))
    .catch((error) => {
      functions.logger.error('Create answer', error)
      return res.status(500).json(error)
    })
}
