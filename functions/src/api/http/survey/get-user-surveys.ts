import * as functions from 'firebase-functions'
import { db } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { Request, Response } from '../../../types/function'

const surveysFn = (req: Request, res: Response) => {
  const { uid } = req.user

  db.collection('surveys')
    .where('uid', '==', uid)
    .get()
    .then((data) => {
      const list: any[] = []

      data.forEach((doc) => {
        list.push({
          ...(doc.data() as any),
          id: doc.id,
        })
      })

      res.status(200).json(list)
    })
    .catch((error) => {
      functions.logger.error(`User [${uid}] failed to fetch surveys`, error)
      return res.status(500).json(error)
    })
}

export default functions.https.onRequest(middleware(surveysFn, { authenticatedRoute: true, method: 'GET' }))
