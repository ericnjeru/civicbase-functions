import * as functions from 'firebase-functions'
import { db } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { Request, Response } from '../../../types/function'
import { params } from '../../../utils/params'

const finishSurveyFn = (req: Request, res: Response) => {
  const surveyId = params(req)
  const survey = db.collection('surveys').doc(surveyId)

  survey
    .update({
      status: 'finished',
      finishedAt: new Date().toISOString(),
    })
    .then(() => res.status(200).json({ id: surveyId }))
    .catch((error) => {
      functions.logger.error(`Failed to finish survey [${surveyId}]`, { error })
      return res.status(500).json(error)
    })
}

export default functions.https.onRequest(middleware(finishSurveyFn, { authenticatedRoute: true, method: 'GET' }))
