import * as functions from 'firebase-functions'
import { Request, Response } from '../../../types/function'
import { middleware } from '../../../services/auth'

import { admin, db } from '../../../config/firebase'

const updatePassword = (req: Request, res: Response) => {
  const user = db.collection('users').doc(req.user.uid)
  const { name } = req.body

  user
    .update({
      name,
    })
    .then(() => {
      admin
        .auth()
        .updateUser(req.user.uid, { displayName: name })
        .then(() => {
          res.status(200).json({ name })
        })
    })
    .catch((error) => {
      functions.logger.error(`Failed to update name [${req.user.uid}]`, { error })
      return res.status(500).json(error)
    })
}

export default functions.https.onRequest(middleware(updatePassword, { authenticatedRoute: true, method: 'POST' }))
