import * as functions from 'firebase-functions'
import { Request, Response } from 'express'
import { db } from '../../../config/firebase'
import { getIp } from '../../../utils/ip'

export const createAnswer = (req: Request, res: Response) => {
  const answer = {
    ...req.body,
    createdAt: new Date().toISOString(),
  }

  req.params.status = answer.status
  req.params.surveyId = answer.surveyId

  getIp(req, 'respondents')

  db.collection('surveys')
    .doc(answer.surveyId)
    .collection('answers')
    .add(answer)
    .then((doc) => res.status(201).json(doc.id))
    .catch((error) => {
      functions.logger.error('Create answer', error)
      return res.status(500).json(error)
    })
}
