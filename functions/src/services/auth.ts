import * as functions from 'firebase-functions'
import { admin } from '../config/firebase'
import cors from 'cors'

const corsHandler = cors({ origin: true, credentials: true })

export const auth = (req: any, res: any, next: any) => {
  const { authorization } = req.headers

  if (!authorization && !authorization?.startsWith('Bearer ')) {
    functions.logger.warn('Unauthorized user')
    return res.status(403).json({ message: 'Unauthorized' })
  }

  const token = authorization.split('Bearer ')[1]

  return admin
    .auth()
    .verifySessionCookie(token, true /** checkRevoked */)
    .then((decodedIdToken) => {
      req.user = {
        uid: decodedIdToken.uid,
        email: decodedIdToken.email,
        token,
      }

      return next()
    })
    .catch((error) => res.status(403).json({ ...error }))
}

export const isAuthenticated = (req: any) => {
  const { authorization } = req.headers

  if (!authorization && !authorization?.startsWith('Bearer ')) {
    return false
  }

  const token = authorization.split('Bearer ')[1]

  return admin
    .auth()
    .verifySessionCookie(token, true /** checkRevoked */)
    .then((decodedIdToken) => {
      req.user = {
        uid: decodedIdToken.uid,
        email: decodedIdToken.email,
        token,
      }

      return true
    })
    .catch(() => false)
}

export const middleware =
  (handler: (req: any, res: any) => Promise<void> | void, { authenticatedRoute = false, method = '' } = {}) =>
  async (req: any, res: any) => {
    if (method === req.method || method === 'OPTIONS') {
      if (authenticatedRoute) {
        const isAuthorized = await isAuthenticated(req)
        if (!isAuthorized) {
          functions.logger.warn('Unauthorized user')

          return corsHandler(req, res, () => {
            return res.status(401).json({ message: 'Unauthorized' })
          })
        }
      }

      return corsHandler(req, res, () => {
        return handler(req, res)
      })
    } else {
      functions.logger.warn(`Wrong method ${req.method}`)

      return corsHandler(req, res, () => {
        return res.status(405).json({ message: 'Wrong Method' })
      })
    }
  }
