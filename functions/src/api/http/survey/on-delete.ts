import * as functions from 'firebase-functions'
import { Response } from 'express'
import { db } from '../../../config/firebase'
import { AuthRequest } from '../../../types/express'

export const deleteSurvey = (req: AuthRequest, res: Response) => {
  const { surveyId } = req.params

  db.doc(`/surveys/${surveyId}`)
    .delete()
    .then(() => db.doc(`/answers/${surveyId}`).delete())
    .then(() => res.status(200).json({ message: 'Deleted.' }))
    .catch((error) => {
      functions.logger.error(`Failed to delete survey [${surveyId}]`, { error })
      return res.status(500).json(error)
    })
}
