import * as functions from 'firebase-functions'
import { admin } from '../../../config/firebase'
import { middleware } from '../../../services/auth'
import { Request, Response } from '../../../types/function'

const logoutFn = async (req: Request, res: Response) => {
  admin
    .auth()
    .verifySessionCookie(req.user.token)
    .then((decodedIdToken) => admin.auth().revokeRefreshTokens(decodedIdToken.sub))
    .then(() => res.status(200).json({ message: 'User logged out' }))
    .catch((error) => {
      functions.logger.error('Logout', error)
      res.status(500).json({ ...error })
    })
}

export default functions.https.onRequest(middleware(logoutFn, { authenticatedRoute: true, method: 'GET' }))
