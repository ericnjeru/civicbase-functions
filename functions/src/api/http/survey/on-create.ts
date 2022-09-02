import * as functions from 'firebase-functions'
import { Response } from 'express'
import { db } from '../../../config/firebase'
import { AuthRequest } from '../../../types/express'
import { setAnalytics } from '../../../utils/analytics'
import { setQuestionsId } from '../../../utils/survey'

export const createSurvey = (req: AuthRequest, res: Response) => {
  const survey: any = {
    ...req.body,
    createdAt: new Date().toISOString(),
    uid: req.user?.uid, // user will always be defined at this point
    status: 'pilot',
    analytics: setAnalytics(),
  }
  // TODO: this logic is being repeated
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
    .add(survey)
    .then((doc) => res.status(201).json(doc.id))
    .catch((error) => {
      functions.logger.error(`Failed to create survey`, { error, survey })
      return res.status(500).json({ ...error })
    })
}
