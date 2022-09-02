import * as functions from 'firebase-functions'
import { db } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { Request, Response } from '../../../types/function'

const userProfileFn = (req: Request, res: Response) => {
  db.doc(`/users/${req.user.uid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(200).json({ user: doc.data() })
      } else {
        return res.status(500).json({ message: 'Can not find user details' })
      }
    })
    .catch((error) => {
      functions.logger.error(`Failed to get user profile [${req.user.uid}]`, { error })
      return res.status(500).json({ ...error })
    })
}

export default functions.https.onRequest(middleware(userProfileFn, { authenticatedRoute: true, method: 'GET' }))
