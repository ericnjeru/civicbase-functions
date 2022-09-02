import * as functions from 'firebase-functions'
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { Request, Response } from '../../../types/function'

const signupFn = (req: Request, res: Response) => {
  const auth = getAuth()
  const { name, email, password } = req.body

  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      sendEmailVerification(user)

      return user.uid
    })
    .then((uid) => {
      const user = {
        name,
        email,
        uid,
        createdAt: new Date().toISOString(),
      }

      return db.doc(`/users/${uid}`).set(user)
    })
    .then(() => res.status(201).json({ code: 'auth/verify-email' }))
    .catch((error) => {
      functions.logger.error('Signup', error)

      if (error.code === 'auth/email-already-in-use') {
        return res.status(409).json({ ...error })
      } else {
        return res.status(400).json({ ...error })
      }
    })
}

export default functions.https.onRequest(middleware(signupFn, { method: 'POST' }))
