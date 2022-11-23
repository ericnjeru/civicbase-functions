import * as functions from 'firebase-functions'
// import { getCSV } from '../../../utils/getCSV'
// import getFeedback from '../../../utils/getFeedback'
// import { getResults } from '../../../utils/getResults'
import { db } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { params } from '../../../utils/params'
import { Request, Response } from '../../../types/function'
import { getAccess, getRespodents } from '../../../utils/overview'
import { getResults } from '../../../utils/getResults'
import { getCSV } from '../../../utils/getCSV'
import getFeedback from '../../../utils/getFeedback'

const surveyOverviewFn = (req: Request, res: Response) => {
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
          const overview: any = {}

          const A = db
            .collection('surveys')
            .doc(surveyId)
            .collection('access')
            .get()
            .then((data) => {
              const access = []

              data.forEach((doc) => {
                access.push(doc.data())
              })

              overview.access = getAccess(access)
            })
            .catch((error) => {
              functions.logger.error(`Survey [${surveyId}] access overview`, error)
              return res.status(500).json({ error })
            })

          const R = db
            .collection('surveys')
            .doc(surveyId)
            .collection('respondents')
            .get()
            .then((data) => {
              const respondents = []

              data.forEach((doc) => {
                respondents.push(doc.data())
              })

              overview.respondent = getRespodents(respondents)
            })
            .catch((error) => {
              functions.logger.error(`Survey [${surveyId}] respondents overview`, error)
              return res.status(500).json({ error })
            })

          const Results = db
            .collection('surveys')
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

              const response: any = { survey: { ...surveyData, id: survey.id } }

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

              overview.feedback = response.feedback
              overview.results = response.results
              overview.csv = response.csv
            })
            .catch((error) => {
              functions.logger.error(`Survey [${surveyId}] results overview`, error)
              return res.status(500).json({ error })
            })

          Promise.all([A, R, Results]).then(() => {
            res.status(200).json({ ...overview, id: surveyId })
          })
        }
      }
    })
    .catch((error) => {
      functions.logger.error(`Survey [${surveyId}] overview`, error)
      return res.status(500).json(error)
    })
}

export default functions.https.onRequest(middleware(surveyOverviewFn, { authenticatedRoute: true, method: 'GET' }))
