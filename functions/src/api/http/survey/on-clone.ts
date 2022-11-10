import * as functions from 'firebase-functions'
import { db } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { params } from '../../../utils/params'
import { Request, Response } from '../../../types/function'

const cloneSurveyFn = (req: Request, res: Response) => {
  const surveyId = params(req)

  db.doc(`/surveys/${surveyId}`)
    .get()
    .then((doc: any) => {
      const clonedSurvey = {
        ...doc.data(),
        setup: {
          ...doc.data().setup,
          topic: `clone - ${doc.data().setup.topic}`,
        },
        createdAt: new Date().toISOString(),
        status: 'pilot',
        finishedAt: null,
        publishedAt: null,
      }

      if (doc.exists && clonedSurvey) {
        return db
          .collection('surveys')
          .add(clonedSurvey)
          .then((doc) => res.status(201).json({ ...clonedSurvey, id: doc.id }))
          .catch((error) => {
            functions.logger.error(`Survey ${surveyId} failed to clone`, error)
            return res.status(500).json({ message: 'Failed to clone survey' })
          })
      }

      functions.logger.error(`Survey ${surveyId} failed to clone, for unknown reason`)
      return res.status(500).json('Can not clone survey')
    })
    .catch((error) => res.status(500).json(error))
}

export default functions.https.onRequest(middleware(cloneSurveyFn, { authenticatedRoute: true, method: 'GET' }))
