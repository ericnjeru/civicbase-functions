import * as functions from 'firebase-functions'
import { sendPasswordResetEmail } from 'firebase/auth'
import { middleware } from '../../../services/auth'
import { Request, Response } from '../../../types/function'
import { auth } from '../../../config/firebase'

const resetPasswordFn = (req: Request, res: Response) => {
  const { email } = req.body

  sendPasswordResetEmail(auth, email)
    .then(() => res.status(200).json({ message: 'Please check your email' }))
    .catch((error) => {
      functions.logger.error('Reset password', error)
      res.status(500).json({ ...error })
    })
}

export default functions.https.onRequest(middleware(resetPasswordFn, { method: 'POST' }))
