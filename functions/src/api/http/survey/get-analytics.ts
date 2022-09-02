import * as functions from 'firebase-functions'
import { getCSV } from '../../../utils/getCSV'
import getFeedback from '../../../utils/getFeedback'
import { getResults } from '../../../utils/getResults'
import { db } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { params } from '../../../utils/params'
import { Request, Response } from '../../../types/function'

const surveyAnalyticsFn = (req: Request, res: Response) => {
  const surveyId = params(req)

  db.doc(`/surveys/${surveyId}`)
    .get()
    .then((survey) => {
      if (survey.exists) {
        const surveyData = survey.data() as any

        if (surveyData?.uid !== req.user.uid) {
          functions.logger.error(`User = ${req.user.uid} has no permission to collect data from survey = ${surveyId}`)
          res.status(403).json({ message: 'You have no permission to see this data' })
        } else {
          db.collection('surveys')
            .doc(surveyId)
            .collection('answers')
            .get()
            .then((data) => {
              const answerData: any = []

              data.forEach((doc) => {
                answerData.push({
                  ...(doc.data() as any),
                  id: doc.id,
                })
              })

              let response: any = { survey: { ...surveyData, id: survey.id } }

              response.results = getResults(surveyData, answerData)
              response.csv = {
                pilot: getCSV(
                  surveyData,
                  answerData?.filter(({ status }: { status: string }) => status === 'pilot'),
                ),
                published: getCSV(
                  surveyData,
                  answerData?.filter(({ status }: { status: string }) => status === 'published'),
                ),
              }

              getCSV(surveyData, answerData)

              if (surveyData?.setup.feedback?.active) {
                response.feedback = getFeedback(answerData)
              }

              res.status(200).json(response)
            })
            .catch((error) => {
              functions.logger.error(`Survey [${surveyId}] analytics`, error)
              return res.status(500).json({ error })
            })
        }
      }
    })
    .catch((error) => {
      functions.logger.error(`Survey [${surveyId}] analytics`, error)
      return res.status(500).json(error)
    })
}

export default functions.https.onRequest(middleware(surveyAnalyticsFn, { authenticatedRoute: true, method: 'GET' }))
