import * as functions from 'firebase-functions'
import { Response } from 'express'
import { db } from '../../../config/firebase'
import { AuthRequest } from '../../../types/express'
import { setQuestionsId } from '../../../utils/survey'

export const updateSurvey = (req: AuthRequest, res: Response) => {
  const { surveyId } = req.params
  const survey: any = {
    ...req.body,
    updatedAt: new Date().toISOString(),
  }

  if (req.body.setup.method === 'Quadratic') {
    survey.quadratic = setQuestionsId(survey)
  }

  if (req.body.setup.method === 'Conjoint') {
    survey.conjoint = setQuestionsId(survey)
  }

  if (req.body.setup.method === 'Likert') {
    survey.likert = setQuestionsId(survey)
  }

  db.collection('surveys')
    .doc(surveyId)
    .update(survey)
    .then(() => res.status(201).json(surveyId))
    .catch((error) => {
      functions.logger.error(`Failed to update survey [${surveyId}]`, { error })
      res.status(500).json({ ...error })
    })
}
