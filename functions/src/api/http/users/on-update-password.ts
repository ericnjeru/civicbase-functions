import * as functions from 'firebase-functions'
import { Request, Response } from '../../../types/function'
import { middleware } from '../../../services/auth'

import { admin, auth, db } from '../../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const updatePassword = (req: Request, res: Response) => {
  const { uid, email } = req.user
  const { password } = req.body

  admin
    .auth()
    .updateUser(uid, { password })
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          if (!user.emailVerified) {
            res.status(403).json({ message: 'Please verify your email address' })
          }

          return user.getIdToken()
        })
        .then((idToken: string) => {
          const expiresIn = 60 * 60 * 24 * 5 * 1000

          return admin
            .auth()
            .createSessionCookie(idToken, { expiresIn })
            .then((token: string) => {
              db.doc(`/users/${uid}`)
                .get()
                .then((doc) => res.status(200).json({ user: doc.data(), token }))
            })
            .catch((error) => {
              functions.logger.error('Unauthorized request', error)
              res.status(401).json({ message: 'Unauthorized request', ...error })
            })
        })
        .catch((error) => {
          functions.logger.error(error)
          res.status(403).json({ message: 'Your email or password is incorrect', ...error })
        })
    })
    .catch((error) => {
      functions.logger.error(`Failed to update password [${uid}]`, { error })
      return res.status(500).json({ ...error })
    })
}

export default functions.https.onRequest(middleware(updatePassword, { authenticatedRoute: true, method: 'POST' }))
